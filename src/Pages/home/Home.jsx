import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ContextData } from '../../context/ContextData';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Modal from '../../components/Modal/Modal';

import { SlMenu } from "react-icons/sl";

import './Home.css';


const Home = () => {
    let {value} = useContext(AuthContext);
    const {user} = useContext(ContextData);
    const [exit, setExit] = useState(false);
    const [menu, setMenu] = useState(false);
    let nameUser = "";



    if(user)
    {
        user?.map((user) => {
            nameUser = user.name;
        })
    } else {
        nameUser = value.displayName;
    }
    

    return (
        <main className='home'>
            {exit && <Modal exit={setExit} />}
            <div className='container-menu'>
                <SlMenu className='menu'onClick={() => setMenu(true)}/>
            </div>
            <Sidebar exit={setExit}  name={nameUser} menu={menu} setMenu={setMenu} />
            <div className='content'>
                <Outlet />
            </div>
        </main>
    )
}

export default Home;