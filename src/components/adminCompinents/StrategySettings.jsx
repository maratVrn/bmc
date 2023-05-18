import React, {useState, useContext, useEffect,useRef} from 'react';
import Table from "react-bootstrap/Table";
import StrategyEdit from "./modal/StrategyEdit";
import StrategyDataEdit from "./modal/StrategyDataEdit";
import {Context} from "../../../src/index";
import {observer} from "mobx-react-lite";
import StrategyChart from "../StrategyChart";
import {dataAllViewOneData, dataGetNewProfitData} from "../../bmfunctions";


const StrategySettings = () => {


    const {strategyStore} = useContext(Context);
    const [strategyEdit, setStrategyEdit] = useState(false)  // Отображение окна редактирования стратегий
    const [strategyDataEdit, setStrategyDataEdit] = useState(false)  // Отображение окна редактирования данных для стратегий

    const [dataKey, setDataKey] = useState(0)  // Используем для передачи в чарт чтобы обновился график после подгрузки данных

    const [showData, setShowData] = useState({}) // Данные для отображения на графике

    const [curDeal, setСurDeal] = useState({})   // Данные по текущей сделке

    const setOneShowData = (strategyData) => {

        strategyStore.setSelectedStrategyDataOne(strategyData)
        // const newData =dataGetViewOneData(strategyData)
        // setShowData(newData)

    }

    const setSelectedStrategyDataToShow = (strategy) => {
        strategyStore.setSelectedOne(strategy)

        if (strategy.name) strategyStore.getStrategyData(strategy.name).then(() => {


            const newData =dataAllViewOneData(strategyStore.selectedOne?.strategyData)
            setShowData(newData)
            setСurDeal(strategyStore.selectedOne?.points)
            setDataKey(strategyStore.selectedOne?.id)


        })
    }


    const changeStrategy = () => {
        strategyStore.setIsNew(false)
        if (strategyStore.selectedOne.id) { setStrategyEdit(true) }
             else {alert('Необходимо выбрать стратегию')}
    }

    const changeStrategyData = () => {
        strategyStore.setIsNew(false)
        if (strategyStore.selectedStrategyDataOne.id) { setStrategyDataEdit(true) }
        else {alert('Необходимо выбрать данные')}
    }
    const newStrategyData = () => {

        if (strategyStore.selectedOne.name){
            strategyStore.setIsNew(true)
            setStrategyDataEdit(true) }
    }

    const confirmAndDeleteStrategy = () => {
        if (strategyStore.selectedOne)
        if (strategyStore.selectedOne.id) {
            if (window.confirm(`Вы действительно хотите удалить стратегию ${strategyStore.selectedOne.name}`)) {
                 strategyStore.deleteSelected()
            }

        } else {
            alert('Необходимо выбрать стратегию')
        }

    }

    const test = () => {
        console.log(dataGetNewProfitData(strategyStore.selectedStrategyDataOne,50));
    }

    const confirmAndDeleteStrategyData = () => {
        if (strategyStore.selectedStrategyDataOne)
            if (strategyStore.selectedStrategyDataOne.id) {
                if (window.confirm(`Вы действительно хотите удалить данные для стратегии ${strategyStore.selectedOne.name} за ${strategyStore.selectedStrategyDataOne.year} год`)) {
                    strategyStore.deleteSelectedData()
                }

            } else {
                alert('Необходимо выбрать стратегию и год')
            }

    }

    useEffect(() =>{
        strategyStore.setSelectedStrategyDataOne(null)
    },[])

    return (
        <div>
            <h1>Стратегии</h1>
            <div className='p-2'>
                <button className="button3" onClick={() => {
                    strategyStore.setIsNew(true)
                    setStrategyEdit(true)} } >Добавить</button>

                <button className='button3' onClick={changeStrategy}>Изменить</button>
                <button className='button3' onClick={confirmAndDeleteStrategy }>Удалить</button>


            </div>
            <StrategyEdit show={strategyEdit} onHide={() => setStrategyEdit(false)}/>



            <div className='p-2'>


                <Table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 14}}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Данные</th>

                </tr>
                </thead>
                <tbody>
                {
                    strategyStore.allStrategy.map((strategy,idx) =>
                    <tr
                        key={strategy.id}
                        className="col-lg"
                        style={{backgroundColor: strategy.id === strategyStore.selectedOne?.id ? 'LightGray' : 'white', cursor: 'pointer'}}
                        onClick={() => {setSelectedStrategyDataToShow(strategy)}}
                        onDoubleClick={changeStrategy}

                    >


                        <td>{idx+1}</td>
                        <td>{strategy.name}</td>
                        <td>{strategy.points}</td>

                    </tr>)
                }
                </tbody>
            </Table>
                {strategyStore.errorMessage? <h3 style={{color:'red'}}>{strategyStore.errorMessage}</h3>:''}
            </div>
            {/*---------------------------Данные по выбранной стратегии-------------------------------*/}
            <StrategyDataEdit show={strategyDataEdit} onHide={() => setStrategyDataEdit(false)}/>
            <h3>Доступные данные по стратегии {strategyStore.selectedOne?.name} </h3>
            <div className='p-2'>
                <button className="button3" onClick={newStrategyData} >Добавить</button>

                <button className='button3' onClick={changeStrategyData}>Изменить</button>
                <button className='button3' onClick={confirmAndDeleteStrategyData }>Удалить</button>
                <button className='button3' onClick={test }>test</button>

            </div>

            <div className='p-2'>


                <Table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 14}}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Год</th>
                        <th>Что то</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        strategyStore.selectedOne?.strategyData?.map((strategyData,idx) =>
                            <tr
                                key={strategyData.id}
                                className="col-lg"
                                style={{backgroundColor: strategyData.id === strategyStore.selectedStrategyDataOne?.id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                onClick={() => {setOneShowData(strategyData)}}
                                onDoubleClick={changeStrategyData} >
                                <td>{idx+1}</td>
                                <td>{strategyData.year}</td>
                                <td>{strategyData.points}</td>

                            </tr>)
                    }
                    </tbody>
                </Table>

            </div>
            <StrategyChart key={dataKey} data = {showData} curDeal = {curDeal} name =  {strategyStore?.selectedOne?.name} />

        </div>
    );
};

export default observer(StrategySettings);
