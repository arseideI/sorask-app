from services.db import DataService
from model.user_model import User
from config import mysql, NURSES_TABLE, build_update_str
import logging
from datetime import datetime

class Nurse():
    def __init__(self):
        self.database = DataService(mysql=mysql, table=NURSES_TABLE)
    
    def get_nurse(self, id: int):
        query = f"WHERE ID_NURSE={id}"
        data = self.database.get_by_id(query=query)
        return data

    def get_nurse_list(self):
        query = f''' SELECT * FROM T_NURSE WHERE FL_EXCL IS NULL '''
        data = self.database.custom_query(query=query)
        return data
    
    def register_nurse(self, nurse_id: int):
       
        data = {"erro": "Usuário não encontrado"}
        if nurse_id:
            query = f"(ID_USER) VALUES ({nurse_id})"
            try:
                data = self.database.insert(query=query)
            except Exception as exc:
                logging.exception(f"[PATIENT][register_patient] Erro ao inserir novo paciente: {exc} ")
                data = {"erro": exc}
        return data
    
    def delete(self, id: int):
        delete_dt = datetime.today()
        query = f"UPDATE T_NURSE SET FL_EXCL='{delete_dt}' WHERE ID_NURSE={id}"

        data = self.database.custom_query(query=query)
        return data
    
    def update(self, id: int, data:dict):

        nurse_data = self.get_nurse(id=id)
        user =  User()
        user_id = nurse_data.get("ID_USER")
        
        user_update = user.update(id=user_id, data=data)
        return user_update
    
    
    