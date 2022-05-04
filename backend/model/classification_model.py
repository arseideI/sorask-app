from services.db import DataService
from config import mysql, CLASSIFICATION_TABLE, build_update_str
from model.nurse_model import Nurse
from model.patient_model import Patient
from model.symptom_model import Symptom
from model.classification_symptom_model import ClassificationSymptom
import logging
class Classification():
    def __init__(self, classification_symptom: object):
        self.classification_symptom = classification_symptom
        self.database = DataService(mysql=mysql, table=CLASSIFICATION_TABLE)
    
    def get_classification(self, id: int):
        query = f"WHERE ID_PATIENT_CLASSIFICATION={id}"
        data = self.database.get_by_id(query=query)
        return data

    def get_classification_list(self):
        query = """
       SELECT
           TB1.ID_PATIENT_CLASSIFICATION,
           TB1.ID_NURSE,
           TB3.ID_USER,
           TB4.NM_USER,
           TB1.ID_PATIENT,
           TB2.NM_PATIENT,
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
            all_classification.append(classification)

        return all_classification
    
    def register_classification(self, classification: dict):
        id_nurse = classification.get("id_nurse")
        id_patient = classification.get("id_patient")
        id_flag = classification.get("id_flag")
        symptoms_id = classification.get("symptoms")

        query = f"(ID_NURSE, ID_PATIENT, ID_FLAG) VALUES ('{id_nurse}','{id_patient}', '{id_flag}')"
        try:
            data = self.database.insert(query=query)
        except Exception as exc:
            logging.exception(f"[SYMPTOM][register_symptom] Erro ao inserir novo sintoma: {exc} ")
        if data.get("id"):
            id_classification = data.get("id")
            for symptom in symptoms_id:
                if type(symptom) == int:
                    object_query = {
                        "id_classification": id_classification,
                        "id_symptom": symptom
                    }
                    data_symptom = ClassificationSymptom().register_classification_symptom(classification_symptom=object_query)
        return data
    
    def delete(self, id: int):
        data = self.database.delete(id=id)
        return data
    
    def update(self, id: int, data:dict):
        columns = build_update_str(data=data)
        changed = self.database.update(id=id, data=columns)
        return changed
    
    def build_classification(self, classification: dict):

        nurse_id = classification.get("NurseID")
        nurse = Nurse().get_nurse(id=nurse_id)

        patient_id = classification.get("PatientID")
        patient = Patient().get_patient(id=patient_id)

        builded = ""
        return builded
    
    def format_classification(self, patient: dict, nurse: dict, classification: dict, symptoms: list):
        
        formatted = {
            "id" : classification.get("ID_PATIENT_CLASSIFICATION"),
            "date_in": classification.get("DT_PATIENT_ENTRY"),
            "date_out": classification.get("DT_PATIENT_EXIT"), 
            "patient": patient,
            "nurse": nurse,
            "symptoms": symptoms
        }

        return formatted
    
    