import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import Feedback from '../Modal/Feedback';

import logo from '../../assets/Expense Control(icone).png';
import './FormChangePassword.css';

const FormChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const [error, setError] = useState(false);

    const {sendPasswordResetEmail} = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const sendEmailReserPassword = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setLoading(false)
            setFeedback(true)
            sendPasswordResetEmail(email)
        }, 2000)
        setLoading(true)
        setEmail("")
        setError(false)
    }


    return (
        <div id='login-resetpassword'>
            {loading && <Loading />}
            {feedback && <Feedback text="Verifique seu email. Foi enviado um email para redefinição de senha" setModal={setFeedback}  />}
            <figure>
                <img src={logo} alt="Logo" />
            </figure>
            <p>Insira o email da sua conta.</p>

            {error && (<p style={{color: "#c11a1aff"}}>Campo de email vazio.</p>)}

            <form id='form-login-resetpassword'>

                <div className='form-input-resetpassword'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' id='email' placeholder='Email' autoComplete='current-email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>

                {email === "" ? <button type="button" className='reset-password' onClick={() => setError(true)}>Redefinir senha</button> : <button type="button" className='reset-password' onClick={(event) => sendEmailReserPassword(event)}>Redefinir senha</button>}
            </form>
            <p><Link to="/login">Fazer login</Link></p>
        </div>
    )
}

export default FormChangePassword;