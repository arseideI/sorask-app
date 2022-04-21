from services.db import DataService
from config import mysql, PATIENT_TABLE

class Patient:
    def __init__(self):
        self.database = DataService(mysql=mysql, table=PATIENT_TABLE)

    def get_patient(self, id: int):
        data = self.database.get_by_id(id=id)
        return data
    
    def patients_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_patient(self, patient: dict):

        data = self.database.insert(data=patient)
        return data
    
    def delete(self, id: int):
        data = self.database.delete(id=id)
        return data