import React from 'react';
import Table from 'react-bootstrap/Table';
import {observer} from "mobx-react-lite";
import data from "bootstrap/js/src/dom/data";


const BriefcaseCurrDeal = (props) => {
    const allClass = 'col-md-3 col-sm-6 col-6 my-3 text-center'

    return (
        <div className='container'>
            { props?.data.length?
                props?.data?.map((dealData,idx) =>
                    <div key = {idx} className='row'>
                        <h1 >{dealData.strategyName }</h1>
                        <div className= {allClass} >
                            <p>   Тип Сделки </p>
                            <h1>{dealData.dealType? 'Лонг' : 'Шорт'}</h1>
                        </div>
                        <div className={allClass}>
                            <p>   Дата/Время </p>
                            <h3 className="pt-3">{dealData.dateDealStart}</h3>
                        </div>
                        <div className={allClass} >
                            <p>   Цена открытия </p>
                            <h1>{dealData.priseDealStart}</h1>
                        </div>
                        <div className= {allClass} >
                            <p>   Прибыль </p>
                            <h1>{dealData.nowProfit}</h1>
                        </div>

                    </div>

                )
                : ''
            }


        </div>
    );
};

export default observer(BriefcaseCurrDeal);
