import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { usePost } from '../../../hooks/usePost';

import Loading from '../../../components/Loading/Loading';
import Feedback from '../../../components/Modal/Feedback';

import { serverTimestamp } from 'firebase/firestore';


import './Add.css';


const Add = () => {
  let {value} = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const {response, post} = usePost();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [valueLaunch, setValueLaunch] = useState("");

  const postdata = {
    title,
    date: serverTimestamp(),
    description,
    type,
    valueLaunch: parseFloat(valueLaunch?.replace(",",".")),
    userId: value.uid
  }

  const handleSubmitPost = async (event) => {
    event.preventDefault();
    post(postdata);
    setTitle("");
    setDescription("");
    setType("");
    setValueLaunch("");

    setTimeout(() => {
      setLoading(false)
      setModal(true)
    }, 3000)
    setLoading(true)
    setValid(false)
  }



  return (
    <section className='container-form-add'>
      {modal && <Feedback setModal={setModal} text="Adicionado com sucesso" />}{loading && <Loading />}
      <h2 className='title-add'>Adicione uma despesa ou depósito</h2>
      <div className='container-form-add'>
        <form>
          {valid && <p style={{color: "red", textAlign: "center", fontSize: "0.8rem"}}>Preencha os campos obrigatórios.</p>}
          <div className='form-input-add'>
            <label htmlFor="title">Título<span>*</span>:</label>
            <input type='text' name='title' id='title' value={title} onChange={(event) => setTitle(event.target.value)} required placeholder='Ex.: Salário'/>
          </div>
          <div className='form-input-add'>
            <label htmlFor="type">Tipo<span>*</span>:</label>
            <select name="type" id='type' value={type} onChange={(event) => setType(event.target.value)} required>
              <option value="">Selecione o tipo de lançamento</option>
              <option value="Depósito">Depósito</option>
              <option value="Despesa">Despesa</option>
            </select>
          </div>
          <div className='form-input-add'>
            <label htmlFor="value">Valor<span>*</span>:</label>
            <input type='text' name='value' id='value' value={valueLaunch} onChange={(event) => setValueLaunch(event.target.value.replace(/[^0-9,]/g, ""))} required placeholder='Ex.: 1518,00'/>
          </div>
          <div className='form-input-add'>
            <label htmlFor="description">Descrição:</label>
            <textarea id='description' value={description} onChange={(event) => setDescription(event.target.value)} placeholder='Ex.: Depositando dinheiro'/>
          </div>
          {title !== "" && type !== "" && valueLaunch ? <button type='submit'className='btn-add' onClick={(event) => handleSubmitPost(event)}>Adicionar</button> : <button type='submit' className='btn-add' onClick={() => setValid(true)}>Adicionar</button>}
        </form>
      </div>
    </section>
  )
}

export default Add;