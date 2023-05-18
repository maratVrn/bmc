import React, {useContext, useEffect, useState} from 'react';
import OneStrategyChart from "../components/OneStrategyChart";
import { useNavigate } from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {getCOpt} from "../store/chartParam"
import {data3YearsViewBriefcaseData, data3YearsViewOneData} from "../bmfunctions";
import MainBriefCaseChart from "../components/MainBriefCaseChart";
import {getBOpt} from "../store/bcChartParam";



const AllBriefcase = () => {
    const navigate = useNavigate();
    const {strategyStore, briefcaseStore} = useContext(Context);



    useEffect(() => {
        window.scrollTo(0, 0)

        if (briefcaseStore.allSBriefcaseAdmin?.length) {
                for (let i = 0; i < briefcaseStore.allSBriefcaseAdmin.length; i++) {
                    if (briefcaseStore.allSBriefcaseAdmin[i].id) briefcaseStore.getBriefcaseData(briefcaseStore.allSBriefcaseAdmin[i].id)
               }
            }
    },[]);

    return (

    <div className='container ' style={{marginTop:'130px', marginBottom:'70px'}} >
        <h1>Портфельные стратегии</h1>
        <p style={{marginTop:'40px', marginBottom:'40px'}}> Ниже представлены результаты портфельных стратегий для акций
            рынка РФ. На каждом графике указана цены и кривая доходности с финансовым плечем 2 за последние
            3 года. Больше информации – сделки, риски, данные по стратегии вы можете посмотреть в разделе «Подробнее» </p>

        {
            briefcaseStore?.allSBriefcaseAdmin?.map((briefcase,idx) =>
                <div key = {idx} className='border_r' style={{paddingTop:'30px', marginTop:'30px'}}>
                    <h1>{briefcase.name}</h1>
                    {
                        briefcase.allBriefcaseData?
                            <div>

                                <MainBriefCaseChart data = {data3YearsViewBriefcaseData(briefcase.allBriefcaseData)}
                                                    name =  { briefcase.name}
                                                    cOpt = {getBOpt(briefcase.name)}

                                />

                                <div style={{display: 'flex', justifyContent:'center'}}>
                                    <button className='button2'  onClick={() => navigate('/briefcase', { state: { id: idx} })}>Подробнее</button>
                                </div>
                            </div>

                            : 'no'
                    }


                </div>
            )
        }


    </div>

    );
};

export default observer( AllBriefcase);
