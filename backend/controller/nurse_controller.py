from model.nurse_model import Nurse

class NurseController:

    def get_nurse_list():
        nurses = Nurse().get_nurse_list()
        return nurses
    
    def get_nurse(id: int):
        nurse = Nurse().get_nurse(id=id)
        return nurse
    
    def register_nurse(nurse_data: dict):
        nurse = Nurse().register_nurse(nurse=nurse_data)
        return nurse
    
    def delete_nurse(id: int):
        nurse = Nurse().delete(id=id)
        return nurse
    
    def update_nurse(id: int, data: dict):
        nurse = Nurse().update(id=id, data=data)
        return nurse