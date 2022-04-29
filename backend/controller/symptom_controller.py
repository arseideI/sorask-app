from model.symptom_model import Symptom

class SymptomController:

    def get_symptom_list():
        symptoms = Symptom().get_symptom_list()
        return symptoms
    
    def get_symptom(id: int):
        symptom = Symptom().get_symptom(id=id)
        return symptom
    
    def register_symptom(symptom_data: dict):
        symptom = Symptom().register_symptom(symptom=symptom_data)
        return symptom
    
    def delete_symptom(id: int):
        symptom = Symptom().delete(id=id)
        return symptom
    
    def update_symptom(id: int, data: dict):
        symptom = Symptom().update(id=id, data=data)
        return symptom