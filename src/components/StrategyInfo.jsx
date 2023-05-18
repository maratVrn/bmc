import React from 'react';

const StrategyInfo = (props) => {
    const allClass = 'col-md-4 col-sm-6 col-6 my-3 text-center'
    return (
        <div className='container'>


            <div className='row'>
                <div className= {allClass} >

                    <img className='img_l' src='./assets/ico/icons1.png' alt='' />
                    <p>   Доходность стратегии за выбранный период </p>
                    <h1> {props.opt ? props.opt.profit ? props.opt.profit : '' : ''} </h1>
                </div>
                <div className={allClass}>

                    <img className='img_l' src='./assets/ico/icons2.png' alt='' />
                    <p>   Колличество сделок </p>
                    <h1> {props.opt ? props.opt.dealCount ? props.opt.dealCount : '' : ''}   </h1>
                </div>
                <div className={allClass} >

                    <img className='img_l' src='./assets/ico/icons3.png' alt='' />
                    <p>   Максимальная просадка от стартового дипозита </p>
                    <h1> {props.opt ? props.opt.maxStartMinus ? props.opt.maxStartMinus : '' : ''}  </h1>
                </div>
                <div className={allClass} >

                    <img className='img_l' src='./assets/ico/icons4.png' alt='' />
                    <p>   Средняя продолжительность сделки </p>
                    <h1> {props.opt ? props.opt.middleDeal ? props.opt.middleDeal +' дней' : '' : ''}  </h1>
                </div>
                <div className={allClass} >

                    <img className='img_l' src='./assets/ico/icons5.png' alt='' />
                    <p>    Колличество положительных сделок </p>
                    <h1>{props.opt ? props.opt.plusDeal ? props.opt.plusDeal : '' : ''}  </h1>
                </div>
                <div className={allClass} >

                    <img className='img_l' src='./assets/ico/icons6.png' alt='' />
                    <p>    Просадка от максимальных значений </p>
                    <h1> {props.opt ? props.opt.maxMinus ? props.opt.maxMinus : '' : ''}  </h1>
                </div>
            </div>

        </div>
    );
};

export default StrategyInfo;
