import MySQLdb
from config import NURSES_COLUMNS, PATIENT_COLUMNS, PATIENT_TABLE, NURSES_TABLE, SYMPTOM_COLUMNS, SYMPTOM_TABLE


class DataService():

    def __init__(self, mysql, table):
        self.mysql = mysql
        self.connect = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        self.table = table
    
    def get_all_data(self):
        """
        Method that get all data in the table
        """
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
        """
        Search method that get a object by id
        :param id: object id
        """
        self.connect.execute(f''' SELECT * FROM {self.table} WHERE id={id}''')
        all_data = []
        for data in self.connect:
            all_data.append(data)

        self.mysql.connection.commit()
        self.connect.close()
        
        if all_data:
            all_data = all_data[0]
        return all_data
    
    def insert(self, data: tuple):
        """
        Method to insert data to data base
        :param table: name of table to insert data
        """
        columns = self.get_table_columns()
        try:
            query = f"""INSERT INTO {self.table} {columns} VALUES {data}"""
            self.connect.execute(query)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": "Falha ao inserir dado", "msg": str(exc)}
        self.connect.close()
        return {"status": "Inserido com sucesso", "id": self.connect.lastrowid}
    
    def delete(self, id: int):
        """
        Delete method used to remove data from database
        :param id: object id
        """
        try:
            query = f"""DELETE FROM {self.table} WHERE id={id}"""
            self.connect.execute(query)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": "Falha ao remover dado", "msg": str(exc)}
        self.connect.close()
        return {"status": "Removido com sucesso", "id": self.connect.lastrowid}
    
    def update(self,id: int, data: dict):
        """
        Method to insert data to data base
        :param table: name of table to insert data
        """
        columns = self.get_table_columns()
        try:
            query = f"""UPDATE {self.table} SET {data} WHERE id={id}"""
            self.connect.execute(query)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": "Falha ao editar registro", "msg": str(exc)}
        self.connect.close()
        return {"status": "Atualizado com sucesso", "id": self.connect.lastrowid}

    def get_table_columns(self):
        """
        Method used to get the ref string to database table name
        """
        columns = ""
        if self.table == PATIENT_TABLE:
            columns = PATIENT_COLUMNS
        elif self.table == NURSES_TABLE:
            columns = NURSES_COLUMNS
        elif self.table == SYMPTOM_TABLE:
            columns = SYMPTOM_COLUMNS
        else:
            print("Tabela não reconhecida")
        return columns
