import React, {useContext, useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import StrategyChart from "../components/StrategyChart";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {dataAllViewOneData} from "../bmfunctions";

const Strategy = () => {
    const {state} = useLocation();
    const {strategyStore} = useContext(Context)
    const { id } = state; // Read values passed on state
    const [dataKey, setDataKey] = useState(0)  // Используем для передачи в чарт чтобы обновился график после подгрузки данных
    const [showData, setShowData] = useState({}) // Данные для отображения на графике
    const [curDeal, setCurDeal] = useState({})   // Данные по текущей сделке
    const [showName, setShowName]= useState('')


    useEffect(() => {

        window.scrollTo(0, 0)
        console.log('Открыли '+id);
        setShowName('')
        if (strategyStore.allStrategy.length)
            if ((id > -1) && (id<strategyStore.allStrategy.length)) {
                const strategy = strategyStore.allStrategy[id]
                strategyStore.setSelectedOne(strategy)
                if (strategy.name) strategyStore.getStrategyData(strategy.name).then(()=>{
                    setShowName(strategy.name)
                    const newData =dataAllViewOneData(strategyStore.selectedOne?.strategyData)
                    setShowData(newData)
                    setCurDeal(strategyStore.selectedOne?.points)
                    setDataKey(strategyStore.selectedOne?.id)
                })
        }




    },[]);


    return (
        <div className='container'>
            <div  style={{paddingTop:'100px'}}>
                  <div >
                     <h1> Подробная информация торговой стратегии {showName} </h1>
                     <p style={{marginTop: '20px'}}>На графиках приведены данные изменения цены выбранного инструмента и данные по изменению прибыли за выбранный период времени. Для зарегистрированных пользователей доступны данные по сделкам с отображением на графике цены, а также в виде таблицы сделок.  </p>
                     <p style={{marginTop: '20px'}}>Сделки за последние 10 дней отображается только пользователям с подпиской на обновление данных. Используя графическое отображение результатов Вы можете оценить работу стратегии – количество сделок, частота сделок, уровень прибыли и возможные риски.  </p>
                  </div>



            </div>

            <StrategyChart  key={dataKey}  data = {showData} curDeal = {curDeal} name =  {strategyStore?.selectedOne?.name} />

        </div>
    );
};

export default observer(Strategy);
