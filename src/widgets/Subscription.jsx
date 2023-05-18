import React from 'react';
import SubcripOne from "../components/SubcripOne";


const Subscription = () => {
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
        <div style={{marginTop: '70px'}}>

            <div className='container' >
                <div className=''>
                    <h1> Подписка на получение торговых сигналов  </h1>
                    <p>Для получения своевременных сигналов по выбранной вами стратегии необходимо зарегистрироваться и оплатить удобный вариант подписки и оповещения. Вся предоставленная информация должна использоваться исключительно в частных целях. </p>

                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 '> <SubcripOne opt = {sub1}/> </div>
                    <div className='col-md-4 '> <SubcripOne opt = {sub2}/> </div>
                    <div className='col-md-4 '> <SubcripOne opt = {sub3}/> </div>
                </div>

            </div>




        </div>
    );
};

export default Subscription;
