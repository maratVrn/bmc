import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts'
import 'react-tabs/style/react-tabs.css';
import {dataGetViewOneBriefcaseDataLevel} from "../bmfunctions";




const MainBriefCaseChart =  (props) =>{
    const [buttonKey, setButtonKey] = useState(0);                     // какая конопка нажата за тот период отображаем данные
    const [showData, setShowData]= useState([])
    const [showProfit, setShowProfit]= useState('0')
    const [showYear, setShowYear]= useState('0000')



    useEffect(() =>{
        if (props.data[2]) SetChartData(2)

    },[props])

    const SetChartData = (id) => {

        if (props.data[id]) {

            const newProfitData = dataGetViewOneBriefcaseDataLevel(props.data[id].profitData[0],2, false)

            const maxPrice = Math.max(...newProfitData[0].data.map(o => o[1]));
            const minPrice = Math.min(...newProfitData[0].data.map(o => o[1]));
            const Y_ax_prise = {
                title: {
                    text: "Прибыль портфеля, %"
                },
                min: minPrice,
                max: maxPrice

            }
            // TODO: Вот тут косяк с отображение на iphone что это я хз
            if (newProfitData[0].data.at(-1)) setShowProfit(newProfitData[0].data.at(-1)[1].toString())



            if (props.data[id].year) setShowYear(props.data[id].year)

            setShowData(newProfitData)

            if (props.cOpt){
                props.cOpt.yaxis = Y_ax_prise;
                ApexCharts.exec(props.cOpt?.chart.id, 'updateOptions',props.cOpt);
            }


             setButtonKey(id)
        }
    }

    return (

        <div>
             {/*Рисуем график с данными в соответсвии с нажатой кнопкой*/}

            <p style={{textAlign:'center', color:'black'}}>Прибыль портфеля {props?.name} за {showYear} г. составляет {showProfit} %  </p>
            <div className='mainChartData'>
                    <div  >

                        {
                            props?.data.length?
                                props?.data?.map((value, id) =>
                                    <button key={id} className= {buttonKey === id? "button3_down" : "button3"}
                                            onClick={() =>{ SetChartData(id)}}>{value.year}</button>)
                                : ''

                        }
                    </div>
            </div>

            {props.cOpt?
                <ReactApexChart height={350} options={props.cOpt}  series={ showData } type="line" />
                : ''}


        </div>
    );
};

export default MainBriefCaseChart;
