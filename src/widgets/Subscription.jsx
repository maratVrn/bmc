import React from 'react';
import IcoOne from "./img/icons8-trading-64.png";
import IcoTwo from "./img/icon_trading_2.png";
import IcoTree from "./img/icon_trading_3.png";
import ImageMan from "./img/man.webp";
import {useNavigate} from "react-router-dom";


const Subscription = () => {

    const navigate = useNavigate();


    return (
        <div className='border educationInfo' style={{marginTop: '70px'}}>

            <div className='row'>
                <div className='col-md-8'>
                    {/*1    */}
                    <div onClick={() => navigate('/allStrategy')} style={{marginLeft:'40px', marginTop:'-20px'}} className='eduBlock'>
                        <div  style={{paddingLeft:'50px', paddingTop:'30px'}} className='flex'>
                            <img src={IcoOne} style={{width:'48px', marginLeft:'-30px'}} alt=""/>
                            <h3>Основы инвестирования в акции. О проекте BM Algoritmik</h3>
                        </div>
                        <div className='row'>
                            <div className='col-md-11 col-sm-11'>
                                <p style={{paddingLeft:'50px', paddingTop:'20px'}}  >Как зарабатыввать на акциях. Какие прибыли и риски. Сколько нужно денег. Алготрейдинг основы </p>
                            </div>
                        </div>
                    </div>
                    {/*2*/}
                    <div style={{marginLeft:'100px', marginTop:'50px'}} className='eduBlock'>
                        <div style={{paddingLeft:'50px', paddingTop:'30px'}} className='flex'>
                            <img src={IcoTwo} style={{width:'36px', marginLeft:'-30px', marginRight:'10px'}} alt=""/>
                            <h3>Разработка и тестирование торговых стратегий</h3>
                        </div>
                        <div className='row'>
                            <div className='col-md-11 col-sm-11'>
                                <p style={{paddingLeft:'50px', paddingTop:'20px'}}  >На реальном примере создадим торговую стратегию и рассмотрим результаты ее работы </p>
                            </div>
                        </div>
                    </div>
                    {/*3*/}
                    <div style={{marginLeft:'40px', marginTop:'50px'}} className='eduBlock'>
                        <div style={{paddingLeft:'50px', paddingTop:'30px'}} className='flex'>
                            <img src={IcoTree} style={{width:'56px', marginLeft:'-10px'}} alt=""/>
                            <h3 style={{paddingLeft:'20px', paddingTop:'10px'}} >Торговля акциями по сигналам</h3>
                        </div>
                        <div className='row'>
                            <div className='col-md-11 col-sm-11'>
                                <p style={{paddingLeft:'50px', paddingTop:'20px'}}  > Разберем все нюансы как выбратть стратегии, составить грамотный бюджет и зарабатывать </p>
                            </div>
                        </div>
                    </div>

                </div>




                <div className='col-md-4 img_container' style={{height:'600px', paddingTop:'40px'}}>
                    <img  style={{height:'700px', paddingTop:'40px'}}  src={ImageMan} alt=""/>

                </div>
            </div>


        </div>
    );
};

export default Subscription;
