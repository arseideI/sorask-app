
from controller.classification_controller import ClassificationController

class Dashboard:

    def get_dashboard():
        all_classifications = []
        classifications = ClassificationController.get_classification_list()
        for classification in classifications:
            all_classifications.append({
            "id": classification.get("id"),
            "flag": classification.get("flag"),
            "name": classification.get("patient",{}).get("name")
        })

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