import React, {useContext, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { imageSrc} from "../bmfunctions";



const AllStrategy = () => {
    const navigate = useNavigate();
    const {strategyStore, briefcaseStore} = useContext(Context);
    const allClass2 = 'col-md-3 col-sm-6 text-center'


    useEffect(() => {
        window.scrollTo(0, 0)
    },[]);

    return (

    <div className='container ' style={{marginTop:'130px', marginBottom:'70px'}} >
        <h1>Краткосрочные стратегии</h1>
        <p style={{marginTop:'40px', marginBottom:'40px'}}> Ниже представлены результаты торговых стратегий для акций
            рынка РФ и США а также торговых портфелей. Вы можете просмотреть детальную информацию  – сделки, риски, активные сделки - для этого нажмите по выбранной стратегии или портфелю</p>

        <h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '50px'}}>Список всех стратегий и результаты за 2023 г. акции РФ</h3>
        {/*АКЦИИ РФ*/}
        <div className='row' style={{paddingTop:'10px'}}>
            {
                strategyStore?.allStrategyRF?.map((strategy,idx) =>
                    <div key = {idx} className={allClass2} style={{paddingTop:'30px', marginTop:'30px'}}>
                        <img className='img_str' onClick={() => navigate('/strategy', { state: {id: strategy.id} })} src={imageSrc(strategy.name)} alt='' />
                        <h2 style={{color:'green', marginTop:'-10px'}}>{strategy.currProfit} %</h2>
                        <h5 style={{color:'green'}}>{strategy.dealCount} сделок</h5>
                    </div>)
            }
        </div>


        {/*АКЦИИ США*/}
        {/*<h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '150px'}}>Список всех стратегий и результаты за 2023 г. акции США</h3>*/}
        {/*<div className='row' style={{paddingTop:'10px'}}>*/}
        {/*    {*/}
        {/*        strategyStore?.allStrategyUSA?.map((strategy,idx) =>*/}
        {/*            <div key = {idx} className={allClass2} style={{paddingTop:'30px', marginTop:'30px'}}>*/}
        {/*                <img className='img_str' onClick={() => navigate('/strategy', { state: { id: strategy.id} })} src={imageSrc(strategy.name)} alt='' />*/}
        {/*                <h2 style={{color:'green', marginTop:'-10px'}}>{strategy.currProfit} %</h2>*/}
        {/*                <h5 style={{color:'green'}}>{strategy.dealCount} сделок</h5>*/}
        {/*            </div>)*/}
        {/*    }*/}
        {/*</div>*/}


        {/*ПОРТФЕЛИ*/}
        <h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '100px'}}>Список всех портфелей и результаты за 2023 г. </h3>
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



    </div>

    );
};

export default observer( AllStrategy);
