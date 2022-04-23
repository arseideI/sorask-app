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
    
    def update(self, id: int, data:dict):
        columns = ""
        if data.get("name", None):
            columns = f"name={repr(str(data['name']))} "
        
        if data.get("register", None):
            if columns:
                columns = columns + f", register={data['register']} "
        
        if data.get("email", None):
            if columns:
                columns = columns + f", email={repr(str(data['email']))} "
        
        changed = self.database.update(id=id, data=columns)
        return changed