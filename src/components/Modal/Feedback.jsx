import './Feedback.css';
import success from '../../assets/check.png';

const Feedback = ({setModal, text}) => {


    return (
        <div className="background-feedback">
            <div className="modal-feedback">
                <div className='container-content-feedback'>
                    <figure>
                        <img src={success} alt="sucesso" />
                    </figure>
                    <p>{text}</p>
                </div>
                <button type='button' className='btn-Feedback' onClick={() => setModal(false)}>Ok</button>
            </div>
        </div>
    )

}

export default Feedback;
