import React from 'react';
import MyChart from "../components/MyChart";

import {useNavigate} from "react-router-dom";

const Training = () => {
    const navigate = useNavigate();
    const allClass = 'col-md-4 pt-3 text-center '
    return (
        <>
            <div className='container ' style={{marginTop:'70px', marginBottom:'70px'}} >
                <h3> Вам доступен авторский курс, который позволит научится совершать выгодные сделки на фондовом рынке использую наши торговые сигналы . </h3>
                <div className='row' style={{marginTop:'70px'}}>
                    {/*<div className= {allClass} >*/}
                    {/*    <iframe width="100%" height="300" className='border_r' src="https://www.youtube.com/embed/j1JVeZDN3yQ"*/}
                    {/*            title="YouTube video player"*/}
                    {/*            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                    {/*            allowFullScreen*/}
                    {/*    >*/}
                    {/*    </iframe>*/}
                    {/*</div>*/}
                    {/*<div className={allClass}>*/}
                    {/*    <iframe width="100%" height="300"className='border_r' src="https://www.youtube.com/embed/Lu1cN76n5jg"*/}
                    {/*            title="YouTube video player"*/}
                    {/*            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                    {/*            allowFullScreen*/}
                    {/*    >*/}
                    {/*    </iframe>*/}
                    {/*</div>*/}
                    {/*<div className={allClass} >*/}
                    {/*    <iframe width="100%" height="300" className='border_r' src="https://www.youtube.com/embed/5ZvPhx2Ql4Q"*/}
                    {/*            title="YouTube video player"*/}
                    {/*            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                    {/*            allowFullScreen*/}
                    {/*    >*/}
                    {/*    </iframe>*/}
                    {/*</div>*/}

                </div>
                <div className='text-center pt-5'>
                    <button className='button1'>Все обучающие материалы</button>
                </div>
            </div>
            <div className='bgColorBlue'>
                <div className='container'>
                    <div className='row' >
                        <div className='col-md-6 px-4 text-center' >

                            <div className='border_r diaryInfo' style={{backgroundColor:'white'}}>


                            </div>
                        </div>
                        <div className='col-md-6  my-3 text-center' >
                            <h3 className='pt-5' style={{color:'white'}}> Дневник сделок трейдера  </h3>
                            <p className='p-5' style={{color:'white'}}>Разработанный нами дневник трейдера позволит сохранить историю ваших сделок. При этом вы сможете проверить насколько правильным был выбор цены вашей сделки, рассчитать полученную прибыль. Анализ сделок трейдера является залогом успешной работы.</p>


                            <button className='button1'>Перейти в дневник</button>
                        </div>
                    </div>

                </div>
            </div>


        </>
    );
};

export default Training;
