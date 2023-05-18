import React, {useContext, useState} from 'react';
import {Modal, Form} from "react-bootstrap";
import {Context} from "../../../../src/index";
import Table from "react-bootstrap/Table";
import {

    dataBriefcaseParamToStr, dataCalcBriefcaseParam, dataCalcStrategyParam, dataGetAboutData,
    dataGetBriefcaseParam, dataGetNewProfitData, dataGetNewProfitData2, rounded2
} from "../../../bmfunctions";


const BriefcaseEdit = ({show, onHide}) => {

    const [name, setName] = useState('')                        // Название портфеля
    const [strategyArray, setStrategyArray] = useState([])      // Стратегия в списке в портфелей
    const [capitalIn, setCapitalIn] = useState(50)               // Список стратегий в портфелей
    const [strategyAddName, setStrategyAddName] = useState('')  // Имя добавляемой стратегии

    const [selectedNum, setSelectedNum] = useState(0)           // Выбранный элемент таблицы
    const [isCalsData, setIsCalsData] = useState(false)         // Произведен ли перерасчет данных

    const {briefcaseStore, userStore, strategyStore} = useContext(Context)

    const [briefcaseDataArray, setBriefcaseDataArray] = useState([]) // Массив данных для сохранения в дальнейшем данных о портфеле
    const tmpBriefcaseDataArray = []

    // Работа со списком стратегий в портфеле
    const delStrategy = () => {
        if ((selectedNum>-1) && (selectedNum<strategyArray.length))
        {
            setIsCalsData(false)
            const newArr = strategyArray
            newArr.splice(selectedNum, 1)
            setStrategyArray([...newArr])
        }

    }
    const addStrategy = () =>{
        const addData = {
            strategy:strategyAddName, capital:capitalIn
        }
        if ((capitalIn>4.99) && (capitalIn<100.01))  {

            let inArray = false
            for (let i = 0; i < strategyArray.length; i++)
                if (strategyAddName === strategyArray[i].strategy)  inArray = true


            if (!inArray) {setIsCalsData(false)
                setStrategyArray([...strategyArray,addData])}
                else alert(`Стратегия ${strategyAddName} уже есть в портфеле`)



        } else {
                 alert('% Капитала должен быть от 5 до 100')
             }

    }


    // Создаем новый портфель
    const addBriefcase = () => {
        if (strategyArray.length>0) {
            if (name !== '') {
                if (isCalsData) {

                    const userId = userStore.user?.id ? userStore.user.id : -1
                    const strategyIn = dataBriefcaseParamToStr(strategyArray)
                    const briefcase = {name, userId, strategyIn}
                    briefcaseStore.newBriefcase(briefcase).then(data => {
                        //  Сохраняем данные портфеля!
                        if (data.id) {
                            briefcaseStore.setSelectedOne(data)
                            for (let i = 0; i < briefcaseDataArray.length; i++) {
                                const briefcaseData = briefcaseDataArray[i]
                                briefcaseData.briefcaseID = data.id
                                briefcaseStore.newBriefcaseData(briefcaseData).then(() => {
                                })
                            }
                        }

                        onHide()
                    })
                } else alert('Необходимо произвести расчет данных')
            } else alert('Необходимо указать название портфеля')
        }else alert('Необходимо добавить стратегии в потрфель')
    }

    const addStartBriefcaseData = (strategyData, capital) => {


        for (let i = 0; i < strategyData.length; i++){
            const newData = {}
            newData.year         = strategyData[i].year
            newData.dealsData    = []
            Object.assign(newData.dealsData, strategyData[i].dealsData)
            for (let k = 0; k < newData.dealsData.length; k++){
                newData.dealsData[k].strategyName = strategyData[i].strategyName
            }
            newData.profitData   = dataGetNewProfitData(strategyData[i], capital)
            newData.aboutData    = dataGetAboutData(dataCalcBriefcaseParam(newData))

            tmpBriefcaseDataArray.push(newData)
        }

    }

    // Добавляем в портфель доп данные от другой стратегии
    const addBriefcaseData = (strategyData, capital) => {


        for (let i = 0; i < tmpBriefcaseDataArray.length; i++){
            const crYear = tmpBriefcaseDataArray[i].year
            // Ищем данные за аналогичный год в доп стратегии и если находим - обьеденяем
            for (let j = 0; j < strategyData.length; j++){
                if  (crYear === strategyData[j].year){
                    const newData = {}
                    newData.year         = strategyData[j].year
                    newData.dealsData    = []
                    Object.assign(newData.dealsData, strategyData[j].dealsData)
                    for (let k = 0; k < newData.dealsData.length; k++){
                        newData.dealsData[k].strategyName = strategyData[j].strategyName
                    }


                    newData.profitData   = dataGetNewProfitData(strategyData[j], capital)

                    newData.aboutData    = []
                    // Обьединяем данные
                    tmpBriefcaseDataArray[i].dealsData = [...tmpBriefcaseDataArray[i].dealsData,...newData.dealsData]
                    let oldProfit = 0
                    for (let k = 0; k < tmpBriefcaseDataArray[i].profitData.length; k++){
                        let isNotData = true // Если данные не нашлись

                        const  date1 = new Date(tmpBriefcaseDataArray[i].profitData[k][0])
                        const day1 = date1.getDate()
                        const month1 = date1.getMonth()

                        // Пробегаемся по данным дополнительного массива и ищем такой же день
                        for (let x = 0; x < newData.profitData.length; x++) {
                            const  date2 = new Date(newData.profitData[x][0])
                            const day2 = date2.getDate()
                            const month2 = date2.getMonth()
                            // Если нашли полное соответсвие данные
                            if ((day1 === day2) && (month1===month2)){
                                tmpBriefcaseDataArray[i].profitData[k][1]+=newData.profitData[x][1]
                                oldProfit = newData.profitData[x][1]
                                tmpBriefcaseDataArray[i].profitData[k][1] = rounded2(tmpBriefcaseDataArray[i].profitData[k][1])
                                isNotData = false
                                break
                            }

                        }
                        // Если не нашли соответсвие плюсуем предыдущее значение
                        if (isNotData) {

                            tmpBriefcaseDataArray[i].profitData[k][1]+=oldProfit
                            tmpBriefcaseDataArray[i].profitData[k][1] = rounded2(tmpBriefcaseDataArray[i].profitData[k][1])

                        }


                    }
                    // Делаем расчет итоговых данных
                    tmpBriefcaseDataArray[i].aboutData    = dataGetAboutData(dataCalcBriefcaseParam(tmpBriefcaseDataArray[i]))


                }

            }
        }


    }

    // TODO: Вынести в отдельный файл расчет данных портфеля
    const CalsData = () => {
        // Создаем даные доходности на основе набранных стратегий
        if (strategyArray.length>0) {
            let strategyName = undefined
            let capital = 100


            if (strategyArray.length > 0)  strategyName = strategyArray[0].strategy

            if (strategyName) strategyStore.getStrategyData(strategyName).then(() => {

                strategyArray[0].capital ? capital = strategyArray[0].capital : capital = 100
                const data = strategyStore.getStrategyDataByName(strategyName)

                addStartBriefcaseData(data, capital)

                // Потом добавляем в цикле остальные данные
                for (let i = 1; i < strategyArray.length; i++){
                    strategyName = strategyArray[i].strategy
                    capital = strategyArray[i].capital

                    strategyStore.getStrategyData(strategyName).then(() => {


                        addBriefcaseData(strategyStore.getStrategyDataByName(strategyName), capital)
                    })

                }

                setBriefcaseDataArray(tmpBriefcaseDataArray)
            })
            setIsCalsData(true)
        }else alert('Необходимо добавить стратегии в потрфель')

    }
    // Сохраняем изменения в портфеле
    const updateBriefcase = () => {
        if (isCalsData) {
            const briefcase = {}
            Object.assign(briefcase, briefcaseStore.selectedOne)
            briefcase.name = name
            briefcase.strategyIn = dataBriefcaseParamToStr(strategyArray)


            // Записываем новые данные
            briefcaseStore.saveBriefcase(briefcase).then(data => {
                if (data.status === 200) {



                    briefcaseStore.setNewName(name)
                    briefcaseStore.setStrategyIn(briefcase.strategyIn)
                    // Удаляем предыдущие данные по портфелю
                    briefcaseStore.deleteSelectedData()
                    //  Записываем новые данные

                    if (briefcase.id) {
                        for (let i = 0; i < briefcaseDataArray.length; i++) {
                            const briefcaseData = briefcaseDataArray[i]
                            briefcaseData.briefcaseID = briefcase.id

                            briefcaseStore.newBriefcaseData(briefcaseData).then(() => {
                            })
                        }
                    }

                }
                onHide()
            })
        }  else alert('Необходимо произвести расчет данных')
    }


    // При открытии страницы установка данных в заивимости от того говый портфель или редактирование
    const SetParams = () => {
        setIsCalsData(false)
        if (strategyStore.allStrategy.length >0)
            setStrategyAddName(strategyStore.allStrategy[0].name)

        if (briefcaseStore.isNew) {  setName('');
            setStrategyArray([])
            setSelectedNum(-1)
        } else {   setName(briefcaseStore.selectedOne.name);
            const stArray = dataGetBriefcaseParam(briefcaseStore.selectedOne.strategyIn)
            setStrategyArray(stArray)
            stArray.length>0? setSelectedNum(0) : setSelectedNum(-1)

        }}




    return (
        <Modal  show={show} onHide={onHide} size="lg" centered onShow={SetParams}>
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {briefcaseStore.isNew? 'Добавить портфель' : 'Изменить портфель'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control   className="m-2" value = {name} onChange={e=>setName(e.target.value)} placeholder={"Название портфеля... "} />
                </Form>

                <div className="input-group align-items-center m-2">
                    <span className="input-group-text col-2"  style={{height:'35px'}}>Стратегия</span>
                    <select className="form-select"  style={{height:'35px'}} onChange={e => {setStrategyAddName(e.target.value)}} value={strategyAddName}>
                        {strategyStore.allStrategy.map((strategy)  =>
                            <option key={strategy.id} value={strategy.name} >{strategy.name} </option>
                        )}
                    </select>

                    <span className="input-group-text col-2"  style={{height:'35px'}}>% Капитала</span>
                    <input type="number"  style={{height:'35px'}} className="form-control" value={capitalIn} onChange={e => {setCapitalIn(e.target.value)}}   ></input>

                    <button className="button2"  style={{marginLeft:'10px'}}  onClick={addStrategy}>Добавить стратегию</button>

                </div>

                <Table className="table border  table-hover h-25  m-2"  style={{lineHeight: 1, fontSize: 14}}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Стратегия</th>
                        <th>% капитала</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        strategyArray.map((oneData,idx) =>
                            <tr
                                key={idx}  className="col-lg"
                                style={{backgroundColor: idx === selectedNum ? 'LightGray' : 'white', cursor: 'pointer'}}
                                onClick={() => {setSelectedNum(idx)}}
                            >
                                <td>{idx+1}</td>
                                <td>{oneData.strategy}</td>
                                <td>{oneData.capital} %</td>
                            </tr>)
                    }
                    </tbody>
                </Table>

                <button className="button2 m-2" onClick={delStrategy}>Удалить стратегию</button>



            </Modal.Body>
            {isCalsData? <h3>Данные для портфеля расчитаны</h3>:''}
            {briefcaseStore.errorMessage? <h3 style={{color:'red'}}>{briefcaseStore.errorMessage}</h3>:''}
            <Modal.Footer>


                <button className="button2" onClick={onHide}>Закрыть</button>
                <button className="button2" onClick={CalsData}>Расчет данных</button>
                {briefcaseStore.isNew
                    ? <button className="button2" onClick={addBriefcase}>Создать портфель</button>
                    : <button className="button2" onClick={updateBriefcase}>Изменить портфель</button>
                }



            </Modal.Footer>

        </Modal>
    );
};

export default BriefcaseEdit;
