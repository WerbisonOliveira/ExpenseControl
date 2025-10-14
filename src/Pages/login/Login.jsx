import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';

import logo from '../../assets/Expense Control(icone).png';

import './Login.css';



const Login = () => {
    let {signInWithEmailAndPassword, load, erro} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();
    let disabled = false;


    if(password !== "" && email !== "") disabled = true;

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const user = await signInWithEmailAndPassword(email, password)
        if(user?.user.emailVerified === true) {
            navigate("/home");
        } else if (erro && (erro.code === "auth/invalid-credential")) {
            console.clear();
        } else if(user?.user.emailVerified === false) {
            setTimeout(() => {
                setValid(false)
            }, 10000)
            setValid(true)
        }
        
    }


    return (
        <div id='login'>
            <figure>
                <img src={logo} alt="Logo" />
            </figure>
            <p>Insira email e senha para fazer login:</p>

            {erro ? (<p style={{color: "#c11a1aff"}} className='feedback-erro'>Email e/ou senha inválido(s)</p>): ""}

            {valid ? (<p style={{color: "#c11a1aff"}} className='feedback-erro'>Email não verificado! Verifique o seu email antes de fazer login.</p>): ""}

            <form onSubmit={handleSubmit} id='form-login'>

                <div className='form-input'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' id='email' placeholder='Email' autoComplete='current-email' value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>

                <div className='form-input'>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name='password' id='password'  placeholder='Senha' autoComplete='current-password' value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>

                <Button text="Entrar" disabled={disabled} load={load} />
            </form>
            <Link to="/ResetPassword">Esqueceu a senha?</Link>
            <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
        </div>
    )
}

export default Login;