from services.db import DataService
from config import mysql, SYMPTOM_TABLE, build_update_str
import logging

class Symptom():
    def __init__(self):
        self.database = DataService(mysql=mysql, table=SYMPTOM_TABLE)
    
    def get_symptom(self, id: int):
        query = f"WHERE ID_SYMPTOM={id}"
        data = self.database.get_by_id(query=query)
        return data

    def get_symptom_list(self):
        data = self.database.get_all_data()
        for symptom in data:
            symptom["HASH_NAME"] = f"{symptom['ID_SYMPTOM']}${symptom['NM_SYMPTOM']}${symptom['ID_FLAG']}"
        return data
    
    def register_symptom(self, symptom: dict):
        name = symptom.get("name")
        flag = symptom.get("flag")
    
        query = f"(NM_SYMPTOM, ID_FLAG) VALUES ('{name}','{flag}')"
        try:
            data = self.database.insert(query=query)
        except Exception as exc:
            logging.exception(f"[SYMPTOM][register_symptom] Erro ao inserir novo sintoma: {exc} ")
        return data
    
    def delete(self, id: int):
        query = f"WHERE ID_SYMPTOM={id}"
        data = self.database.delete(id_query=query)
        return data
    
    def update(self, id: int, data:dict):
        values = ""
        name = data.get("name", None)
        flag = data.get("flag")
    
        query = f"SET NM_SYMPTOM='{name}', ID_FLAG='{flag}' WHERE ID_SYMPTOM={id}"

        changed = self.database.update(query=query)
        return changed
    
    
    