import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserSettings = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {userStore} = useContext(Context)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')


    useEffect(() => {
        if (userStore.isAuth) {
        setName(userStore.user.name)
        setPhone(userStore.user.phone)
        setEmail(userStore.user.email) }

        window.scrollTo(0, 0)

    },[userStore.isAuth]);

    async function sendEmailConfirm(){
        try{
            const user = userStore.user
            user.name = name
            user.phone = phone

            //TODO: Поиграть с задержками
            await  userStore.saveUser(user).then(handleShow)

        } catch (e) {
            console.log(e)
        }

    }

    return (

        <div style={{paddingTop:'100px'}}>

            <div className="container">
                <h2> Настройки пользователя</h2>

                <div className='row ' style={{marginTop:'20px'}}>
                    <div className='col-md-4 pt-4 text-md-end text-sm-start'><p>Email</p></div>
                    <div className='col-md-4 pt-3' style={{minWidth:370}}>
                        <input
                            className="form-control"
                            // onChange={e=>setEmail(e.target.value)}
                            // value={userStore.user.email}
                            value={email}
                            type='text'
                            readOnly
                            disabled
                            placeholder='Введите email'
                        />
                    </div>
                </div>
                <div className='row ' style={{marginTop:'00px'}}>
                    <div className='col-md-4 pt-2 text-md-end text-sm-start'><p>Имя</p></div>
                    <div className='col-md-4 pt-1' style={{minWidth:370}}>
                        <input
                            className="form-control"
                            onChange={e=>setName(e.target.value)}
                            value={name}
                            type='text'
                            placeholder='Введите имя'
                        />
                    </div>

                </div>
                <div className='row ' style={{marginTop:'00px'}}>
                    <div className='col-md-4 pt-2 text-md-end text-sm-start'><p>Телефон</p></div>
                    <div className='col-md-4 pt-1' style={{minWidth:370}}>
                        <input
                            className="form-control"
                            onChange={e=>setPhone(e.target.value)}
                            value={phone}
                            type='text'
                            placeholder='8 (9ХХ) ХХХ-ХХ-ХХ'
                        />
                    </div>

                </div>
                <div className="d-flex flex-column pt-4  align-items-center">
                    <button className='button2' onClick={sendEmailConfirm}>Сохранить</button>

                </div>


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Данные сохранены</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Измененные данные были успешно сохранены</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};

export default observer(UserSettings);
