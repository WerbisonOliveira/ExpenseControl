import { NavLink } from 'react-router-dom';
import {BiArrowToLeft, BiHistory } from 'react-icons/bi'
import {IoAddCircleOutline, IoSettingsOutline, IoHomeOutline } from 'react-icons/io5'
import { IoMdClose } from "react-icons/io";


import './Sidebar.css';


const Sidebar = ({exit, name, menu, setMenu}) => {

    return (
        <div className={menu ? "show" : "sidebar"}>
            <ul className='sidebar-options' >
                <div className='container-close-menu'>
                    <IoMdClose className='close-menu' onClick={() => setMenu(false)}/>
                </div>
                
                <h2>Olá, {name}</h2>
                
                <NavLink to="" onClick={() => setMenu(false)}><li className='option'>Geral<IoHomeOutline /></li></NavLink>
                
                <NavLink to="/home/add" onClick={() => setMenu(false)}><li className='option'>Adicionar<IoAddCircleOutline /></li></NavLink>
                
                <NavLink to="/home/history" onClick={() => setMenu(false)}><li className='option'>Histórico <BiHistory/></li></NavLink>
            
                <NavLink to="/home/settings" onClick={() => setMenu(false)}><li className='option'>Configurações<IoSettingsOutline /></li></NavLink>
            </ul>
            <button onClick={() => exit(true)} className='signOut'><BiArrowToLeft/> Sair</button> 
        </div>
    )
}

export default Sidebar;