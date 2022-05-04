from __main__ import app

from flask_mysqldb import MySQL
import os


# Database config
app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DATABASE")
mysql = MySQL(app)

# Global Variables
PATIENT_TABLE = "T_PATIENT"
NURSES_TABLE = "T_NURSE"
SYMPTOM_TABLE = "T_SYMPTOM"
CLASSIFICATION_TABLE = "T_PATIENT_CLASSIFICATION"
CLASSIFICATION_SYMPTOMS_TABLE = "T_CLASSIFICATION_SYMPTOM"
USER_TABLE = "T_USER"


#COLUMNS TABLE
NURSES_COLUMNS = ("ID_NURSE", "ID_USER")
USER_COLUMNS = ("ID_USER", "NM_USER", "NM_USER_TYPE")
PATIENT_COLUMNS = ("ID_PATIENT", "NM_PATIENT")
SYMPTOM_COLUMNS = ("ID_SYMPTOM", "NM_SYMPTOM", "ID_FLAG")
CLASSIFICATION_COLUMNS = ("ID_PATIENT_CLASSIFICATION", "ID_NURSE", "ID_PATIENT", "DT_PATIENT_ENTRY", "DT_PATIENT_EXIT")
CLASSIFICATION_SYMPTOMS_COLUMNS = ("ID_CLASSIFICATION_SYMPTOM", "ID_PATIENT_CLASSIFICATION", "ID_SYMPTOM")

#FLAGS
RED_FLAG = 0
YELLOW_FLAG = 1
GREEN_FLAG = 2
BLUE_FLAG = 3

def build_update_str(data: dict):
        query = ""
        for key in data:
            if query:
                query += ", "
            if type(data[key]) == str:
                query = f"{query}{key}={repr(str(data[key]))}"
            else:
                query = f"{query}{key}={data[key]}"
        return query





# CREATE TABLE classifications (
# 	id int NOT NULL,
#     NurseID int NOT NULL,
#     PatientID int NOT NULL,
#     Symptom int NOT NULL,
#     PRIMARY KEY (id),
#     FOREIGN KEY (NurseID)REFERENCES nurses (id)ON DELETE RESTRICT ON UPDATE CASCADE
# )