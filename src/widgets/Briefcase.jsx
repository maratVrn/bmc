import React, {useContext, useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import StrategyChart from "../components/StrategyChart";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {dataAllViewBriefcaseData, dataAllViewOneData, dataGetBriefcaseParam, dataGetObjFromArray} from "../bmfunctions";
import BriefCaseChart from "../components/BriefCaseChart";

const Briefcase = () => {
    const {state} = useLocation();
    const {briefcaseStore, strategyStore} = useContext(Context)
    const { id } = state; // Read values passed on state
    const [dataKey, setDataKey] = useState(0)                       // Используем для передачи в чарт чтобы обновился график после подгрузки данных
    const [showData, setShowData] = useState({})                    // Данные для отображения на графике
    const [briefcasePoints, setBriefcasePoints] = useState({})      // Данные по текущей сделке
    const [showName, setShowName]= useState('')
    const [strategyArray, setStrategyArray] = useState([])      // Стратегия в списке в портфелей


    useEffect(() => {
        window.scrollTo(0, 0)
        console.log('Открыли '+id);
        setShowName('')
        if (briefcaseStore.allSBriefcaseAdmin.length)
            if ((id > -1) && (id<briefcaseStore.allSBriefcaseAdmin.length)) {
                const briefcase = briefcaseStore.allSBriefcaseAdmin[id]
                briefcaseStore.setSelectedOne(briefcase)
                if (briefcase.id) briefcaseStore.getBriefcaseData(briefcase.id).then(()=>{


                    const newData =dataAllViewBriefcaseData(briefcaseStore.selectedOne?.allBriefcaseData)
                    // Получаем эндпоинты по портфелю чтобы отобразить текущие сделки
                    const stArray = dataGetBriefcaseParam(briefcaseStore.selectedOne.strategyIn)
                    setStrategyArray(stArray)



                    const newBriefcasePoints = []
                    for (let i = 0; i < stArray.length; i++) {

                        let strategyName = stArray[i].strategy
                        let curStrategyPoints = strategyStore.getPoints(strategyName)
                        if (curStrategyPoints) {
                            const dealData = dataGetObjFromArray(curStrategyPoints)
                            dealData['strategyName'] = strategyName
                            newBriefcasePoints.push(dealData)


                        }

                    }
                    setBriefcasePoints(newBriefcasePoints)

                    setShowData(newData)

                    setDataKey(briefcaseStore.selectedOne?.id)


                })
        }




    },[]);


    return (
        <div className='container'>
            <div  style={{paddingTop:'130px'}}>
                  <div >
                     <h1> Подробная информация портфеля стратегий {showName} </h1>
                     <p style={{marginTop: '40px'}}>На графиках приведены данные изменения цены выбранного инструмента и данные по изменению прибыли за выбранный период времени. Для зарегистрированных пользователей доступны данные по сделкам с отображением на графике цены, а также в виде таблицы сделок.  </p>
                     <p style={{marginTop: '40px'}}>Сделки за последние 10 дней отображается только пользователям с подпиской на обновление данных. Используя графическое отображение результатов Вы можете оценить работу стратегии – количество сделок, частота сделок, уровень прибыли и возможные риски.  </p>
                  </div>



            </div>
            <BriefCaseChart key={dataKey} data = {showData} points = {briefcasePoints} name =  {briefcaseStore?.selectedOne?.name} stArray = {strategyArray} />


        </div>
    );
};

export default observer(Briefcase);
