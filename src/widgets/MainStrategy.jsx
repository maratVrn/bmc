import React, {useContext} from 'react';
import MyChart from "../components/MyChart";
import { useNavigate } from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {data3YearsViewBriefcaseData, data3YearsViewOneData, dataAllViewBriefcaseData} from "../bmfunctions";
import MainBriefCaseChart from "../components/MainBriefCaseChart";
import {getBOpt} from "../store/bcChartParam";



const MainStrategy = () => {
    const navigate = useNavigate();
    const {strategyStore,briefcaseStore} = useContext(Context);
    const allClass = 'col-md-4  my-3 text-center'

    return (
<>
    <div className='container ' style={{marginTop:'70px', marginBottom:'70px'}} >
        <h3> Мы разработали инвестиционные торговые сигналы для торговли акцииями и фьючерсами на фондовом рынке РФ. Все стратегии являются результатом математического анализа исторических данных</h3>
        <div className='row' style={{marginTop:'70px'}}>
            <div className= {allClass} >
                <img className='img_K' src='./assets/ico/icons1.png' alt='' />
                <h5> Вы можете просматривать истории сделок, риски и доходность по выбранной стратегии </h5>
            </div>
            <div className={allClass}>
                <img className='img_K' src='./assets/ico/icons2.png' alt='' />
                <h5> Используйте наши видео уроки для освоения навыков трейдинга </h5>
            </div>
            <div className={allClass} >

                <img className='img_K' src='./assets/ico/icons3.png' alt='' />
                <h5>  Создайте свой портфель инвестиций и зарабатывайте используя наши сигналы</h5>
            </div>

        </div>

    </div>

        <div className='bgColorSilver' >
            <div className='container'>
                <div className='row' >
                    <div className='col-md-6  text-center' >

                        <div className='border_r' style={{backgroundColor:'white'}}>
                            {
                                strategyStore.bestStrategyI >-1 ?
                                     <MyChart data = {data3YearsViewOneData(strategyStore.allStrategy[strategyStore.bestStrategyI].strategyData)} name =  {strategyStore.allStrategy[strategyStore.bestStrategyI].name} />
                                : ''
                            }


                            <div style={{display: 'flex', justifyContent:'center'}}>
                                <button className='button2'  onClick={() => navigate('/strategy', { state: { id: strategyStore.bestStrategyI} })}>Подробнее</button> </div>
                        </div>
                    </div>
                    <div className='col-md-6  my-3 text-center' >
                        <h3 className='pt-5' style={{color:'white'}}> Результаты работы торговых стратегий  </h3>
                        <p className='p-5' style={{color:'white'}}>На графике представлены результаты работы стратегии по
                            акциям {strategyStore?.allStrategy[strategyStore.bestStrategyI]?.name} за
                            послдение 3 года.  Вы можете получить более подробную информацию или посмотреть все возможные стратегии .</p>


                        <button onClick={() => navigate('/allStrategy')} className='button1'>Смотреть все стратегии</button>
                    </div>
                </div>

                <div className='row' style={{paddingTop:'70px'}}>
                    <div className='col-md-6  my-3 text-center' >
                        <h3 className='pt-5' style={{color:'white'}}> Портфельные стратегии  </h3>

                        <p className='p-5' style={{color:'white'}}>Использование нескольких торговых инструментов позволяет уменьшить риски
                            т.к. итоговый результат усредняется по показателям отдельных стратегий.
                            При этом возможно рациональное использование торговых плечей для увеличения прибыли.
                            На графике показаны результаты портфельной стратегии “{ briefcaseStore.allSBriefcaseAdmin[briefcaseStore.bestBriefcaseI]?.name}” с торговым плечом 2</p>
                        <button onClick={() => navigate('/allBriefcase')} className='button1'>Все потрфельные стратегии</button>
                    </div>
                    <div className='col-md-6 px-4 text-center' >

                        <div className='border_r' style={{backgroundColor:'white'}}>
                            {
                                briefcaseStore.bestBriefcaseI >-1 ?
                                    <MainBriefCaseChart data = {data3YearsViewBriefcaseData(briefcaseStore.allSBriefcaseAdmin[briefcaseStore.bestBriefcaseI]?.allBriefcaseData)}
                                                        // points = {briefcasePoints}
                                                        name =  { briefcaseStore.allSBriefcaseAdmin[briefcaseStore.bestBriefcaseI]?.name}
                                                        cOpt = {getBOpt( briefcaseStore.allSBriefcaseAdmin[briefcaseStore.bestBriefcaseI]?.name)}
                                    />
                                 : ''
                            }

                            <div style={{display: 'flex', justifyContent:'center'}}>
                                <button className='button2'  onClick={() => navigate('/briefcase', { state: { id: briefcaseStore.bestBriefcaseI} })}>Подробнее</button> </div>
                        </div>
                    </div>
                </div>

            </div>


    </div>
</>

    );
};

export default observer( MainStrategy);
