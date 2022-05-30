from model.classification_model import Classification
from model.classification_symptom_model import ClassificationSymptom
from controller.patient_controller import PatientController
from controller.symptom_controller import SymptomController

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
    
    def get_data_to_classification_form(self):
        patients = PatientController.get_patient_list()
        formatted_patient = []
        formatted_symptoms = []
        for patient in patients:
            new_id = f"{patient['ID_PATIENT']}${patient['NM_PATIENT']}$212987432"
            formatted_patient.append({
                'name': patient['NM_PATIENT'],
                'id': new_id
            })

        symptoms = SymptomController.get_symptom_list()
        for symptom in symptoms:
            formatted_symptoms.append({
                'name': symptom['NM_SYMPTOM'],
                'id': symptom['HASH_NAME']
            })
        
        dashboard = {
            "symptoms": formatted_symptoms,
            "patients": formatted_patient
        }
        return dashboard
    
    def get_dash(self):
        return self.classification.get_dash()