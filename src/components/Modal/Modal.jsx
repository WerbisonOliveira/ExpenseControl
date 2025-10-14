import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './Modal.css';

const Modal = ({exit}) => {
    const {signOut} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSignOut = () => {
        try {         
            const user = signOut();
            if(user)
                navigate("/login");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='background'>
            <div className='modal-exit'>
                <p>Deseja realmente sair?</p>
                <div className='exit'>
                    <button type='button' className='btn-cancel'onClick={() => exit(false)}>Cancelar</button>
                    <button type='button' className='btn-exit'onClick={async () => handleSignOut()}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;