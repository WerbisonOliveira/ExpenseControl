import './ModalDeleteAccount.css';

const ModalDeleteAccount = ({deleteAccount, setLoading, setDeleteAccount, setFeedbackDeleteAccount}) => {

    

    const handleDelete = () => {
        setDeleteAccount(false)
        setTimeout(() => {
            setLoading(false)
            setFeedbackDeleteAccount(true)
            deleteAccount()
        }, 3000)
        setLoading(true)
    }

  
    return (
        <div className='container-background-deleteAccount'>
            <div className='container-modal-deleteAccount'>
                <h3>Deseja realmente excluir a conta?</h3>
                <p>Ao excluir a conta todos os seus dados serão perdidos e você não poderá mais fazer login.</p>
                <div className='container-btn-deleteAccount'>
                    <button type='button' className='btn-cancel-deleteAccount' onClick={() => setDeleteAccount(false)}>Cancelar</button>
                    <button type='button' className='btn-delete-deleteAccount'onClick={() => handleDelete()}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteAccount;