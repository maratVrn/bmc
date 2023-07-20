import React from 'react';
import IcoOne from "./img/icons8-trading-64.png";
import IcoTwo from "./img/icon_trading_2.png";
import IcoTree from "./img/icon_trading_3.png";
import IcoArrow from "./img/arrow.png";
import ImageMan from "./img/man.webp";
import {useNavigate} from "react-router-dom";


const Subscription = () => {

    const navigate = useNavigate();

    const sub1 = {
        title : 'Доступ на 1 месяц',
        discount : '-50%',
        price : '1290 Р',
        oldPrice : '2580 Р'
    }

    const sub2 = {
        title : 'Доступ на 6 месяцев',
        discount : '-40%',
        price : '6900 Р',
        oldPrice : '145080 Р'
    }



    const sub3 = {
        title : 'Доступ на 1 год',
        discount : '-30%',
        price : '9990 Р',
        oldPrice : '13880 Р'
    }

    return (
        <div className='border educationInfo' style={{marginTop: '70px'}}>


            {/*<div className='container' >*/}
            {/*    <div className=''>*/}
            {/*        <h1> Подписка на получение торговых сигналов  </h1>*/}
            {/*        <p>Для получения своевременных сигналов по выбранной вами стратегии необходимо зарегистрироваться и оплатить удобный вариант подписки и оповещения. Вся предоставленная информация должна использоваться исключительно в частных целях. </p>*/}

            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className='container'>*/}
            {/*    <div className='row'>*/}
            {/*        <div className='col-md-4 '> <SubcripOne opt = {sub1}/> </div>*/}
            {/*        <div className='col-md-4 '> <SubcripOne opt = {sub2}/> </div>*/}
            {/*        <div className='col-md-4 '> <SubcripOne opt = {sub3}/> </div>*/}
            {/*    </div>*/}

            {/*</div>*/}

            <div className='row'>
                <div className='col-md-8'>
                    {/*1    */}
                    <div style={{marginLeft:'40px', marginTop:'-20px'}} className='eduBlock'>
                        <div style={{paddingLeft:'50px', paddingTop:'30px'}} className='flex'>
                            <img src={IcoOne} style={{width:'48px', marginLeft:'-30px'}} alt=""/>
                            <h3>Основы инвестирования в акции. О проекте BM Algoritmik</h3>
                        </div>
                        <div className='row'>
                            <div className='col-md-11 col-sm-11'>
                                <p style={{paddingLeft:'50px', paddingTop:'20px'}}  >Как зарабатыввать на акциях. Какие прибыли и риски. Сколько нужно денег. Алготрейдинг основы </p>
                            </div>
                            <div className='col-md-1 col-sm-1'>
                                <img onClick={() => navigate('/allStrategy')} src={IcoArrow} style={{width:'36px', marginLeft:'-40px', cursor:'pointer'}} alt=""/>
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
                            <div className='col-md-1 col-sm-1'>
                                <img onClick={() => navigate('/allStrategy')} src={IcoArrow} style={{width:'36px', marginLeft:'-40px', cursor:'pointer'}} alt=""/>
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
                            <div className='col-md-1 col-sm-1'>
                                <img onClick={() => navigate('/allStrategy')} src={IcoArrow} style={{width:'36px', marginLeft:'-40px', cursor:'pointer'}} alt=""/>
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
