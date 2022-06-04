import React, {Children, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Alert, message } from 'antd';
import {api, createSession} from '../services/api'

export const AuthContext = createContext();

    
export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [userAccess, setUserAccess] = useState(null)
    const [verifyUser, setverifyUser] = useState(null)
    
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        const recoveredUSer = localStorage.getItem('user')

        if(recoveredUSer){
            setUser(JSON.parse(recoveredUSer))

        }
        setLoading(false)
    }, [])

    const login = async (email, password) =>{
            
        
        const response = await createSession(email, password)
        console.log('login auth',response.data)

        const loggedUser = response.data.user
        
        if (response.data.auth == true){
            localStorage.setItem("user",JSON.stringify(loggedUser))
            setUser(loggedUser)
            navigate("/")
        }
        
    }

    const logout = () => {
        console.log("logout")
        localStorage.removeItem('user')
        setUser(null)
        navigate("/login")
    }

    return(
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}