import { useContext, useState } from 'react';
import { ContextData } from '../../../context/ContextData';
import { usePost } from '../../../hooks/usePost';

import GraphicGeneral from '../../../components/Graphics/GraphicGeneral';

import './General.css';
import { FaMoneyBillWave } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { PiGraph } from "react-icons/pi";
import GraphicMonth from '../../../components/Graphics/GraphicMonth';



const General = () => {
  const [month, setMonth] = useState();
  const {data} = useContext(ContextData);
  let expenses = [];
  let deposits = [];
  const getDataMonth = [];
  let despesas = 0;
  let dinheiro = 0;
  let titleDeposit = "";
  let dateDeposit =  "";
  let valueDeposit = 0;
  let titleExpense = "";
  let dateExpense =  "";
  let valueExpense = 0;


  data?.map((value) => {
    getDataMonth.push(value);
    if(value.type === "Depósito") {
      dinheiro += value.valueLaunch;
      deposits.push(value)
    } else {
      despesas += value.valueLaunch;
      expenses.push(value);
    }
  });

  expenses?.map((expense) => {
    if(expense === expenses[expenses.length - 1]) {
      titleExpense = expense.title;
      valueExpense = expense.valueLaunch;
      dateExpense = expense.date.toDate().toLocaleDateString();
    }
  });

  deposits?.map((deposit) => {
    if(deposit === deposits[deposits.length - 1]) {
      titleDeposit = deposit.title;
      valueDeposit = deposit.valueLaunch;
      dateDeposit = deposit.date.toDate().toLocaleDateString();
    }
  });

  const getData = [
    {name: "Dinheiro", value: dinheiro},
    {name: "Despesa", value: despesas}
  ];


  return (
    <section id='general'>
      <h2>Informações Gerais</h2>
      <div className='general-info'>
        <article className='info'>
          <div className='desc-money'>
            <FaMoneyBillWave className='icon-money'/>
            <p>Dinheiro</p>
          </div>
          <div className='value-money'>
            <p><span>R$</span> {dinheiro.toFixed(2).replace(".", ",")}</p>
          </div>
          <div className='last-deposit'>
            <p className='last-add-deposit'>Último depósito adicionado</p>
            <div className='deposit'>
              <p><span>Título:</span> {titleDeposit ? titleDeposit : "Não existe"}</p>
              <p><span>R$</span> {valueDeposit.toFixed(2).replace(".", ",")}</p>
              <p><span>Data:</span> {dateDeposit ? dateDeposit : "Não existe"}</p>
            </div>
          </div>
        </article>
        <article className='info'>
          <div className='desc-expense'>
            <GiExpense className='icon-expense'/>
            <p>Despesas</p>
          </div>
          <div className='value-expense'>
            <p><span>R$</span> {despesas.toFixed(2).replace(".", ",")}</p>
          </div>
          <div className='last-expense'>
            <p className='last-add-expense'>Última despesa adicionada</p>
            <div className='expense'>
              <p><span>Título:</span> {titleExpense ? titleExpense : "Não existe"}</p>
              <p><span>R$</span> {valueExpense.toFixed(2).replace(".", ",")}</p>
              <p><span>Data:</span> {dateExpense ? dateExpense : "Não existe"}</p>       
            </div>
          </div>
        </article>
        <article className='info-graphic'>
          <div className='desc-graphic'>
            <PiGraph className='icon-graphic'/>
            <p>Gráfico Geral</p>
          </div>
          <div className='feedback'>
            {dinheiro === 0 && despesas === 0 ? (<p>Não existem depósitos e despesas adicionados.</p>) : <GraphicGeneral data={getData} />}
          </div>
        </article>
      </div>
      <div className='title'>
        <h3>Gráfico do mês</h3>
      </div>
      <div className='container-month'>
          <select name="month" className="month" value={month} onChange={(event) => setMonth(event.target.value)}>
            <option value="">Selecione o mês</option>
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
      <div className='info-graphicMonth'>
        <article className='container-graphicMonth'>
          <div className='feedback'>
            {dinheiro === 0 && despesas === 0 ? (<p>Não existem depósitos e despesas adicionados.</p>) : <GraphicMonth data={data} month={month} />}
          </div>
        </article>
      </div>
    </section>
  )
}

export default General;