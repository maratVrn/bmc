import React, {useContext, useEffect, useState} from 'react';
import BriefcaseEdit from "./modal/BriefcaseEdit";
import Table from "react-bootstrap/Table";
import {Context} from "../../../src/index";
import {observer} from "mobx-react-lite";
import StrategyChart from "../StrategyChart";
import BriefCaseChart from "../BriefCaseChart";
import {dataAllViewBriefcaseData, dataGetBriefcaseParam, dataGetObjFromArray} from "../../bmfunctions";



const BriefcaseSettings = () => {
    const {briefcaseStore} = useContext(Context);
    const {strategyStore} = useContext(Context);
    const [briefcaseEdit, setBriefcaseEdit] = useState(false)  // Отображение окна редактирования портфелей
    const [dataKey, setDataKey] = useState(0)  // Используем для передачи в чарт чтобы обновился график после подгрузки данных
    const [showData, setShowData] = useState({}) // Данные для отображения на графике
    const [briefcasePoints, setBriefcasePoints] = useState({}) // Данные для отображения на графике

    const changeBriefcase = () => {
        briefcaseStore.setIsNew(false)
        if (briefcaseStore.selectedOne.id) { setBriefcaseEdit(true) }
        else {alert('Необходимо выбрать портфель')}
    }

    const confirmAndDeleteBriefcase = () => {
        if (briefcaseStore.selectedOne)
            if (briefcaseStore.selectedOne.id) {
                if (window.confirm(`вы действительно хотите удалить Портфель ${briefcaseStore.selectedOne.name}`)) {
                    briefcaseStore.deleteSelected()
                }

            } else {
                alert('необходимо выбрать стратегию')
            }

    }

    const setSelectedBriefcaseDataToShow = (briefcase) => {
        briefcaseStore.setSelectedOne(briefcase)


        if (briefcase.id) briefcaseStore.getBriefcaseData(briefcase.id).then(() => {


            const newData =dataAllViewBriefcaseData(briefcaseStore.selectedOne?.allBriefcaseData)
            // Получаем эндпоинты по портфелю чтобы отобразить текущие сделки
            const stArray = dataGetBriefcaseParam(briefcaseStore.selectedOne.strategyIn)
            const newBriefcasePoints = []
            for (let i = 0; i < stArray.length; i++) {

                let strategyName = stArray[i].strategy
                let curStrategyPoints = strategyStore.getPoints(strategyName)
                if (curStrategyPoints) {
                    const dealData = dataGetObjFromArray(curStrategyPoints)
                    dealData['strategyName'] = strategyName
                    newBriefcasePoints.push(dealData)


                }

            }
            setBriefcasePoints(newBriefcasePoints)

            setShowData(newData)

            setDataKey(briefcaseStore.selectedOne?.id)


        })
    }

    useEffect(() =>{
        //briefcaseStore.setSelectedBriefcaseDataOne(null)
    },[])

    return (
        <div>
            <h1>Портфели</h1>
            <div className='p-2'>
                <button className="button3" onClick={() => {
                    briefcaseStore.setIsNew(true)
                    setBriefcaseEdit(true)} } >Добавить</button>
                <button className='button3' onClick={changeBriefcase}>Изменить</button>
                <button className='button3' onClick={confirmAndDeleteBriefcase }>Удалить</button>
            </div>
            <BriefcaseEdit show={briefcaseEdit} onHide={() => setBriefcaseEdit(false)}/>
            <div className='p-2'>
                <Table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 14}}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Стратегии</th>

                    </tr>
                    </thead>
                    <tbody>
                    {

                        briefcaseStore?.allSBriefcaseAdmin?.map((briefcase,idx) =>
                            <tr
                                key={briefcase.id}
                                className="col-lg"
                                style={{backgroundColor: briefcase.id === briefcaseStore.selectedOne?.id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                onClick={() => {setSelectedBriefcaseDataToShow(briefcase)}}
                                onDoubleClick={changeBriefcase}

                            >
                                <td>{idx+1}</td>
                                <td>{briefcase.name}</td>
                                <td>{briefcase.strategyIn}</td>

                            </tr>)
                    }
                    </tbody>
                </Table>
                {briefcaseStore.errorMessage? <h3 style={{color:'red'}}>{briefcaseStore.errorMessage}</h3>:''}
            </div>
            <BriefCaseChart key={dataKey} data = {showData} points = {briefcasePoints} name =  {briefcaseStore?.selectedOne?.name} />
        </div>
    );
};

export default observer(BriefcaseSettings);
