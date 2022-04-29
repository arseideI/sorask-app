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
PATIENT_TABLE = "patients"
NURSES_TABLE = "nurses"
SYMPTOM_TABLE = "symptoms"


#COLUMNS TABLE
NURSES_COLUMNS = "(name, registration, cpf, email, password, status)"
PATIENT_COLUMNS = "(name, register, email)"
SYMPTOM_COLUMNS = "(name, flag)"

#FLAGS
RED_FLAG = 0
YELLOW_FLAG = 1
GREEN_FLAG = 2
BLUE_FLAG = 3

def build_update_str(self, data: dict):
        query = ""
        for key in data:
            if query:
                query += ", "
            if type(data[key]) == str:
                query = f"{query}{key}={repr(str(data[key]))}"
            else:
                query = f"{query}{key}={data[key]}"
        return query