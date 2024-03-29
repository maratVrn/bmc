import React, {useState,useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import ChartParam from "../store/chartParam";
import ApexCharts from "apexcharts";
// Нстройки для просто го графика доходности на главной странице
const MyChart = (props) => {

    const [buttonKey, setButtonKey] = useState(-1);
    const [showData, setShowData]= useState([])
    const [showName, setShowName]= useState('')
    const [showProfit, setShowProfit]= useState(-1)
    const [showYear, setShowYear]= useState('0000')
    const [chartParam, setChartParam]= useState(ChartParam.main_options)

    useEffect(() =>{
        if (props.data[2]) SetChartData(2)
    },[props])


    const SetChartData = (id) => {



        if (props.data)
            if (props.data[id]) {

                if (props.name) setShowName(props.name)
                const newShoData = []
                const Y_ax = []
                newShoData.push(props.data[id].dealData[0])
                const maxPrice = Math.max(...props.data[id].dealData[0].data.map(o => o[1]));
                const minPrice = Math.min(...props.data[id].dealData[0].data.map(o => o[1]));
                const Y_ax_prise = {
                    title: {
                        text: "Цена акции, руб"
                    },
                    min: minPrice,
                    max: maxPrice

                }
                Y_ax.push(Y_ax_prise)

                // const endProfit = props.data[id].dealData[1].data.at(-1)
                // TODO: Вот тут косяк с отображение на iphone что это я хз
                if (props.data[id].dealData[1].data.at(-1)) setShowProfit(parseFloat(props.data[id].dealData[1].data.at(-1)[1]))


                if (props.data[id].year) setShowYear(props.data[id].year)

                newShoData.push(props.data[id].dealData[1])
                const maxPercent = Math.max(...props.data[id].dealData[1].data.map(o => o[1]));
                const minPercentStart = Math.min(...props.data[id].dealData[1].data.map(o => o[1]))


                const minPercent = minPercentStart > 0 ? 0 : minPercentStart;
                const Y_ax_profit = {
                    opposite: true,
                    title: {
                        text: "Прибыль, %"
                    },
                    min: minPercent,
                    max: maxPercent
                }
                Y_ax.push(Y_ax_profit)


                ChartParam.setPoints([])

                setShowData(newShoData)

                ChartParam.setYAxisParam(Y_ax)

                ApexCharts.exec('area-datetime', 'updateOptions', ChartParam.main_options);

                setButtonKey(id)
            }
    }




    return (
        <div >

            <p style={{textAlign:'center', color:'black'}}>Прибыль стратегии '{showName}' за {showYear} г.  {showProfit} % </p>
            <div className='mainChartData'>
                <div>
                {
                    props.data?
                    props.data.map((value, id) =>
                    <button key={id} className= {buttonKey === id? "button3_down" : "button3"}
                    onClick={() =>{SetChartData(id)}}>{value.year}</button>)
                        :''

                }
                </div>

            </div>

            {/* Рисуем график с данными в соответсвии с нажатой кнопкой*/}
            <ReactApexChart height={300} options={ChartParam.main_options}  series={ showData } type="line" />
            {/*<ReactApexChart height={300} options={chartParam}   series={ showData } type="line" />*/}

        </div>
    );
};

export default MyChart;
