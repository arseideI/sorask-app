import React from 'react';
import {BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import { Layout, Image } from 'antd';
import DefaultDash from './modules/DefaultDash';
import logo from './assets/img/logo.jpg'

import ClassificationList from './modules/ClassificationList';
import ClassificationRegister from './modules/RegisterClassification';
import MainPainel from './modules/MainPainel';
import SideMenu from './components/SideMenu';
import SymptomsList from './modules/SymptomsList';
import RegisterSymptom from './modules/RegisterSymptoms';
import RegisterNurse from './modules/RegisterNurse';
import NurseList from './modules/NurseList';
import GenerationPdf from './modules/GenerationPdf';

const AppRoutes = ()=>{
    return(
        <Routes>
        <Route path="/" element={<DefaultDash><MainPainel/></DefaultDash>}/>
        <Route path="/classifications" element={<DefaultDash><ClassificationList/></DefaultDash>}/>
        <Route path="register-classification" element={<DefaultDash><ClassificationRegister/></DefaultDash>}>
          <Route path=":classificationId" element={<DefaultDash><ClassificationRegister/></DefaultDash>}/>
        </Route>
        <Route path="/symptoms" element={<DefaultDash><SymptomsList/></DefaultDash>}/>
        <Route path="register-symptoms" element={<DefaultDash><RegisterSymptom/></DefaultDash>}>
          <Route path=":symptomId" element={<DefaultDash><RegisterSymptom/></DefaultDash>}/>
        </Route>
        <Route path="nurses" element={<DefaultDash><NurseList/></DefaultDash>}/>
        <Route path="register-nurse" element={<DefaultDash><RegisterNurse/></DefaultDash>}>
          <Route path=":nurseId" element={<DefaultDash><RegisterNurse/></DefaultDash>}/>
        </Route>
        <Route path="/pdf" element={<DefaultDash><GenerationPdf/></DefaultDash>}/>
      </Routes>
    );
}

export default AppRoutes