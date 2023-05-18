import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";

import ApexCharts from 'apexcharts'
import ChartParam from "../store/chartParam"
import {observer} from "mobx-react-lite";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import StrategyInfo from "./StrategyInfo";
import StrategyDeals from "./StrategyDeals";
import StrategyCurrDeal from "./StrategyCurrDeal";
import {dataGetDeals, rounded2} from "../bmfunctions";





const StrategyChart =  observer((props) =>{
    const [buttonKey, setButtonKey] = useState(0);                      // какая конопка нажата за тот период отображаем данные
    const [showPriseChecked, setShowPriseChecked] = useState(true);     // отображать ли цену
    const [showProfitChecked, setShowProfitChecked] = useState(true);   // отображать прибыль
    const [showPointsChecked, setShowPointsChecked] = useState(true);   // отображать сделки
    const [showData, setShowData]= useState([])                         // Данные для отображения на графике
    const [dealStory, setDealStory]= useState([])                       // История сделок на отображение
    const [strategyInfoOpt, setStrategyInfo] = useState(0);             // Информация о стратегии
    const [strategyCurDeal, setStrategyDeal] = useState('');            // Информация о текущей сделке


    useEffect(() =>{ SetChartData(buttonKey)
    },[showPriseChecked,showProfitChecked, showPointsChecked])

    const SetChartData = (id) => {

        if (props.data[id]) {

            setStrategyDeal(props?.curDeal)


            setStrategyInfo(props.data[id].strategyInfo)

            // TODO: Сделать проверку на существование данных !!
            const newShoData = []
            let newDealStory = []
            const Y_ax = []
            ChartParam.setColors(false)

            // Если отображаем цены
            if (showPriseChecked) {
                ChartParam.setColors(true)
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
            }

            // Если отображаем данные по прибыли
            if (showProfitChecked) {
                newShoData.push(props.data[id].dealData[1])
                const maxPercent = Math.max(...props.data[id].dealData[1].data.map(o => o[1]));
                const minPercentStart = Math.min(...props.data[id].dealData[1].data.map(o => o[1]))
                // const minPercent = minPercentStart > 0 ? 100 : minPercentStart ;
                const Y_ax_profit = {
                    opposite: true,
                    title: {
                        text: "Прибыль, %"
                    },
                    min: minPercentStart,
                    max: maxPercent
                }

                Y_ax.push(Y_ax_profit)
            }
            // Устанавливаем параметры Оси Y - минимальные и максимальные значения
            ChartParam.setYAxisParam(Y_ax)

            // Отображение сделок на графике
            ChartParam.setPoints([])
            if (showPointsChecked) { ChartParam.setPoints(props.data[id].dealPoints)    }


            // Составляем данные по истории сделок
            newDealStory = dataGetDeals(props.data[id])
            setDealStory(newDealStory)

            // По итогу записываем данные для отображения в стейт
            setShowData(newShoData)

            // Перезапускаем перерисовку графика с новыми опциями
            ApexCharts.exec('area-datetime', 'updateOptions', ChartParam.main_options);
            // Запоминаем ID нажатой кнопки
            setButtonKey(id)
        }
    }

    const handleChangeShowPrise = () => { setShowPriseChecked(!showPriseChecked)};
    const handleChangeShowProfit = () => { setShowProfitChecked(!showProfitChecked)};
    const handleChangeShowPoints = () => { setShowPointsChecked(!showPointsChecked)};



    return (

        <div>
            <div className='container'>
                <div className='row' style={{marginTop:'70px', marginBottom:'50px'}}>
                    <div className='col-md-4 px-4 text-center' >
                        <label>
                            <input type="checkbox" checked={showPointsChecked}  onChange={handleChangeShowPoints}  />
                            Отображать сделки
                        </label>

                    </div>
                    <div className='col-md-4 px-4 text-center'>
                        <label>
                            <input type="checkbox"  checked={showPriseChecked}  onChange={handleChangeShowPrise} />
                            График изменения цены
                        </label>
                    </div>
                    <div className='col-md-4 px-4 text-center'>
                        <label>
                            <input type="checkbox" checked={showProfitChecked} onChange={handleChangeShowProfit}  />
                            График изменения прибыли
                        </label>

                    </div>
                </div>
           </div>

            {/* Рисуем график с данными в соответсвии с нажатой кнопкой*/}
            <div className='' >

                <div className='container border_r' style={{backgroundColor:'white', paddingTop:'30px', marginBottom:'0px'}}>
                    <h1  style={{paddingBottom:'30px'}}>{props?.name}</h1>

                    <div  style={{marginTop:'0px', marginBottom:'30px', justifyContent:'left'}}>

                        {
                            props?.data.length?
                                props?.data?.map((value, id) =>
                                    <button key={id} className= {buttonKey === id? "button3_down" : "button3"}
                                            onClick={() =>{ SetChartData(id)}}>{value.year}</button>)
                                : ''

                        }


                    </div>
                    <ReactApexChart id={'ss'} height={400} options={ChartParam.main_options}  series={ showData } type="line" />

                </div>
            </div>
            <div className='my_border' style={{margin:'30px', paddingTop:'30px'}}>


                <Tabs>
                    <TabList>
                        <Tab>Общая инфомация</Tab>
                        <Tab>История сделкок</Tab>
                        <Tab>Активная сделка</Tab>
                    </TabList>

                    <TabPanel>
                        <StrategyInfo opt = {strategyInfoOpt}/>
                    </TabPanel>
                    <TabPanel>
                       <StrategyDeals data = {dealStory}/>

                    </TabPanel>
                    <TabPanel>
                        <StrategyCurrDeal data = {strategyCurDeal} />

                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
});

export default StrategyChart;
