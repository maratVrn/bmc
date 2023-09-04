import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {imageSrc} from "../bmfunctions";




const MainStrategy = () => {
    const navigate = useNavigate();
    const {strategyStore,briefcaseStore} = useContext(Context);
    const allClass = 'col-md-4  my-3 text-center'
    const allClass2 = 'col-md-3 col-sm-6 text-center'




    return (
    <>
        <div className='container text-center' style={{paddingTop:'50px', marginBottom:'70px'}} >
        <h3> Мы разработали сигналы для торговли акцииями на фондовом рынке России и США. Все стратегии являются результатом алгоритмического анализа исторических данных</h3>
        <div className='row' style={{marginTop:'70px'}}>
            <div className= {allClass} >
                <img className='img_K' src='/assets/1.jpg' alt='' />
                <h5> Вы можете просматривать истории сделок, риски и доходность по выбранной стратегии </h5>
            </div>
            <div className={allClass}>
                <img className='img_K' src='/assets/2.jpg' alt='' />
                <h5> Используйте наши видео уроки для освоения навыков трейдинга </h5>
            </div>
            <div className={allClass} >

                <img className='img_K' src='/assets/3.jpg' alt='' />
                <h5>  Создайте свой портфель инвестиций и зарабатывайте используя наши сигналы</h5>
            </div>

        </div>
            <h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '50px'}}>Прибыль стратегий за 2023 год акции РФ</h3>
            {/*АКЦИИ РФ*/}
            <div className='row' style={{paddingTop:'10px'}}>
            {
                strategyStore?.bestStrategyRF?.map((strategy,idx) =>
                    <div key = {idx} className={allClass2} style={{paddingTop:'30px', marginTop:'30px'}}>
                        <img className='img_str' onClick={() => navigate('/strategy', { state: {id: strategy.id} })} src={imageSrc(strategy.name)} alt='' />
                        <h2 style={{color:'green', marginTop:'-10px'}}>{strategy.currProfit} %</h2>
                        <h5 style={{color:'green'}}>{strategy.dealCount} сделок</h5>
                    </div>)
            }
            </div>


            {/*АКЦИИ США*/}
            {/*<h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '150px'}}>Прибыль стратегий за 2023 год акции США</h3>*/}
            {/*<div className='row' style={{paddingTop:'10px'}}>*/}
            {/*    {*/}
            {/*        strategyStore?.bestStrategyUSA?.map((strategy,idx) =>*/}
            {/*            <div key = {idx} className={allClass2} style={{paddingTop:'30px', marginTop:'30px'}}>*/}
            {/*                <img className='img_str' onClick={() => navigate('/strategy', { state: { id: strategy.id} })} src={imageSrc(strategy.name)} alt='' />*/}
            {/*                <h2 style={{color:'green', marginTop:'-10px'}}>{strategy.currProfit} %</h2>*/}
            {/*                <h5 style={{color:'green'}}>{strategy.dealCount} сделок</h5>*/}
            {/*            </div>)*/}
            {/*    }*/}
            {/*</div>*/}


            {/*ПОРТФЕЛИ*/}
            <h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '100px'}}>Прибыль портфелей за 2023 год</h3>
            <div className='row' style={{paddingTop:'10px'}}>
                {
                    briefcaseStore?.allSBriefcaseAdmin?.map((briefCase,idx) =>
                        <div key = {idx} className={allClass2} style={{paddingTop:'30px', marginTop:'30px'}}>
                            <img className='img_str' onClick={() => navigate('/briefcase', { state: { id: briefCase.id} })} src={imageSrc(briefCase.name)} alt='' />
                            <h2 style={{color:'green', marginTop:'-10px'}}>{briefCase.currProfit} %</h2>
                            <h5 style={{color:'green'}}>{briefCase.dealCount} сделок</h5>

                        </div>)
                }
            </div>
            <button onClick={() => navigate('/allStrategy')}  className='btn-a_blue mt-5'>Смотреть все стратегии и портфели</button>

    </div>
</>

    );
};

export default observer( MainStrategy);
