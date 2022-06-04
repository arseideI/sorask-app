from model.classification_model import Classification
from model.classification_symptom_model import ClassificationSymptom
from controller.patient_controller import PatientController
from controller.symptom_controller import SymptomController

class ClassificationController:
    def __init__(self):
        self.classification = Classification(classification_symptom=ClassificationSymptom())
        
    def get_classification_list(self):
        classifications = self.classification.get_classification_list()
        return list(reversed(classifications))
    
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
            new_id = f"{patient['ID_PATIENT']}${patient['NM_PATIENT']}${patient['CNS']}"
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
        COLORS = {
            1: {"name": "Azul", "color":"#00BEE0"},
            2: {"name": "Verde", "color":"#53C18E"},
            3: {"name": "Amarelo", "color":"#D4B106"},
            4: {"name": "Laranja", "color":"#E09753"},
            5: {"name": "Vermelho", "color":"#E26E6E"},
        }
        all_flags_pizza = []

        all_cartesian = []
        for flag in self.classification.get_dash_flags(days=1):
            flag["COLOR_NM"] = COLORS.get(flag["ID_FLAG"])
            flag["VALUE"] = flag["COUNT(*)"]
            all_flags_pizza.append(flag)

        
        for flag in self.classification.get_dash_flags(days=7):
            flag["COLOR_NM"] = COLORS.get(flag["ID_FLAG"])
            flag["VALUE"] = flag["COUNT(*)"]
            all_cartesian.append(flag)

        return {
            "graph3": self.classification.get_dash_symptoms(days=7),
            "graph1": self.classification.get_dash_symptoms(days=1),
            "graph2": all_flags_pizza,
            "graph4": all_cartesian,
            "classification": self.get_classification_list()
        }