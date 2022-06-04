import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Image } from 'antd';
import logo from './assets/img/logo.jpg'

// import ClassificationList from './modules/ClassificationList';
// import ClassificationRegister from './modules/RegisterClassification';
// import MainPainel from './modules/MainPainel';
// import SideMenu from './components/SideMenu';
// import SymptomsList from './modules/SymptomsList';
// import RegisterSymptom from './modules/RegisterSymptoms';
// import RegisterNurse from './modules/RegisterNurse';
// import NurseList from './modules/NurseList';
// import GenerationPdf from './modules/GenerationPdf';
import AppRoutes from './AppRoutes';

const { Sider, Content, Footer, Header } = Layout;

export default function App() {
  document.title = "Sorask"
  return (
    <AppRoutes/>
  )
}
