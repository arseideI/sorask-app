import { 
    BrowserRouter as Router,
    Route, 
    Routes,
    Navigate
 } from "react-router-dom";
import ClassificationList from './modules/ClassificationList';
import ClassificationRegister from './modules/RegisterClassification';
import MainPainel from './modules/MainPainel';
import Login from './modules/Login'
import DashDefault from "./modules/Dash";


 const AppRoutes = () => {
     return (
        
        <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/" element={<MainPainel/>}/>
            <Route exact path="/classifications" element={<ClassificationList/>}/>
            <Route exact path="/register-classification" element={<ClassificationRegister/>}/>
        </Routes>
        
     );
 }

export default AppRoutes;