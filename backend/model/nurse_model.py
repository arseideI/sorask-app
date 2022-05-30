from services.db import DataService
from model.user_model import User
from config import mysql, NURSES_TABLE, build_update_str
import logging

class Nurse():
    def __init__(self):
        self.database = DataService(mysql=mysql, table=NURSES_TABLE)
    
    def get_nurse(self, id: int):
        query = f"WHERE ID_NURSE={id}"
        data = self.database.get_by_id(query=query)
        return data

    def get_nurse_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_nurse(self, nurse_id: int):
        user_id = nurse_id
        user_data = User().get_user(id=user_id)
        data = {"erro": "Usuário não encontrado"}
        if user_data:
            query = f"(ID_USER) VALUES ({user_id})"
            try:
                data = self.database.insert(query=query)
            except Exception as exc:
                logging.exception(f"[PATIENT][register_patient] Erro ao inserir novo paciente: {exc} ")
                data = {"erro": exc}
        return data
    
    def delete(self, id: int):
        query = f"WHERE ID_NURSE={id}"
        data = self.database.delete(id_query=query)
        return data
    
    def update(self, id: int, data:dict):
        user_id = data.get("user_id")
        user_data = User().get_user(id=user_id)
        changed = {"erro": "Usuário não encontrado"}
        if user_data:
            values = f"ID_USER={user_id}"
            query = f"SET {values} WHERE ID_NURSE={id}"

            changed = self.database.update(query=query)
        return changed
    
    
    