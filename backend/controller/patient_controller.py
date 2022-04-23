from model.patient_model import Patient


class PatientController:

    def get_patient_list():
        patients = Patient().patients_list()
        return patients
    
    def get_patient(id: int):
        patient = Patient().get_patient(id=id)
        return patient
    
    def register_patient(patient_data: dict):
        patient = Patient().register_patient(patient=patient_data)
        return patient
    
    def delete_patient(id: int):
        patient = Patient().delete(id=id)
        return patient
    
    def update_patient(id: int, data: dict):
        patient = Patient().update(id=id, data=data)
        return patient