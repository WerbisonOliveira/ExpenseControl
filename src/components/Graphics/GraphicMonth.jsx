import {ResponsiveContainer, BarChart, Bar, CartesianGrid, Tooltip, Legend, XAxis, YAxis} from 'recharts';

const GraphicMonth = ({data, month}) => {
    let getData = [];
    let dataMonth = [];
    let totalDeposits = 0;
    let totalExpenses = 0;

    const monthDate = new Date().getMonth() + 1;

    data?.map((data) => {
        if(month) {
            if(data.date.toDate().toLocaleDateString().slice(3, 5) == month){
                dataMonth.push(data.date.toDate().toLocaleDateString()) 
            }
        } else {
            if(data.date.toDate().toLocaleDateString().slice(3, 5) == monthDate)
                dataMonth.push(data.date.toDate().toLocaleDateString())
        }
    })

    dataMonth.sort((a, b) => a.slice(0, 2) < b.slice(0, 2) ? -1 : 1 )
    dataMonth.sort((a, b) => a.slice(3, 5) < b.slice(3, 5) ? -1 : 1 )
    dataMonth.sort((a, b) => a.slice(6, 10) < b.slice(6, 10) ? -1 : 1 )

    const SetData = new Set(dataMonth.map((data) => data));


    SetData.forEach((date) => {
        totalDeposits = 0
        totalExpenses = 0
        
        data.map((data) => {
            date === data.date.toDate().toLocaleDateString() && data.type === "Depósito" ? totalDeposits += data.valueLaunch : totalDeposits;
            date === data.date.toDate().toLocaleDateString() && data.type === "Despesa" ? totalExpenses += data.valueLaunch : totalExpenses;
            }
        )

        getData.push({
            date: date.slice(0, 5),
            depositos: totalDeposits.toFixed(2),
            despesas: totalExpenses.toFixed(2)
        })

    })

    
    if(dataMonth.length === 0) {
        return (<p>Sem lançamentos no mês.</p>)
    }
 
    return (
        <ResponsiveContainer width={1100}>
            <BarChart data={getData} margin={{top: 10, right: 0, left: 0, bottom: 0}} barGap={5} barSize={40} barCategoryGap='0%'>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="depositos" fill='#1e9e1e' />
                <Bar dataKey="despesas" fill='#9e1e1e' />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default GraphicMonth;