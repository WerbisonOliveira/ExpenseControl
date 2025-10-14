import './Button.css';


const Button = ({text, disabled, load, loading}) => {

  return (
    <div>
        {disabled ? (<button type='submit' value={text} className='btn-form'>{load ? "Entrando..." : loading ? "Criando..." : text}</button>) : (<button type='submit' value={text} className='btn-form' disabled>{text}</button>)}
    </div>
  )
}

export default Button;