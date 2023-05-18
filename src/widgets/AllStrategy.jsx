import React, {useContext, useEffect, useState} from 'react';
import OneStrategyChart from "../components/OneStrategyChart";
import { useNavigate } from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {getCOpt} from "../store/chartParam"
import { data3YearsViewOneData} from "../bmfunctions";



const AllStrategy = () => {
    const navigate = useNavigate();
    const {strategyStore} = useContext(Context);


    useEffect(() => {
        window.scrollTo(0, 0)

        if (strategyStore.allStrategy.length)
            if (strategyStore.allStrategy.length) {
                for (let i = 0; i < strategyStore.allStrategy.length; i++) {
                    const strategy = strategyStore.allStrategy[i]

                    if (strategy.name) strategyStore.getStrategyData(strategy.name).then()
                }

            }

    },[]);

    return (

    <div className='container ' style={{marginTop:'130px', marginBottom:'70px'}} >
        <h1>Краткосрочные стратегии</h1>
        <p style={{marginTop:'40px', marginBottom:'40px'}}> Ниже представлены результаты торговых стратегий для акций
            рынка РФ. На каждом графике указана цены и кривая доходности без использования финансовых плеч за последние
            3 года. Больше информации – сделки, риски, данные по стратегии вы можете посмотреть в разделе «Подробнее» </p>

            {
                strategyStore?.allStrategy?.map((strategy,idx) =>
                    <div key = {idx} className='border_r' style={{paddingTop:'30px', marginTop:'30px'}}>
                        <h1>{strategy.name}</h1>
                        {
                            strategy.strategyData?
                            <div>
                                <OneStrategyChart data = {data3YearsViewOneData(strategy.strategyData)} name =  {strategy.name} cOpt = {getCOpt(strategy.name)} />
                                <div style={{display: 'flex', justifyContent:'center'}}>
                                    <button className='button2'  onClick={() => navigate('/strategy', { state: { id: idx} })}>Подробнее</button>
                                </div>
                            </div>

                            : 'no'
                        }
                    </div>)
            }



    </div>

    );
};

export default observer( AllStrategy);
