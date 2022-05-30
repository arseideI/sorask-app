from model.nurse_model import Nurse
from model.user_model import User

class NurseController:

    def get_nurse_list():
        nurses = Nurse().get_nurse_list()
        all_nurse = []
        for nurse in nurses:
            user = User().get_user(id=nurse['ID_USER'])
            all_nurse.append({
                "id":nurse.get("ID_NURSE"),
                "name": user.get("NM_USER"),
                "type": user.get("NM_USER_TYPE"),
                "email": user.get("TX_MAIL")

            })
    
        return all_nurse
    
    def get_nurse(id: int):
        nurse = Nurse().get_nurse(id=id)
        user = User().get_user(id=nurse['ID_USER'])
        formatted ={
            "id":nurse.get("ID_NURSE"),
            "name": user.get("NM_USER"),
            "type": user.get("NM_USER_TYPE"),
            "email": user.get("TX_MAIL")

        }
        return formatted
    
    def register_nurse(nurse_data: dict):

        user = User().register_user(user=nurse_data)
        nurse = Nurse().register_nurse(nurse_id=user.get("id"))
        return nurse
    
    def delete_nurse(id: int):
        nurse = Nurse().delete(id=id)
        return nurse
    
    def update_nurse(id: int, data: dict):
        nurse = Nurse().update(id=id, data=data)
        return nurse