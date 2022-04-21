import MySQLdb
from config import NURSES_COLUMNS, PATIENT_COLUMNS, PATIENT_TABLE, NURSES_TABLE
class DataService():

    def __init__(self, mysql, table):
        self.mysql = mysql
        self.connect = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        self.table = table
    
    def get_all_data(self):

        self.connect.execute(f''' SELECT * FROM {self.table}''')
        all_data = []
        for data in self.connect:
            all_data.append(data)
        #Saving the Actions performed on the DB
        self.mysql.connection.commit()
        
        #Closing the cursor
        self.connect.close()
        return all_data
    
    def get_by_id(self, id: int):
        self.connect.execute(f''' SELECT * FROM {self.table} WHERE id={id}''')
        all_data = []
        for data in self.connect:
            all_data.append(data)
        #Saving the Actions performed on the DB
        self.mysql.connection.commit()
        
        #Closing the cursor
        self.connect.close()
        return all_data
    
    def insert(self, data: dict):
        """
        Method to insert data to data base
        :param table: name of table to insert data
        """
        columns = self.get_table_columns()
        try:
            values = (data["name"], data["register"], data["email"])
            query = f"""INSERT INTO {self.table} {columns} VALUES {values}"""
            self.connect.execute(query)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": "Falha ao inserir dado", "msg": str(exc)}
        self.connect.close()
        return {"status": "Inserido com sucesso", "id": self.connect.lastrowid}
    
    def delete(self, id: int):
        try:
            query = f"""DELETE FROM {self.table} WHERE id={id}"""
            self.connect.execute(query)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": "Falha ao remover dado", "msg": str(exc)}
        self.connect.close()
        return {"status": "Removido com sucesso", "id": self.connect.lastrowid}

    def get_table_columns(self):
        columns = ""
        if self.table == PATIENT_TABLE:
            columns = PATIENT_COLUMNS
        elif self.table == NURSES_TABLE:
            columns = NURSES_COLUMNS
        else:
            print("Tabela não reconhecida")
        return columns

       