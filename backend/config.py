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
