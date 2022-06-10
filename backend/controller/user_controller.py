from model.user_model import User

class UserController:
    def __init__(self) -> None:
        self.user = User()
    
    def login(self, data=dict):
        email = data.get("email")
        password = data.get("password")
        auth = {
                    "auth": False,
                    "user": {}
                }
        if email:
            user = self.user.get_user_by_email(email=email)[0]
            formatted_user = self.format_user(user=user)
            user_email = formatted_user.get("email")
            user_pass = formatted_user.get("password")
            if email == user_email and password == user_pass:
                auth["auth"] = True
                auth["user"] = formatted_user
        return auth

    def format_user(self, user:dict):
        formatted_user = {
            "name": user.get("NM_USER"),
            "email": user.get("TX_MAIL"),
            "id": user.get("ID_USER"),
            "id_nurse": user.get("ID_NURSE"),
            "password": user.get("PSD_USER"),
            "type": user.get("NM_USER_TYPE"),
            "removed_at": user.get("FL_EXCL")
        }
        return formatted_user
