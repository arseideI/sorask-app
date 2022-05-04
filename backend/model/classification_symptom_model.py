from services.db import DataService
from config import mysql, CLASSIFICATION_SYMPTOMS_TABLE, build_update_str
import logging

class ClassificationSymptom():
    def __init__(self):
        self.database = DataService(mysql=mysql, table=CLASSIFICATION_SYMPTOMS_TABLE)
    
    def get_classification_symptom_by_classification_id(self, id: int):
        query = f"WHERE ID_PATIENT_CLASSIFICATION={id}"
        data = self.database.get_list_by_id(query=query)
        return data

    def get_classification_symptom_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_classification_symptom(self, classification_symptom: dict):
        id_classification = classification_symptom.get("id_classification")
        id_symptom = classification_symptom.get("id_symptom")
    
        query = f"(ID_PATIENT_CLASSIFICATION, ID_SYMPTOM) VALUES ('{id_classification}','{id_symptom}')"
        try:
            data = self.database.insert(query=query)
        except Exception as exc:
            logging.exception(f"[CLASSIFICATION SYMPTOM][register_classification_symptom] Erro ao inserir novo sintoma: {exc} ")
        return data
    
    def delete(self, id: int):
        data = self.database.delete(id=id)
        return data
    
    def update(self, id: int, data:dict):
        columns = build_update_str(data=data)
        changed = self.database.update(id=id, data=columns)
        return changed
    
    
    