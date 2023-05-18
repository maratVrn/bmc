import React, {useContext, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import {Context} from "../../../../src/index";
import {dataGetAboutData, dataToStr} from "../../../bmfunctions";


const StrategyEdit = ({show, onHide}) => {

    const [name, setName] = useState('')
    const [points, setPoints] = useState('')

    const {strategyStore} = useContext(Context)


    const addClient = () => {
        strategyStore.newStrategy(name,dataGetAboutData(points)).then(data =>{
            strategyStore.setSelectedOne(data)
            onHide()})
    }

    const updateStrategy = () => {

        const strategy = {}
        Object.assign(strategy,strategyStore.selectedOne)
        strategy.name = name
        strategy.points = dataGetAboutData(points)

        strategyStore.saveStrategy(strategy ).then(data => {
            if (data.status===200){
                strategyStore.setNewName(name)
                strategyStore.setNewPoints(points) }
            onHide()
            } )

    }


    // При открытии страницы
    const SetParams = () => {
        if (strategyStore.isNew) {  setName(''); setPoints('')
        } else {   setName(strategyStore.selectedOne.name); setPoints(dataToStr(strategyStore.selectedOne.points))      }}




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
                    {strategyStore.isNew? 'Добавить стратегию' : 'Изменить стратегию'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Control
                        className="m-2"
                        value = {name}
                        onChange={e=>setName(e.target.value)}
                        placeholder={"Название стратегии... "}
                    />

                    <Form.Control
                        className="m-2"
                        as="textarea" rows={3}
                        value = {points}
                        onChange={e=>setPoints(e.target.value)}
                        placeholder={"Доступные данные.. "}
                    />



                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button className="button3" onClick={onHide}>Закрыть</Button>
                {strategyStore.isNew
                    ? <Button className="button3" onClick={addClient}>Создать стратегию</Button>
                    : <Button className="button3" onClick={updateStrategy}>Изменить стратегию</Button>
                }



            </Modal.Footer>

        </Modal>
    );
};

export default StrategyEdit;
