import './ModalDelete.css';


const ModalDelete = ({deleteLaunch, id, setModal,setModalDelete, setLoading}) => {


    const handleDelete = () => {
        setModal(false)
        setTimeout(() => {
            setLoading(false)
            setModalDelete(true)
            deleteLaunch(id);
        }, 3000)
        setLoading(true)
    }


    return (
        <div className='container-background'>
            <div className='container-modal'>
                <h3>Deseja realmente excluir este item?</h3>
                <div className='container-btn'>
                    <button type='button' className='btn-cancel-history' onClick={() => setModal(false)}>Cancelar</button>
                    <button type='button' className='btn-delete-history'onClick={() => handleDelete()}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;