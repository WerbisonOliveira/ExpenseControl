import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip} from 'recharts'
import './GraphicGeneral.css';


const GraphicGeneral = ({data}) => {

    return (
        <ResponsiveContainer id="graphic-general">
            <PieChart width={400} height={800}>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="green" label={({value}) => `${value.toFixed(2).replace(".", ",")}`} >
                    {
                        data.map ((entry, index) => (
                            <Cell key={`cel-${index}`} fill={entry.name === "Despesa" ? "red" : "green"} className="grafic" />
                        ))
                    }
                </ Pie>
                <Tooltip formatter={(value) => value.toFixed(2).replace(".", ",")}/>
            </PieChart>
        </ResponsiveContainer>
    )
        
    
}

export default GraphicGeneral;