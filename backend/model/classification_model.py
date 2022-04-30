from services.db import DataService
from config import mysql, CLASSIFICATION_TABLE, build_update_str
from model.nurse_model import Nurse
from model.patient_model import Patient

class Classification():
    def __init__(self, classification_symptom: object):
        self.classification_symptom = classification_symptom
        self.database = DataService(mysql=mysql, table=CLASSIFICATION_TABLE)
    
    def get_classification(self, id: int):
        data = self.database.get_by_id(id=id)
        builded_classification = self.build_classification(classification=data)
        return data

    def get_classification_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_classification(self, classification: dict):
        values = (classification["name"], classification["flag"])
        data = self.database.insert(data=values)
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
    
    