import React, {useEffect, useState} from 'react';
import ReactApexChart from "react-apexcharts";

import ApexCharts from 'apexcharts'
import BcChartParam from "../store/bcChartParam"
import {observer} from "mobx-react-lite";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BriefcaseInfo from "./BriefcaseInfo"
import BriefcaseCurrDeal from "./BriefcaseCurrDeal"
import Table from "react-bootstrap/Table";
import {dataGetViewOneBriefcaseDataLevel, rounded2} from "../bmfunctions";
import {Form} from "react-bootstrap";




const BriefCaseChart =  observer((props) =>{
    const [buttonKey, setButtonKey] = useState(0);                        // какая конопка нажата за тот период отображаем данные
    const [showData, setShowData]= useState([])                           // Отображаемые данные
    const [capitalizationCalc, setCapitalizationCalc] = useState(false);  // Расчет с учетом капиализации
    const [levelCalc, setLevelCalc] = useState(true);                    // Расчет с учетом торгового плеча
    const [level, setLevel] = useState(2);                                // Торговое плечо
    const [briefcaseInfoOpt, setBriefcaseInfo] = useState(0);             // Информация о портфеле
    const [briefcasePoints, setBriefcasePoints] = useState({})            // Данные для отображения на графике
    const [strategyArray, setStrategyArray] = useState([])                // Стратегия в списке в портфелей


    useEffect(() =>{ SetChartData(buttonKey)

        // Расчет массива последних сделок
    },[levelCalc, level, capitalizationCalc])

    const SetChartData = (id) => {

        setBriefcasePoints(props?.points)


        if (props.data[id]) {



            if (props?.stArray) setStrategyArray(props?.stArray)

            let calcLevel = 1;
            levelCalc ? calcLevel = level : calcLevel = 1

            const newShowData = dataGetViewOneBriefcaseDataLevel(props.data[id].profitData[0],calcLevel,capitalizationCalc)

            let profit = 0
            // TODO: переделать по факт данным
                if (newShowData[0].data.at(-1)){
                    const crProfit = newShowData[0].data.at(-1)
                    profit = crProfit[1]
                }
            const briefcaseInfo = {
                dealCount : props.data[id].briefcaseInfo.dealCount,
                maxMinus : rounded2(calcLevel*parseFloat(props.data[id].briefcaseInfo.maxMinus))+' %',
                profit : rounded2(profit)+' %',
            }

            setBriefcaseInfo(briefcaseInfo)

            const maxPrice = Math.max(...newShowData[0].data.map(o => o[1]));
            const minPrice = Math.min(...newShowData[0].data.map(o => o[1]));
            const Y_ax_prise = {
                title: {
                    text: "Прибыль портфеля, %"
                },
                min: minPrice,
                max: maxPrice

            }

            setShowData(newShowData)


            BcChartParam.setYAxisParam(Y_ax_prise)

            ApexCharts.exec('briefCase-datetime', 'updateOptions', BcChartParam.main_options);
            setButtonKey(id)
        }
    }


    const handleChangeCapital = () => { setCapitalizationCalc(!capitalizationCalc)};
    const handleChangeLevel = () => { setLevelCalc(!levelCalc)};
    // Сделать расчет относительно плеча и капитализации
    return (

        <div>
            <div className='container'>
                <div className='row' style={{marginTop:'50px', marginBottom:'20px'}}>
                    <div className='col-md-6 px-4 text-center flex align-items-center' >
                        <label>
                            <input type="checkbox" checked={levelCalc}  onChange={handleChangeLevel}  />
                            Использовать в расчете торговое плечо
                        </label>
                      <Form.Control  type="number" className="m-2" style={{width : '70px'}}

                                        value = {level} onChange={e=>setLevel(e.target.value)}
                                        />
                    </div>
                    <div className='col-md-6 px-4 text-center flex align-items-center' >
                        <label>
                            <input type="checkbox" checked={capitalizationCalc}  onChange={handleChangeCapital}  />
                            Расчет с учетом капитализации каждые 10 %
                        </label>
                    </div>
                </div>
           </div>

            {/* Рисуем график с данными в соответсвии с нажатой кнопкой*/}
            <div style={{paddingTop:'00px'}} >

                <div className='container border_r' style={{backgroundColor:'white', paddingTop:'40px', marginBottom:'0px'}}>
                    <h2  style={{paddingBottom:'20px'}}>{props?.name}</h2>

                    <div  style={{marginTop:'0px', marginBottom:'20px', justifyContent:'left'}}>

                        {
                            props?.data.length?
                                props?.data?.map((value, id) =>
                                    <button key={id} className= {buttonKey === id? "button3_down" : "button3"}
                                            onClick={() =>{ SetChartData(id)}}>{value.year}</button>)
                                : ''

                        }


                    </div>
                    <ReactApexChart id={'ss'} height={320} options={BcChartParam.main_options}  series={ showData } type="line" />

                </div>
            </div>
            <div className='my_border' style={{margin:'30px', paddingTop:'30px'}}>


                <Tabs>
                    <TabList>
                        <Tab>Общая инфомация</Tab>
                        <Tab>Список стратегий</Tab>

                        <Tab>Активные сделки</Tab>
                    </TabList>

                    <TabPanel>
                        <BriefcaseInfo  opt = {briefcaseInfoOpt}/>

                    </TabPanel>


                    <TabPanel>
                        <Table className="table border  table-hover h-25  m-2"  style={{lineHeight: 1, fontSize: 14}}>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Стратегия</th>
                                <th>% капитала</th>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                strategyArray.map((oneData,idx) =>
                                    <tr
                                        key={idx}  className="col-lg"
                                        // style={{backgroundColor: idx === selectedNum ? 'LightGray' : 'white', cursor: 'pointer'}}
                                        // onClick={() => {setSelectedNum(idx)}}
                                    >
                                        <td>{idx+1}</td>
                                        <td>{oneData.strategy}</td>
                                        <td>{oneData.capital} %</td>
                                    </tr>)
                            }
                            </tbody>
                        </Table>
                    </TabPanel>
                    <TabPanel>
                        <BriefcaseCurrDeal  data = {briefcasePoints} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
});

export default BriefCaseChart;
