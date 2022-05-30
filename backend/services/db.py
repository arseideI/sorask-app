import MySQLdb
from config import (NURSES_COLUMNS, PATIENT_COLUMNS, PATIENT_TABLE, NURSES_TABLE,
 SYMPTOM_COLUMNS, SYMPTOM_TABLE, CLASSIFICATION_COLUMNS, CLASSIFICATION_TABLE, CLASSIFICATION_SYMPTOMS_COLUMNS, CLASSIFICATION_SYMPTOMS_TABLE) 


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
    
    def get_by_id(self, query: int):
        """
        Search method that get a object by id
        :param id: object id
        """
        self.connect.execute(f''' SELECT * FROM {self.table} {query}''')
        all_data = []
        for data in self.connect:
            all_data.append(data)

        self.mysql.connection.commit()
        self.connect.close()
        
        if all_data:
            all_data = all_data[0]
        return all_data
    
    def insert(self, query: str):
        """
        Method to insert data to data base
        :param table: name of table to insert data
        """
        try:
            query_str = f"""INSERT INTO {self.table} {query}"""
            self.connect.execute(query_str)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": f"Falha ao inserir dado na tabela: {self.table}", "msg": str(exc)}
        self.connect.close()
        return {"status": "Inserido com sucesso", "id": self.connect.lastrowid}
    
    def delete(self, id_query: str):
        """
        Delete method used to remove data from database
        :param id: object id
        """
        try:
            query = f"""DELETE FROM {self.table} {id_query}"""
            self.connect.execute(query)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": "Falha ao remover dado", "msg": str(exc)}
        self.connect.close()
        return {"status": "Removido com sucesso", "id": self.connect.lastrowid}
    
    def update(self, query: str):
        """
        Method to insert data to data base
        :param table: name of table to insert data
        """

        try:
            query_str = f"""UPDATE {self.table} {query}"""
            self.connect.execute(query_str)
            self.mysql.connection.commit()
        except Exception as exc:
            self.mysql.connection.rollback()
            return {"status": "Falha ao editar registro", "msg": str(exc)}
        self.connect.close()
        return {"status": "Atualizado com sucesso", "id": self.connect.lastrowid}
    
    def get_interval_symptoms(self):
        query = """

        SELECT TB1.ID_SYMPTOM, TB2.NM_SYMPTOM, COUNT(*) FROM T_CLASSIFICATION_SYMPTOM TB1
        INNER JOIN T_SYMPTOM TB2 ON TB1.ID_SYMPTOM = TB2.ID_SYMPTOM
        WHERE ID_PATIENT_CLASSIFICATION IN 
        (SELECT ID_PATIENT_CLASSIFICATION FROM T_PATIENT_CLASSIFICATION WHERE DT_PATIENT_ENTRY > NOW() - interval 7 day)
        GROUP BY ID_SYMPTOM
        ORDER BY COUNT(*) DESC
        LIMIT 10;

        """
        result = self.custom_query(query=query)

        return result

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
        elif self.table == CLASSIFICATION_TABLE:
            columns = CLASSIFICATION_COLUMNS
        elif self.table == CLASSIFICATION_SYMPTOMS_TABLE:
            columns = CLASSIFICATION_SYMPTOMS_COLUMNS
        else:
            print("Tabela não reconhecida")
        return columns
    
    def get_list_by_id(self, query: int):
        """
        Search method that get a object by id
        :param id: object id
        """
        self.connect.execute(f''' SELECT * FROM {self.table} {query}''')
        all_data = []
        for data in self.connect:
            all_data.append(data)

        self.mysql.connection.commit()
        self.connect.close()
        
        return all_data
    
    def custom_query(self, query:str):
        self.connect.execute(query)
        all_data = []
        for data in self.connect:
            all_data.append(data)

        self.mysql.connection.commit()
        

        return all_data
