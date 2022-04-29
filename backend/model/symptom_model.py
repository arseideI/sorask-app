from services.db import DataService
from config import mysql, SYMPTOM_TABLE, build_update_str

class Symptom():
    def __init__(self):
        self.database = DataService(mysql=mysql, table=SYMPTOM_TABLE)
    
    def get_symptom(self, id: int):
        data = self.database.get_by_id(id=id)
        return data

    def get_symptom_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_symptom(self, symptom: dict):
        values = (symptom["name"], symptom["flag"])
        data = self.database.insert(data=values)
        return data
    
    def delete(self, id: int):
        data = self.database.delete(id=id)
        return data
    
    def update(self, id: int, data:dict):
        columns = build_update_str(data=data)
        changed = self.database.update(id=id, data=columns)
        return changed
    
    
    