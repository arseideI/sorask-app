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

    def get_user_by_email(self, email: str):
        query =f"""
            SELECT 
            TB1.ID_USER,
            TB1.NM_USER,
            TB1.NM_USER_TYPE,
            TB1.TX_MAIL,
            TB1.PSD_USER,
            TB2.ID_NURSE
        FROM T_USER TB1
        LEFT JOIN T_NURSE TB2 ON TB1.ID_USER = TB2.ID_USER
        WHERE TB1.TX_MAIL = '{email}'
        """
        data = self.database.custom_query(query=query)
        return data
    
    def nurse_list(self):
        data = self.database.get_all_data()
        return data
    
    def register_user(self, user: dict):
        name = user.get("name")
        email = user.get("email")
        password = str(user.get("password"))
        query = f"(NM_USER, NM_USER_TYPE, TX_MAIL, PSD_USER) VALUES ('{name}', 'Enfermeiro(a)', '{email}', '{password}')"
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
        if data:
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")

            data_set = f"NM_USER='{name}', TX_MAIL='{email}', PSD_USER='{password}'"

        query = f"SET {data_set} WHERE ID_USER={id}"
        
        changed = self.database.update(query=query)
        return changed