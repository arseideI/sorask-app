from services.db import DataService
from config import mysql, CLASSIFICATION_TABLE, build_update_str
from model.nurse_model import Nurse
from model.patient_model import Patient
from model.symptom_model import Symptom
from model.classification_symptom_model import ClassificationSymptom
import logging
from datetime import datetime
class Classification():
    def __init__(self, classification_symptom: object):
        self.classification_symptom = classification_symptom
        self.database = DataService(mysql=mysql, table=CLASSIFICATION_TABLE)
    
    def get_classification(self, id: int):
        query = f"WHERE ID_PATIENT_CLASSIFICATION={id}"
        query = f"""
            SELECT
                TB1.ID_PATIENT_CLASSIFICATION,
                TB1.ID_NURSE,
                TB1.INTERNAL,
                TB1.SETOR,
                TB1.ARTERIAL,
                TB1.TEMPERATURE,
                TB1.OXYGEN,
                TB1.OBSERVATION,
                TB1.RESPIRATORY,
                TB1.HEART,
                TB3.ID_USER,
                TB4.NM_USER,
                TB1.ID_PATIENT,
                TB2.NM_PATIENT,
                TB2.CNS,
                TB1.DT_PATIENT_ENTRY,
                TB1.DT_PATIENT_EXIT,
                TB1.ID_FLAG
            FROM T_PATIENT_CLASSIFICATION TB1
                LEFT JOIN T_PATIENT TB2 ON TB1.ID_PATIENT = TB2.ID_PATIENT
                LEFT JOIN T_NURSE TB3 ON TB1.ID_NURSE = TB3.ID_NURSE
                LEFT JOIN T_USER TB4 ON TB3.ID_USER = TB4.ID_USER
            WHERE ID_PATIENT_CLASSIFICATION={id}
            """
        data = self.database.custom_query(query=query)
        classification_class = ClassificationSymptom()
        symptom_class = Symptom()
        all_classification = []
        for classification in data:
            classification_id = classification.get("ID_PATIENT_CLASSIFICATION")
            query_cl = f"""
                SELECT TB1.ID_PATIENT_CLASSIFICATION, TB1.ID_SYMPTOM, TB2.NM_SYMPTOM, TB2.ID_FLAG 
                FROM T_CLASSIFICATION_SYMPTOM TB1
                INNER JOIN T_SYMPTOM TB2 ON TB1.ID_SYMPTOM = TB2.ID_SYMPTOM
                WHERE TB1.ID_PATIENT_CLASSIFICATION ={classification_id};

            """
            
            pc_classification = self.database.custom_query(query=query_cl)
            classification["symptoms"] = pc_classification
            formatted_classification = self.format_classification(classification=classification)
            all_classification.append(formatted_classification)
        return all_classification[0]

    def get_classification_list(self):
        query = """
       SELECT
           TB1.ID_PATIENT_CLASSIFICATION,
                TB1.ID_NURSE,
                TB1.INTERNAL,
                TB1.SETOR,
                TB1.ARTERIAL,
                TB1.TEMPERATURE,
                TB1.OXYGEN,
                TB1.OBSERVATION,
                TB1.RESPIRATORY,
                TB1.HEART,
                TB3.ID_USER,
                TB4.NM_USER,
                TB1.ID_PATIENT,
                TB2.NM_PATIENT,
                TB2.CNS,
                TB1.DT_PATIENT_ENTRY,
                TB1.DT_PATIENT_EXIT,
                TB1.ID_FLAG
       FROM T_PATIENT_CLASSIFICATION TB1
           LEFT JOIN T_PATIENT TB2 ON TB1.ID_PATIENT = TB2.ID_PATIENT
           LEFT JOIN T_NURSE TB3 ON TB1.ID_NURSE = TB3.ID_NURSE
           LEFT JOIN T_USER TB4 ON TB3.ID_USER = TB4.ID_USER
       """
        data = self.database.custom_query(query=query)
        classification_class = ClassificationSymptom()
        symptom_class = Symptom()
        all_classification = []
        for classification in data:
            classification_id = classification.get("ID_PATIENT_CLASSIFICATION")
            query_cl = f"""
                SELECT TB1.ID_PATIENT_CLASSIFICATION, TB1.ID_SYMPTOM, TB2.NM_SYMPTOM, TB2.ID_FLAG 
                FROM T_CLASSIFICATION_SYMPTOM TB1
                INNER JOIN T_SYMPTOM TB2 ON TB1.ID_SYMPTOM = TB2.ID_SYMPTOM
                WHERE TB1.ID_PATIENT_CLASSIFICATION ={classification_id};

            """
            
            pc_classification = self.database.custom_query(query=query_cl)
            classification["symptoms"] = pc_classification
            formatted_classification = self.format_classification(classification=classification)
            all_classification.append(formatted_classification)

        return all_classification
    
    def register_classification(self, classification: dict):
        # {'user': '2$DrackoNerd$212987432', 'symptoms': ['4$Ansiedade (nervosismo)$1', '2$Dor abdominal inferior$1'], 'flags': '3', 'internal': '2', 'setor': ['3']}
        patient_id = classification.get("user").split("$")[0]

        symptoms_id_list = []
        id_nurse = classification.get("id_nurse")
        id_patient = int(patient_id)
        id_flag = classification.get("flags")
        symptoms_id = classification.get("symptoms")
        for symp in symptoms_id:
            symptoms_id_list.append(
                int(symp.split("$")[0])
            )
        internal = int(classification.get("internal"))
        setor = int(classification.get("setor")[0])
        heart = classification.get("heart", "")
        arterial = classification.get("arterial","")
        temperature = classification.get("temperature","")
        respiratory = classification.get("respiratory","")
        oxygen = classification.get("oxygen","")
        observation = classification.get("observation","")
        entry_date = datetime.today()

        query = f"""(ID_NURSE, ID_PATIENT, ID_FLAG, INTERNAL, SETOR, DT_PATIENT_ENTRY, HEART, ARTERIAL, TEMPERATURE, RESPIRATORY, OXYGEN, OBSERVATION) VALUES ('{id_nurse}','{id_patient}', '{id_flag}', '{internal}', '{setor}', '{entry_date}', '{heart}', '{arterial}', '{temperature}', '{respiratory}', '{oxygen}', '{observation}')"""
        try:
            data = self.database.insert(query=query)
        except Exception as exc:
            logging.exception(f"[SYMPTOM][register_symptom] Erro ao inserir novo sintoma: {exc} ")
        if data.get("id"):
            id_classification = data.get("id")
            for symptom in symptoms_id_list:
                if type(symptom) == int:
                    object_query = {
                        "id_classification": id_classification,
                        "id_symptom": symptom
                    }
                    try:
                        data_symptom = ClassificationSymptom().register_classification_symptom(classification_symptom=object_query)
                    except Exception as exc:
                        logging.exception(f"[SYMPTOM][register_symptom] Erro ao inserir novo sintoma de classificação: {exc} ")
        return data
    
    def delete(self, id: int):
        query = f"""WHERE {id}"""

        query_delete = f"""DELETE FROM T_CLASSIFICATION_SYMPTOM WHERE ID_PATIENT_CLASSIFICATION={id}"""
        self.database.custom_query(query=query_delete)
        data = self.database.delete(id_query=query)
        return data
    
    def update(self, id: int, data:dict):
        columns = build_update_str(data=data)

        symptoms_id_list = []
        patient_id = int(data.get("user").split("$")[0])
        id_nurse = data.get("id_nurse")
        id_flag = data.get("flags")
        symptoms_id = data.get("symptoms")
        for symp in symptoms_id:
            symptoms_id_list.append(
                int(symp.split("$")[0])
            )
        
        internal = int(data.get("internal"))
        setor = int(data.get("setor")[0])
        heart = data.get("heart", "")
        arterial = data.get("arterial","")
        temperature = data.get("temperature","")
        respiratory = data.get("respiratory","")
        oxygen = data.get("oxygen","")
        observation = data.get("observation","")
        exit_dt = ""
        query = f"""SET ID_NURSE='{id_nurse}', ID_PATIENT='{patient_id}', ID_FLAG='{id_flag}', INTERNAL='{internal}', SETOR='{setor}', HEART='{heart}', ARTERIAL='{arterial}', TEMPERATURE='{temperature}', RESPIRATORY='{respiratory}', OXYGEN='{oxygen}', OBSERVATION='{observation}' WHERE ID_PATIENT_CLASSIFICATION={id}"""
        if internal == 1:
            exit_dt = datetime.today()
            query = f"""SET ID_NURSE='{id_nurse}', ID_PATIENT='{patient_id}', ID_FLAG='{id_flag}', INTERNAL='{internal}', DT_PATIENT_EXIT='{exit_dt}', SETOR='{setor}', HEART='{heart}', ARTERIAL='{arterial}', TEMPERATURE='{temperature}', RESPIRATORY='{respiratory}', OXYGEN='{oxygen}', OBSERVATION='{observation}' WHERE ID_PATIENT_CLASSIFICATION={id}"""

        changed = self.database.update(query=query)
        return changed
    
    def build_classification(self, classification: dict):

        nurse_id = classification.get("NurseID")
        nurse = Nurse().get_nurse(id=nurse_id)

        patient_id = classification.get("PatientID")
        patient = Patient().get_patient(id=patient_id)

        builded = ""
        return builded
    
    def format_classification(self, classification: dict):
        symptoms = classification.get("symptoms", [])
        id_patient_hash = f'{classification.get("ID_PATIENT","")}${classification.get("NM_PATIENT")}${classification.get("CNS")}'
        formatted = {
            "id" : classification.get("ID_PATIENT_CLASSIFICATION"),
            "date_in": classification.get("DT_PATIENT_ENTRY"),
            "date_out": classification.get("DT_PATIENT_EXIT"),
            "flag": classification.get("ID_FLAG"),
            "patient": {
                "id": classification.get("ID_PATIENT"),
                "name": classification.get("NM_PATIENT"),
                "cns": classification.get("CNS"),
                "hash": id_patient_hash
            },
            "nurse": {
                "id": classification.get("ID_NURSE"),
                "name": classification.get("NM_USER")
            },
            "symptoms": [],
            "heart": classification.get("HEART"),
            "internal": classification.get("INTERNAL"),
            "setor": classification.get("SETOR"),
            "arterial": classification.get("ARTERIAL"),
            "temperature": classification.get("TEMPERATURE"),
            "oxygen": classification.get("OXYGEN"),
            "respiratory": classification.get("RESPIRATORY"),
            "observation": classification.get("OBSERVATION")
        }
        all_symptoms = []
        for symptom in symptoms:
            f_symptom = self.format_symptom(symptom=symptom)
            hash_id = f"{f_symptom.get('id')}${f_symptom.get('name')}${f_symptom.get('flag')}"
            all_symptoms.append(hash_id)
        formatted["symptoms"] = all_symptoms
        return formatted

    
    def format_symptom(self, symptom: dict):

        formatted = {
            "id": symptom.get("ID_SYMPTOM"),
            "name": symptom.get("NM_SYMPTOM"),
            "flag": symptom.get("ID_FLAG"),
            "classification_id": symptom.get("ID_PATIENT_CLASSIFICATION")
        }

        return formatted
    
    def get_dash_symptoms(self, days: int):
        
        return self.database.get_interval_symptoms(days=days)
    
    def get_dash_flags(self, days: int):
        
        return self.database.get_interval_flags(days=days)
    
       