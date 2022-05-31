
from controller.classification_controller import ClassificationController

class Dashboard:

    def get_dashboard():
        all_classifications = []
        dash = ClassificationController.get_dash()
        symptoms_today = dash["graph1"]
        symptoms_week = dash["graph3"]

        flags_today = dash["graph2"]
        flags_week = dash["graph4"]

        formatted = {
            "classification": {
                "columns": [],
                "data": all_classifications
            },
            "graph1":{
                "columns": [],
                "data": []
            },
            "graph2":{
                "columns": [],
                "data": []
            },
            "graph3":{
                "columns": [],
                "data": []
            },
            "graph4":{
                "columns": [],
                "data": []
            },

        }
        return formatted