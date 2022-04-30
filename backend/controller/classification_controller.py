from model.classification_model import Classification
from model.classification_symptom_model import ClassificationSymptom

class ClassificationController:
    def __init__(self):
        self.classification = Classification(classification_symptom=ClassificationSymptom())
        
    def get_classification_list(self):
        classifications = self.classification.get_classification_list()
        return classifications
    
    def get_classification(self, id: int):
        classification = self.classification.get_classification(id=id)
        return classification
    
    def register_classification(self, classification_data: dict):
        classification = self.classification.register_classification(classification=classification_data)
        return classification
    
    def delete_classification(self, id: int):
        classification = self.classification.delete(id=id)
        return classification
    
    def update_classification(self, id: int, data: dict):
        classification = self.classification.update(id=id, data=data)
        return classification