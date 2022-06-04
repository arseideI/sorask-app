import React, {useState, useContext} from 'react';
import {BrowserRouter as Router ,Routes, Route, Navigate } from 'react-router-dom';
import DefaultDash from './modules/DefaultDash';
import logo from './assets/img/logo.jpg'

import ClassificationList from './modules/ClassificationList';
import ClassificationRegister from './modules/RegisterClassification';
import MainPainel from './modules/MainPainel';
import SymptomsList from './modules/SymptomsList';
import RegisterSymptom from './modules/RegisterSymptoms';
import RegisterNurse from './modules/RegisterNurse';
import NurseList from './modules/NurseList';
import GenerationPdf from './modules/GenerationPdf';
import Login from './modules/Login';
import { AuthProvider, AuthContext } from './contexts/auth';


const AppRoutes = ()=>{
    const Private = ({children}) =>{
        const { authenticated, loading } = useContext(AuthContext)
        if(loading){
            return <>Carregando...</>
        }
        if(!authenticated){
            return <Navigate to="/login"/>
        }

        return children
    }
    return(
            <AuthProvider>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Private><DefaultDash><MainPainel/></DefaultDash></Private>}/>
                <Route path="/classifications" element={<Private><DefaultDash><ClassificationList/></DefaultDash></Private>}/>
                <Route path="register-classification" element={<Private><DefaultDash><ClassificationRegister/></DefaultDash></Private>}>
                    <Route path=":classificationId" element={<Private><DefaultDash><ClassificationRegister/></DefaultDash></Private>}/>
                </Route>
                <Route path="/symptoms" element={<Private><DefaultDash><SymptomsList/></DefaultDash></Private>}/>
                <Route path="register-symptoms" element={<Private><DefaultDash><RegisterSymptom/></DefaultDash></Private>}>
                    <Route path=":symptomId" element={<Private><DefaultDash><RegisterSymptom/></DefaultDash></Private>}/>
                </Route>
                <Route path="nurses" element={<Private><DefaultDash><NurseList/></DefaultDash></Private>}/>
                <Route path="register-nurse" element={<Private><DefaultDash><RegisterNurse/></DefaultDash></Private>}>
                    <Route path=":nurseId" element={<Private><DefaultDash><RegisterNurse/></DefaultDash></Private>}/>
                </Route>
                <Route path="/pdf" element={<Private><DefaultDash><GenerationPdf/></DefaultDash></Private>}/>
            </Routes>
        </AuthProvider>

        
    );
}

export default AppRoutes