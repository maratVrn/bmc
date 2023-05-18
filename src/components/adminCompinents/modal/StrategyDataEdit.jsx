import React, {useContext, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import {Context} from "../../../../src/index";
import {
    dataCalcStrategyParam,
    dataGetAboutData,
    dataGetDealsData,
    dataGetProfitData,
    dataGetTicketData, dataToStr, dealsToStr
} from "../../../bmfunctions";


const StrategyDataEdit = ({show, onHide}) => {

    const [year, setYear] = useState(0)
    const [ticketData, setTicketData] = useState('')
    const [dealsData, setDealsData] = useState('')
    const [profitData, setProfitData] = useState('')
    const [aboutData, setAboutData] = useState('')


    const {strategyStore} = useContext(Context)

    const calcStrategyParam = () => {
        const strategyData = {}
        strategyData.ticketData   = dataGetTicketData(ticketData)
        strategyData.dealsData    = dataGetDealsData(dealsData)
        strategyData.profitData   = dataGetProfitData(profitData)
        const strategyParam = dataCalcStrategyParam(strategyData)
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

                    <Form.Control as="textarea" rows={3}
                                  value = {aboutData}
                                  onChange={e=>setAboutData(e.target.value)}  />

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <button className="button3" onClick={calcStrategyParam}>Расчитать параметры</button>
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
