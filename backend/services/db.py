import MySQLdb

class DataService():

    def __init__(self, mysql, table):
        self.mysql = mysql
        self.connect = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        self.table = table
    
    def get_all_data(self):

        self.connect.execute(f''' SELECT * FROM {self.table}''')
        all_nurses = []
        for nurse in self.connect:
            all_nurses.append(nurse)
        #Saving the Actions performed on the DB
        self.mysql.connection.commit()
        
        #Closing the cursor
        self.connect.close()
        return all_nurses
    
    def insert(self, data: dict):
        """
        Method to insert data to data base
        :param table: name of table to insert data
        """
        name = data["name"]
        registration = data["registration"]
        cpf = data["cpf"]
        email = data["email"]
        password = data["password"]
        status = data["status"]
        values = [({data['name']}, {data['registration']}, {data['cpf']}, {data['email']}, {data['password']}, {data['status']})]
        query = f"""INSERT INTO nurses (name, registration, cpf, email, password, status) VALUES ($s, $s, $s, $s, $s, $s)"""
        print("Query========================== ", query)
        result = self.connect.execute(query, values)
        self.mysql.connection.commit()
        print("Resultado ================ ", result)
        self.connect.close()
        return {"status": "inserido com sucesso"}


       