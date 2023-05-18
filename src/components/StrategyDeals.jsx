import React from 'react';
import Table from 'react-bootstrap/Table';
import {observer} from "mobx-react-lite";


const StrategyDeals = (props) => {

    return (
        <div className='container'>
            <div className='row'>
            <Table className="table border col-md-12  table-hover h-20 "  style={{lineHeight: 1, fontSize: 14}}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Тип Сделки</th>
                    <th>Дата/Время открытия</th>
                    <th>Цена открытия</th>
                    <th>Дата/Время закрытия</th>
                    <th>Цена закрытия</th>
                    <th>Прибыль, %</th>
                </tr>
                </thead>
                <tbody>

                {

                    props.data?.map((deal,idx) =>
                        <tr
                            key={idx}
                            // className="col-lg"
                            // style={{backgroundColor: briefcase.id === briefcaseStore.selectedOne?.id ? 'LightGray' : 'white', cursor: 'pointer'}}
                            // onClick={() => {setSelectedBriefcaseDataToShow(briefcase)}}
                            // onDoubleClick={changeBriefcase}

                        >
                            <td>{idx+1}</td>
                            {deal.isLong? <td>Лонг</td> : <td>Шорт</td>}
                            <td>{deal.x}</td>
                            <td>{deal.y}</td>
                            <td>{deal.closeDt}</td>
                            <td>{deal.closePr}</td>
                            <td>{deal.profit}</td>


                        </tr>)
                }

                </tbody>
            </Table>
            </div>
        </div>
    );
};

export default observer(StrategyDeals);
