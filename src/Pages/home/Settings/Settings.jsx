import { useContext, useEffect, useState } from 'react';
import { ContextData } from '../../../context/ContextData';
import { AuthContext } from '../../../context/AuthContext';

import FormEditSettings from '../../../components/FormEdit/FormEditSettings';
import Feedback from '../../../components/Modal/Feedback';
import Loading from '../../../components/Loading/Loading';
import ModalDeleteAccount from '../../../components/Modal/ModalDeleteAccount';

import './Settings.css';
import { MdEdit } from 'react-icons/md';



const Settings = () => {
  let {value} = useContext(AuthContext)
  const {user, deleteAccountUser} = useContext(ContextData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  let [isChangeEmail, setIsChangeEmail] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [feedbackDeleteAccount, setFeedbackDeleteAccount] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const email = await user[0]?.email
        const nome = await user[0]?.name
        setEmail(email)
        setName(nome)
      } catch (error) {
        console.error("error: " + error)
      }
    }
    getUser();

  }, [])

 
  const handleDeleteAccount = async () => {
      deleteAccountUser(value, value.uid)
  }

  

  return (
    <section className='container-settings'>
      {edit && <FormEditSettings setEdit={setEdit} setLoading={setLoading} setFeedback={setFeedback} name={name} email={email} id={user[0]?.id} setIsChangeEmail={setIsChangeEmail} />}
      {loading && <Loading />}
      {feedback && <Feedback text={isChangeEmail ? "Dados atualizados com sucesso! Faça a verificação do seu novo email." : "Dados atualizados com sucesso!"} setModal={setFeedback} />}
      {deleteAccount && <ModalDeleteAccount deleteAccount={handleDeleteAccount} setLoading={setLoading} setDeleteAccount={setDeleteAccount} setFeedbackDeleteAccount={setFeedbackDeleteAccount} />}
      {feedbackDeleteAccount && <Feedback text="Conta apagada com sucesso!" setModal={setFeedbackDeleteAccount}/>}
      <h2 className='title-settings'>Configurações</h2>
      <div className='settings'>
        <h3>Informações da conta</h3>
        <form>
          <div className="container-control-input">
            <div className="control-input">
              <label htmlFor="email">Email:</label>
              <input type="email" name='email' id='email' defaultValue={email} disabled/>
            </div>
            <div className="control-input">
              <label htmlFor="name">Nome:</label>
              <input type="text" name='name' id='name' defaultValue={name} disabled/>
            </div>
          </div>
          <div className="container-btn-settings">
            <div className='container-btn-settings'>
              <button type='button' className='edit-settings' onClick={() => setEdit(true)}><MdEdit /></button>
            </div>
            <div>
              <button type='button' className='btn-deleteaccount' onClick={() => setDeleteAccount(true)}>Excluir conta</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Settings;