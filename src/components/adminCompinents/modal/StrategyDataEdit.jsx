import React, {useContext, useState} from 'react';
import {Modal, Form} from "react-bootstrap";
import {Context} from "../../../../src/index";
import {
    dataCalcStrategyDataParam,
    dataGetAboutData,
    dataGetDealsData,
    dataGetProfitData,
    dataGetTicketData, dataToStr, dealsToStr, rounded2
} from "../../../bmfunctions";


const StrategyDataEdit = ({show, onHide}) => {

    const [year, setYear] = useState(0)
    const [ticketData, setTicketData] = useState('')
    const [dealsData, setDealsData] = useState('')
    const [profitData, setProfitData] = useState('')
    const [aboutData, setAboutData] = useState('')
    const [addProfitGlobal, setAddProfitGlobal] = useState(0)


    const {strategyStore} = useContext(Context)
    // Строим график прибыли
    // В конце каждого дня смотрим цену и считаем как изменилась текущая прибыль исходя из сделки
    const calcStrategyProfit = () => {
        let predDay = 0
        let needDealI = -1
        let curDeal = {}
        let addProfit = 0
        setAddProfitGlobal(0)
        let itogProfitData =''
        const ticketDataIn   = dataGetTicketData(ticketData)
        const dealsDataIn    = dataGetDealsData(dealsData)

        for (let j = 0; j < ticketDataIn.length; j++) {
            const t1 = ticketDataIn[j]
            let needJ = 0
            let needCalc = false
            const day = new Date(t1[0]).getDate()

            // Ищем последнюю цену дня (также учитываем что элемент один или последний в списке)
            if (j===0) predDay = day
            if (predDay !== day){
                needJ = j-1
                if (needJ<0) needJ = 0
                needCalc = true
                predDay = day
            }
            if (j===ticketDataIn.length-1) {
                needJ = j
                needCalc = true
            }
            // Если нашли послденюю цену дня то считаем прибыль и добавляем в расчет
            if (needCalc){
                const t2 = ticketDataIn[needJ]
                let t2DT = new Date(t2[0])
                // Опрределяем текущую сделку. Если нашли новую то меняем расчетные параметры
                let dealI = -1
                for (let i = 0; i < dealsDataIn.length; i++){
                    const deal = dealsDataIn[i]
                    let dealDT = new Date(deal.x)
                    if (dealDT<=t2DT) dealI = i
                }
                if ((dealI > -1) && (dealI !==needDealI)) {
                    needDealI = dealI
                    // Делаем завершающий расчет прибыли и меняем сделку
                    if (curDeal.y){
                        let endDealProfit  = 100*(( dealsDataIn[needDealI].y-curDeal.y)/curDeal.y)
                        if (curDeal.isLong === false) endDealProfit *= -1
                        addProfit += endDealProfit
                        addProfit = rounded2(addProfit)
                        if (itogProfitData !== '') itogProfitData += '*\n'
                        itogProfitData += dealsDataIn[needDealI].x+'#'+addProfit
                    }
                    curDeal   = dealsDataIn[needDealI]
                }
                // Делаем расчет прибыли
                if (dealI > -1){
                    let dayProfit =  100*(( parseFloat(t2[1])-curDeal.y)/curDeal.y)
                    if (curDeal.isLong === false) dayProfit *= -1
                    dayProfit +=  addProfit
                    dayProfit = rounded2(dayProfit)
                    if (itogProfitData !== '') itogProfitData += '*\n'
                    itogProfitData += t2[0]+'#'+dayProfit
                }
            }
        }
        setAddProfitGlobal(addProfit)
        setProfitData(itogProfitData)
    }

    const calcStrategyParam = () => {
        const strategyData = {}
        strategyData.ticketData   = dataGetTicketData(ticketData)
        strategyData.dealsData    = dataGetDealsData(dealsData)
        strategyData.profitData   = dataGetProfitData(profitData)
        const strategyParam       = dataCalcStrategyDataParam(strategyData,addProfitGlobal)
        console.log(strategyParam);
        setAboutData(strategyParam)
    }

    const addStrategyData = () => {
        const strategyData = {}
        strategyData.year = year
        strategyData.strategyName = strategyStore.selectedOne?.name
        strategyData.ticketData   = dataGetTicketData(ticketData)
        strategyData.dealsData    = dataGetDealsData(dealsData)
        strategyData.profitData   = dataGetProfitData(profitData)
        strategyData.aboutData    = dataGetAboutData(aboutData)


        strategyStore.newStrategyData(strategyData).then(() =>{
            onHide()})
    }

    const updateStrategyData = () => {

        const strategyData = {}
        Object.assign(strategyData, strategyStore.selectedStrategyDataOne)
        strategyData.year = year
        strategyData.ticketData = dataGetTicketData(ticketData)
        strategyData.dealsData = dataGetDealsData(dealsData)
        strategyData.profitData = dataGetProfitData(profitData)
        strategyData.aboutData = dataGetAboutData(aboutData)


        strategyStore.saveStrategyData (strategyData).then(data => {
            if (data.status === 200) {
                strategyStore.selectedStrategyDataOne.ticketData = strategyData.ticketData
                strategyStore.selectedStrategyDataOne.dealsData = strategyData.dealsData
                strategyStore.selectedStrategyDataOne.profitData = strategyData.profitData
                strategyStore.selectedStrategyDataOne.aboutData = strategyData.aboutData
                onHide()
            }

        })
    }


    // При открытии страницы
    const SetParams = () => {
        if (strategyStore.isNew) {  setYear(''); setTicketData(''); setDealsData(''); setProfitData(''); setAboutData('')
        } else {    setYear(strategyStore.selectedStrategyDataOne.year);
                    setTicketData(dataToStr(strategyStore.selectedStrategyDataOne.ticketData));
                    setDealsData(dealsToStr(strategyStore.selectedStrategyDataOne.dealsData));
                    setProfitData(dataToStr(strategyStore.selectedStrategyDataOne.profitData));
                    setAboutData(dataToStr(strategyStore.selectedStrategyDataOne.aboutData))}}


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            onShow={SetParams}
        >
            <Modal.Header closeButton>
                <Modal.Title id="">
                    {strategyStore.isNew? `Добавить данные для стратегии ${strategyStore.selectedOne.name}` : 'Изменить данные для стратегии'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>



                <Form>

                    <Form.Control    className="mt-2"
                        value = {year}
                        onChange={e=>setYear(e.target.value)}
                        placeholder={"Год... "}    />

                    <Form.Label className="mt-2">Цены</Form.Label>
                    <Form.Control as="textarea" rows={3}
                                  value = {ticketData}
                                  onChange={e=>setTicketData(e.target.value)}  />

                    <Form.Label className="mt-2">Сделки</Form.Label>
                    <Form.Control as="textarea" rows={3}
                                  value = {dealsData}
                                  onChange={e=>setDealsData(e.target.value)}  />

                    <Form.Label className="mt-2">Доходность</Form.Label>
                    <Form.Control as="textarea" rows={3}
                                  value = {profitData}
                                  onChange={e=>setProfitData(e.target.value)}  />

                    <Form.Label className="mt-2">Информация</Form.Label>

                    <Form.Control as="textarea" rows={6}
                                  value = {aboutData}
                                  onChange={e=>setAboutData(e.target.value)}  />

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <button className="button3" onClick={calcStrategyParam}>Рассчитать параметры</button>
                <button className="button3" onClick={calcStrategyProfit}>Рассчет прибыли</button>

                <button className="button3" onClick={onHide}>Закрыть</button>
                {strategyStore.isNew
                    ? <button className="button3" onClick={addStrategyData}>Создать данные</button>
                    : <button className="button3" onClick={updateStrategyData}>Изменить данные</button>
                }



            </Modal.Footer>

        </Modal>
    );
};

export default StrategyDataEdit;
