import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'

const SideMenu = () => {
    const navigate = useNavigate();
    
    const menuItems = [
        {
            key: "dashboard",
            label: "Painel"      
        },
        {
            key: "classifications",
            label: 'Classificação'
        },
        {
            key: "symptoms",
            label: "Sintomas"      
        },
        {
            key: "nurses",
            label: "Profissionais"      
        },
        {
            key: "pdf",
            label: "Relatório"      
        }
        
    ];

    const onMenuItemClicked = (menuItem) => {
        navigate(menuItem.key)
    }

    return (
        <Menu items={menuItems} onClick={onMenuItemClicked} />
    );
};

export default SideMenu;