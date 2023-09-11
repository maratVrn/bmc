import React from 'react';
import Image from './img/howWork.jpg'
import ImageBot from './img/bot.jpg'
import ImageCost from './img/cost.svg'
import ImageAll from './img/allStrategy.jpg'



import {useNavigate} from "react-router-dom";

const Training = () => {
    const navigate = useNavigate();
    const allClass = 'col-md-4 pt-3 text-center '
    return (
        <>
            {/*<div className='container ' style={{marginTop:'70px', marginBottom:'70px'}} >*/}
            {/*    <h3> Вам доступен авторский курс, который позволит научится совершать выгодные сделки на фондовом рынке использую наши торговые сигналы . </h3>*/}
            {/*    <div className='row' style={{marginTop:'70px'}}>*/}
            {/*        <div className= {allClass} >*/}
            {/*            <iframe width="100%" height="300" className='border_r' src="https://www.youtube.com/embed/j1JVeZDN3yQ"*/}
            {/*                    title="YouTube video player"*/}
            {/*                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
            {/*                    allowFullScreen*/}
            {/*            >*/}
            {/*            </iframe>*/}
            {/*        </div>*/}
            {/*        <div className={allClass}>*/}
            {/*            <iframe width="100%" height="300"className='border_r' src="https://www.youtube.com/embed/Lu1cN76n5jg"*/}
            {/*                    title="YouTube video player"*/}
            {/*                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
            {/*                    allowFullScreen*/}
            {/*            >*/}
            {/*            </iframe>*/}
            {/*        </div>*/}
            {/*        <div className={allClass} >*/}
            {/*            <iframe width="100%" height="300" className='border_r' src="https://www.youtube.com/embed/5ZvPhx2Ql4Q"*/}
            {/*                    title="YouTube video player"*/}
            {/*                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
            {/*                    allowFullScreen*/}
            {/*            >*/}
            {/*            </iframe>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*    <div className='text-center pt-5'>*/}
            {/*        <button className='button1'>Все обучающие материалы</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className=''>
                {/*Как это работает*/}
                <div className='container'>
                    <h3 style={{fontSize: '36px', fontWeight: '900', paddingTop: '30px'}}>Как это работает</h3>

                    <div className='row'>
                        <div className='col-md-6'>
                            <h4> Зарабатывайте на акциях вместе с нами</h4>

                            <div className='img_container'>

                                <img src={Image} alt=""/>

                            </div>
                            <button className='btn-a_blue'>Зарегестрироваться</button>
                        </div>
                        <div className='col-md-6 img_container'>
                            <img style={{paddingTop:'40px'}} src={ImageBot} alt=""/>

                        </div>
                    </div>

                </div>
                {/*Сколько стоит*/}
                <div className='container' style={{paddingTop:'80px'}}>
                    <h3 style={{fontSize: '36px', fontWeight: '900', paddingTop: '30px'}}>Сколько стоит</h3>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='row'  style={{paddingTop:'50px'}}>
                                <div className='col-md-6 col-sm-6'>
                                    <p>Сигналы на сайте</p>
                                </div>
                                <div className='col-md-6 col-sm-6' style={{display:"inline-block", textAlign:'right'}}>
                                    <span className='spanInfo'>Бесплатно</span>
                                </div>


                            </div>
                            <div className='row'  style={{paddingTop:'50px'}}>
                                <div className='col-md-6 col-sm-6'>
                                    <p>Online сигналы акции РФ</p>
                                </div>
                                <div className='col-md-6 col-sm-6' style={{display:"inline-block", textAlign:'right'}}>
                                    <span className='spanInfo'>990 / месяц</span>
                                </div>


                            </div>
                            <div className='row'  style={{paddingTop:'50px'}}>
                                <div className='col-md-6 col-sm-6'>
                                    <p>Online сигналы акции РФ + фьючерсы</p>
                                </div>
                                <div className='col-md-6 col-sm-6' style={{display:"inline-block", textAlign:'right'}}>
                                    <span className='spanInfo'>1690 / месяц</span>
                                </div>


                            </div>


                        </div>
                        <div className='col-md-6 img_container' style={{height:'300px'}}>
                            <img  src={ImageCost} alt=""/>

                        </div>
                    </div>
                    {/*<div className='img_container' style={{height:'650px', paddingTop:'30px'}}>*/}
                    {/*    <img  src={ImageAll} alt=""/>*/}

                    {/*</div>*/}
                    <h3 style={{fontSize: '36px', fontWeight: '900', paddingTop: '100px'}}>Научитесь инвестировать в акции</h3>
                </div>


            </div>


        </>
    );
};

export default Training;
