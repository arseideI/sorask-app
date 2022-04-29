from services.db import DataService
from config import mysql, NURSES_TABLE, build_update_str

class Nurse():
    def __init__(self):
        self.database = DataService(mysql=mysql, table=NURSES_TABLE)
    
    def get_nurse(self, id: int):
        data = self.database.get_by_id(id=id)
        return data

    def get_nurse_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_nurse(self, nurse: dict):
        values = (nurse["name"], nurse["registration"], nurse["cpf"], nurse["email"], nurse["password"], nurse["status"])
        data = self.database.insert(data=values)
        return data
    
    def delete(self, id: int):
        data = self.database.delete(id=id)
        return data
    
    def update(self, id: int, data:dict):
        columns = build_update_str(data=data)
        changed = self.database.update(id=id, data=columns)
        return changed
    
    
    