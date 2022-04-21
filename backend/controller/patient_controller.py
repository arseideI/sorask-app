from model.patient_model import Patient


class PatientController:

    def get_patient_list():
        patients = Patient().patients_list()
        return patients