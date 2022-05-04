from services.db import DataService
from config import mysql, USER_TABLE
import logging

class User:
    def __init__(self):
        self.database = DataService(mysql=mysql, table=USER_TABLE)

    def get_user(self, id: int):
        query = f"WHERE ID_USER={id}"
        data = self.database.get_by_id(query=query)
        return data
    
    def patients_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_patient(self, patient: dict):
        name = patient.get("name")
        query = f"(NM_PATIENT) VALUES ('{name}')"
        try:
            data = self.database.insert(query=query)
        except Exception as exc:
            logging.exception(f"[PATIENT][register_patient] Erro ao inserir novo paciente: {exc} ")
        return data
    
    def delete(self, id: int):
        query = f"WHERE ID_PATIENT={id}"
        data = self.database.delete(id_query=query)
        return data
    
    def update(self, id: int, data:dict):
        if data.get("name", None):
            if type(data["name"]) == str:
                data_set = f"NM_PATIENT='{data.get('name')}'"

        query = f"SET {data_set} WHERE ID_PATIENT={id}"

        changed = self.database.update(query=query)
        return changed