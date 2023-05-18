import React from 'react';

const BriefcaseInfo = (props) => {
    const allClass = 'col-md-4 col-sm-6 col-6 my-3 text-center'
    return (
        <div className='container'>


            <div className='row'>
                <div className= {allClass} >

                    <img className='img_l' src='./assets/ico/icons1.png' alt='' />
                    <p>   Доходность Портфеля за период </p>
                    <h1> {props.opt ? props.opt.profit ? props.opt.profit : '' : ''} </h1>
                </div>
                <div className={allClass}>

                    <img className='img_l' src='./assets/ico/icons2.png' alt='' />
                    <p>   Колличество сделок </p>
                    <h1> {props.opt ? props.opt.dealCount ? props.opt.dealCount : '' : ''}   </h1>
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

export default BriefcaseInfo;
