import React, {useContext, useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {dataAllViewBriefcaseData, dataGetBriefcaseParam, dataGetObjFromArray} from "../bmfunctions";
import BriefCaseChart from "../components/BriefCaseChart";

const Briefcase = () => {
    const {state} = useLocation();
    const {briefcaseStore, strategyStore} = useContext(Context)
    const { id } = state; // Read values passed on state
    const [dataKey, setDataKey] = useState(0)                       // Используем для передачи в чарт чтобы обновился график после подгрузки данных
    const [showData, setShowData] = useState({})                    // Данные для отображения на графике
    const [briefcasePoints, setBriefcasePoints] = useState({})      // Данные по текущей сделке
    const [showName, setShowName]= useState('')
    const [brName, setBrName]= useState('')
    const [strategyArray, setStrategyArray] = useState([])      // Стратегия в списке в портфелей


    useEffect(() => {
        window.scrollTo(0, 0)
        console.log('Открыли '+id);
        setShowName('')
        if (briefcaseStore.allSBriefcaseAdmin.length) {
                const briefcase = briefcaseStore.getBriefcaseByID(id)
                briefcaseStore.setSelectedOne(briefcase)
                if (briefcase.id) briefcaseStore.getBriefcaseData(briefcase.id).then(()=>{


                    const newData =dataAllViewBriefcaseData(briefcaseStore.selectedOne?.allBriefcaseData)
                    // Получаем эндпоинты по портфелю чтобы отобразить текущие сделки
                    const stArray = dataGetBriefcaseParam(briefcaseStore.selectedOne.strategyIn)
                    setStrategyArray(stArray)

                    let stName = 'Состав портфеля: '
                    stArray.map((oneData,idx) =>{
                        if (stName !== 'Состав портфеля: ') stName+=' + '
                        stName+=oneData.strategy})
                    setBrName(stName)



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
                     <h4 style={{marginTop: '40px'}}>На графике приведены результаты работы выбранного портфеля – в виде изменения общей прибыли по портфелю.  Для зарегистрированных пользователей доступны данные по активным сделкам  </h4>
                     <h4 style={{marginTop: '40px'}}>Важно, что при использовании нескольких инструментов уменьшаются общие риски. А также повышается вероятность стабильного дохода. Если вы хотите оценить возможности маржинальной торговли и соответствующие риски вам доступны расчеты с использованием торгового плеча  </h4>
                  </div>



            </div>
            <BriefCaseChart key={dataKey} data = {showData} points = {briefcasePoints} name =  {brName} stArray = {strategyArray} />
            <div className='text-center'>
                <button  className='btn-a_blue mt-5' >Получать сигналы на телефон</button>
            </div>

        </div>
    );
};

export default observer(Briefcase);
