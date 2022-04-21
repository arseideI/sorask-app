from services.db import DataService
from config import mysql, PATIENT_TABLE

class Patient:
    def __init__(self):
        self.database = DataService(mysql=mysql, table=PATIENT_TABLE)

    def get_user(self, id: int):

        return None
    
    def patients_list(self):
        data = self.database.get_all_data()
        return data
    