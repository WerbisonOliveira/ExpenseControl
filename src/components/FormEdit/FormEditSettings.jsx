import { useState, useContext } from 'react';
import { ContextData } from '../../context/ContextData';
import { AuthContext } from '../../context/AuthContext';


import './FormEditSettings.css';
import { MdClose } from "react-icons/md";


const FormEditSettings = ({setEdit, setFeedback, setLoading, name, email, id, setIsChangeEmail}) => {
    const {verifyBeforeUpdateEmail} = useContext(AuthContext);
    const {updateUser} = useContext(ContextData);
    const [emailUpdate, setEmailUpdate] = useState(email);
    const [nameUpdate, setNameUpdate] = useState(name);
    const [valid, setValid] = useState(false);

    const handleUpdateDataSettings = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setLoading(false);
            setFeedback(true)
            if(emailUpdate !== email) {
                setIsChangeEmail(true)
                verifyBeforeUpdateEmail(emailUpdate)
            }
            updateUser(id, {name:nameUpdate, email:emailUpdate})
        }, 3000)
        setEdit(false);
        setLoading(true);
    }


    return (
        <div className='container-form-update-settings'>
            <div className='container-form-settings'>
                <div className='container-form-title-settings'>
                    <MdClose className='close-settings' onClick={() => setEdit(false)}/>
                </div>
                <h2 className='form-title-settings'>Atualizar informações</h2>
                {valid && <p style={{color: "red", textAlign: "center", fontSize: "0.8rem", marginTop: "5px"}}>Dados sem alteração.</p>}
                <form>
                    <div className='form-input-update-settings'>
                        <label htmlFor="email">Email:</label>
                        <input type='text' name='email' id='email' value={emailUpdate} onChange={(event) => setEmailUpdate(event.target.value)} />
                    </div>
                    <div className='form-input-update-settings'>
                        <label htmlFor="name">Nome:</label>
                        <input type="text" name='name' id='name' value={nameUpdate} onChange={(event) => setNameUpdate(event.target.value)}/>
                    </div>
                    {name !== nameUpdate || email !== emailUpdate ? <button type='submit'className='btn-update-settings' onClick={(event) => handleUpdateDataSettings(event)}>Atualizar</button> : <button type='button'className='btn-update-settings' onClick={() => setValid(true)}>Atualizar</button>}
                </form>
            </div>
        </div>
    )
}

export default FormEditSettings;