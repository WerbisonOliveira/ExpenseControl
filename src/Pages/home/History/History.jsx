import { useContext, useState } from 'react';
import { ContextData } from '../../../context/ContextData';

import ModalDelete from '../../../components/Modal/ModalDelete';
import Feedback from '../../../components/Modal/Feedback'
import Loading from '../../../components/Loading/Loading';

import {IoFilterOutline} from 'react-icons/io5';
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import './History.css';
import FormEdit from '../../../components/FormEdit/FormEdit';




const History = () => {
  const {deleteLaunch} = useContext(ContextData);
  const {data} = useContext(ContextData);
  const dataReverse = [];
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [month, setMonth] = useState("");
  const [deposits, setDeposits] = useState(false);
  const [expenses, setExpenses] = useState(false);


  for(let indice = data.length - 1; indice >= 0; indice--) {
    dataReverse.push(data[indice]);
  }

  if(!dataReverse.length === 0) {
      return <p>Sem histórico.</p>
  }

    
  return (
    <section className='container-history'>
      {modal.modal ? <ModalDelete deleteLaunch={deleteLaunch} id={modal.id} setModal={setModal} setModalDelete={setModalDelete} setLoading={setLoading}/> : modalDelete && <Feedback text="Item apagado com sucesso" setModal={setModalDelete} />}

      {loading && <Loading />}

      {edit.edit && <FormEdit id={edit.id} title={edit.title} valueLaunch={edit.valueLaunch} description={edit.description} type={edit.type} setEdit={setEdit}  setFeedback={setFeedback} setLoading={setLoading} />}

      {feedback && <Feedback text="Item atualizado com sucesso" setModal={setFeedback} />}

      <h2 className='title-history'>Histórico</h2>
      <div className='container-form-history'>
        <form>
          <div className="form-input-history">
            <label htmlFor="search">Pesquisar:</label>
            <input type="text" name="search" id="search" placeholder='Busca por título' value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className='filter'>
              <IoFilterOutline className='icon-filter' onClick={() => setFilter(!filter)}/>
              {
                filter && <div className='container-filter'>
                    <div className='filter-input'>
                    <input type="checkbox" name="deposits" id="deposits" checked={deposits} onChange={(event) => setDeposits(event.target.checked)} />
                    <label htmlFor="deposits">Depósitos</label>
                    </div>
                    <div className='filter-input'>
                      <input type="checkbox" name="expenses" id="expenses" checked={expenses} onChange={(event) => setExpenses(event.target.checked)} />
                      <label htmlFor="expenses">Despesas</label>
                    </div>
                    <div className='filter-input'>
                      <select name="month" className="filter-month" value={month} onChange={(event) => setMonth(event.target.value)}>
                        <option value="">Selecionar mês</option>
                        <option value="01">Janeiro</option>
                        <option value="02">Fevereiro</option>
                        <option value="03">Março</option>
                        <option value="04">Abril</option>
                        <option value="05">Maio</option>
                        <option value="06">Junho</option>
                        <option value="07">Julho</option>
                        <option value="08">Agosto</option>
                        <option value="09">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                      </select>
                    </div>
                </div>
              }
          </div>
        </form>
      </div>  
      <div className='container-items'>
          <div className='history'>
            {dataReverse.length === 0 && (<p className='feedback-history'>Sem histórico</p>)}
            {dataReverse?.filter((data) => data.title.toLowerCase().includes(search.toLowerCase()) ? data : "")
            .filter((data) => deposits ? (data.type === "Depósito" ? data : "") : expenses ? (data.type === "Despesa" ? data : "") : data)
            .filter((data) => data.date.toDate().toLocaleDateString().slice(3, 5) === month ? data : month === "" && data)
            .map((data) => (
              <div key={data.id} className='container-item'>
                <div className='container-general-history'>
            
                  <div className='history-items'>
                    <p className={data.type === "Depósito" ? "deposit-history" : "expense-history"}>{data.type}</p>
                    <h3 className='title-item'>Título: {data.title}</h3>
                    <p className='history-info'><span>Valor:</span> R$ {data.valueLaunch.toFixed(2).replace(".", ",")}</p>
                    <p className='history-info'><span>Data:</span> {data.date.toDate().toLocaleDateString()}</p>
                    <p className='history-info'><span>Descrição:</span> {data.description ? data.description : "Não existe"}</p>
                  
                  </div>
                  <div className='btns'>
                    
                    <button type='button' className='btn-edit'onClick={() => setEdit({edit: true, id: data.id, title: data.title, description: data.description, type: data.type, valueLaunch: data.valueLaunch.toFixed(2).replace(".", ",")})} title='Editar'><MdOutlineModeEdit /></button>
                    
                    <button type='button' className='btn-delete' onClick={() => setModal({...modal, modal: true, id: data.id})} title='Excluir'><MdDelete /></button>

                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  )
}

export default History;