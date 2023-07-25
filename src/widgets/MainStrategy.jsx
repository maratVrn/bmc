import React, {useContext} from 'react';
import MyChart from "../components/MyChart";
import { useNavigate } from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {
    dataGetObjFromArray
} from "../bmfunctions";




const MainStrategy = () => {
    const navigate = useNavigate();
    const {strategyStore,briefcaseStore} = useContext(Context);
    const allClass = 'col-md-4  my-3 text-center'
    const allClass2 = 'col-md-3 col-sm-6 text-center'

    const imageSrc = (strategyName) => {
        let res = '/assets/str/no_foto.jpg'
        if (strategyName)
            switch (strategyName) {
                case  'Сбербанк' : res = '/assets/str/sber_rf.jpg'; break
                case  'Газпром' : res = '/assets/str/gazp_rf.jpg'; break
                case  'Лукойл' : res = '/assets/str/luk_rf.jpg'; break
                case  'Роснефть' : res = '/assets/str/rosn_rf.jpg'; break
                case  'Аэрофлот' : res = '/assets/str/aflt_rf.jpg'; break
                default: break;

            }
        return res
    }


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
                        <img className='img_str' onClick={() => navigate('/strategy', { state: { id: idx} })} src={imageSrc(strategy.name)} alt='' />
                        <h2 style={{color:'green', marginTop:'-10px'}}>{strategy.currProfit} %</h2>
                        <h5 style={{color:'green'}}>{strategy.dealCount} сделок</h5>
                    </div>)
            }
            </div>


            {/*АКЦИИ США*/}
            <h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '150px'}}>Прибыль стратегий за 2023 год акции США</h3>
            <div className='row' style={{paddingTop:'20px', paddingBottom:'70px'}}>
                <div className= {allClass2} >
                    <img className='img_str' src='/assets/str/sber_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>
                <div className={allClass2}>
                    <img className='img_str' src='/assets/str/gazp_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>
                <div className={allClass2} >
                    <img className='img_str' src='/assets/str/luk_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>
                <div className={allClass2} >
                    <img className='img_str' src='/assets/str/rosn_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>


            </div>

            {/*ПОРТФЕЛИ*/}
            <h3 className='text-center' style={{fontSize: '36px', fontWeight: '900', paddingTop: '100px'}}>Прибыль портфелей за 2023 год</h3>
            <div className='row' style={{paddingTop:'70px', paddingBottom:'70px'}}>
                <div className= {allClass2} >
                    <img className='img_str' src='/assets/str/sber_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>
                <div className={allClass2}>
                    <img className='img_str' src='/assets/str/gazp_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>
                <div className={allClass2} >
                    <img className='img_str' src='/assets/str/luk_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>
                <div className={allClass2} >
                    <img className='img_str' src='/assets/str/rosn_rf.jpg' alt='' />
                    <h2 style={{color:'green', marginTop:'-10px'}}> 23 %</h2>
                    <h5 style={{color:'green'}}>7 сделок</h5>
                </div>


            </div>
            <button className='btn-a_blue mt-5'>Смотреть все стратегии</button>

    </div>
</>

    );
};

export default observer( MainStrategy);
