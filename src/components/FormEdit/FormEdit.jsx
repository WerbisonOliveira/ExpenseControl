import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ContextData } from '../../context/ContextData';

import './FormEdit.css';
import { MdClose } from "react-icons/md";

const FormEdit = ({id, title, valueLaunch, description, type, setEdit, setFeedback, setLoading}) => {
    
    const [titleUpdate, setTitleUpdate] = useState(title);
    const [descriptionUpdate, setDescriptionUpdate] = useState(description);
    const [typeUpdate, setTypeUpdate] = useState(type);
    const [valueLaunchUpdate, setValueLaunchUpdate] = useState(valueLaunch);
    const [ valid, setValid] = useState(false);

    let {value} = useContext(AuthContext);
    const {updateData} = useContext(ContextData);

    const updatedata = {
        title: titleUpdate,
        description: descriptionUpdate,
        type: typeUpdate,
        valueLaunch: parseFloat(valueLaunchUpdate.replace(",", ".")),
        userId: value.uid
    }

    const handleUpdateData = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setLoading(false);
            setFeedback(true)
            updateData(id, updatedata)
        }, 3000)
        setEdit(false);
        setLoading(true);
    }
    


    return (
        <div className='container-form-update'>
            <div className='container-form'>
                <div className='container-form-title'>
                    <MdClose className='close' onClick={() => setEdit(false)}/>
                </div>
                <h2 className='form-title'>Atualizar informações</h2>
                {valid && <p style={{color: "red", textAlign: "center", fontSize: "0.8rem", marginTop: "5px"}}>Dados sem alteração.</p>}
                <form>
                    <div className='form-input-update'>
                        <label htmlFor="title">Título:</label>
                        <input type='text' name='title' id='title' value={titleUpdate} onChange={(event) => setTitleUpdate(event.target.value)} required placeholder='Ex.: Salário'/>
                    </div>
                    <div className='form-input-update'>
                        <label htmlFor="type">Tipo:</label>
                        <select name="type" id='type' value={typeUpdate} onChange={(event) => setTypeUpdate(event.target.value)} required>
                            <option value="">Selecione o tipo de lançamento</option>
                            <option value="Depósito">Depósito</option>
                            <option value="Despesa">Despesa</option>
                        </select>
                    </div>
                    <div className='form-input-update'>
                        <label htmlFor="value">Valor:</label>
                        <input type='text' name='value' id='value' value={valueLaunchUpdate} onChange={(event) => setValueLaunchUpdate(event.target.value)} required placeholder='Ex.: 1518,00'/>
                    </div>
                    <div className='form-input-update'>
                        <label htmlFor="description">Descrição:</label>
                        <textarea id='description' value={descriptionUpdate} onChange={(event) => setDescriptionUpdate(event.target.value)} placeholder='Ex.: Depositando dinheiro'/>
                    </div>
                    {title === titleUpdate && description === descriptionUpdate && valueLaunch === valueLaunchUpdate && type === typeUpdate ? <button type='button'className='btn-update' onClick={() => setValid(true)}>Atualizar</button> : <button type='submit'className='btn-update' onClick={(event) => handleUpdateData(event)}>Atualizar</button>}
                </form>
            </div>
        </div>
    )
}

export default FormEdit;