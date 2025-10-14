import { setDoc, doc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
import { db } from '../../services/firebaseConfig';

import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Feedback from '../../components/Modal/Feedback';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

import logo from '../../assets/Expense Control(icone).png';

import './Register.css';



const Register = () => {
    const [feedback, setFeedback] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    let {createUserWithEmailAndPassword, error} = useContext(AuthContext);
    const navigate = useNavigate();
    let disabled = false;
    const [loading, setLoading] = useState(false);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await createUserWithEmailAndPassword(email, password);
        
        if (error && (error.code === "auth/email-already-in-use")) {
            console.clear();
        }

        setLoading(true)
        setTimeout(async () => {
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
            setName("");
            setFeedback(true)
            setLoading(false)

            user && await setDoc(doc(db, "users", user.user.uid), {
                email, userId: user.user.uid, name
            });

            if(user) {
                await sendEmailVerification(user.user);
            }
        }, 2000)


    }

    if((password !== "" && passwordConfirm !== "" && email !== "") && password === passwordConfirm) {
        disabled = true;
    }

    return (
        <div id='register'>
            {feedback && <Feedback text="Conta criada com sucesso! Verifique seu email antes de fazer login." setModal={setFeedback} />}
            <h2>Criar conta</h2>
            <figure>
                <img src={logo} alt="Logo" />
            </figure>

            {error ? (<p style={{color: "#c11a1aff"}}>{error.code === "auth/email-already-in-use" ? "Email já registrado!" : error.message}</p>): ""}
        
            <form onSubmit={handleSubmit} id='form-register'>

                <div className='form-input'>
                    <label htmlFor="name-register">Nome:</label>
                    <input type="text" name='name-register' id='name-register' placeholder='Seu nome' autoComplete='name' value={name} onChange={(event) => setName(event.target.value)}/>
                </div>

                <div className='form-input'>
                    <label htmlFor="email-register">Email:</label>
                    <input type="email" name='email-register' id='email-register' placeholder='Digite seu melhor email' autoComplete='email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>

                <div className='form-input'>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name='password' id='password'  placeholder='Crie uma senha' minLength={6} autoComplete='new-password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>

                <div className='form-input'>
                    <label htmlFor="confirmPassword">Confirmar senha:</label>
                    <input type="password" name='confirmPassword' id='confirmPassword'  placeholder='Repita a senha' minLength={6} autoComplete='new-password' value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)}/>
                </div>

                {password !== passwordConfirm && (password !== "" && passwordConfirm !== "") ? <p style={{color: "#c11a1aff"}}>Senhas não coincidem</p> : ""}

                <Button text="Criar" disabled={disabled} loading={loading} />
            </form>
            <p>Já tem uma conta? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register;