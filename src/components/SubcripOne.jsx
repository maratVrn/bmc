import React from 'react';

const SubcripOne = (props) => {

    return (

            <div className='border_r' style={{marginTop: '30px'}}>
                <div className='subHeader'>
                    <h3>{props.opt ? props.opt.title ? props.opt.title : '' : ''}</h3>
                </div>
                <div className='subPrice'>
                    <h4 style={{color:'green'}}>{props.opt ? props.opt.discount ? props.opt.discount : '' : ''}</h4>
                    <h1 style={{padding:'15px'}}>{props.opt ? props.opt.price ? props.opt.price : '' : ''}</h1>
                    <h3 style={{color:'silver'}}><s>{props.opt ? props.opt.oldPrice ? props.opt.oldPrice : '' : ''}</s></h3>
                </div>
                <div style={{textAlign:'center', paddingBottom:'20px'}}>
                    <p>✓  Доступ ко всем стратегиям</p>
                    <p>✓  Сигналы в реальном времени</p>
                    <p>✓  Вероятность лучшей цены</p>
                    <p>✓  WatsApp/Telegram оповещение</p>
                    <p>✓  Формирование портфеля стратегий</p>
                    {/*<button  className= "chart-btn"> Оплатить   </button>*/}
                </div>




                <div style={{display: 'flex', justifyContent:'center', marginBottom:'30px'}}>
                    <button className='button2'>Оплатить</button> </div>
            </div>

    );
};

export default SubcripOne;
