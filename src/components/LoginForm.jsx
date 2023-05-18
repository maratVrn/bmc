import React, {useState, useContext, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AuthService from "../services/AuthService";
import {Link} from "react-router-dom";


const LoginForm = observer(() => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {userStore} = useContext(Context)

    useEffect(() => {
         setEmail('begisgevmr@mail.ru')
            setPassword('12345')
            window.scrollTo(0, 0)

    },[]);

    async function sendEmailConfirm(){
        try{

            //TODO: Поиграть с задержками
            await  userStore.sendEmailConfirm(userStore.user.email).then(handleShow)
        } catch (e) {
            console.log(e)
        }

    }


    return (
        <div className='container' style={{paddingTop:'100px'}}>

            {userStore.isAuth ?
                <div style={{paddingTop:'100px', paddingBottom:'70px'}}>
                    <h1 > {`Вы зашли в систему с email   ${userStore.user.email}` } </h1>
                    {userStore.user.isActivated ?'' :
                        <div>
                            <h3 style={{paddingTop:'30px'}}>Регистрация прошла успешно </h3>
                            <h3 style={{paddingTop:'50px', color:'indianred'}}> Ваш email не активирован, часть функционала сайта не доступно, проверьте письмо с активацией на своем e-mail </h3>
                            <h3 style={{paddingTop:'30px'}}>Если вы не получали письмо нажмите </h3>
                            <Link  onClick={sendEmailConfirm}> <h3 style={{paddingTop:'30px', color:'indianred'}}> отправить повторно</h3> </Link>
                        </div>
                    }
                </div>
                :
                <div className="container">
                    <div className="d-flex flex-column   align-items-center">
                        <h1> Вход в систему </h1>
                        <div className='pt-5' style={{minWidth:370}}>
                            <input
                                className="form-control"
                                onChange={e=>setEmail(e.target.value)}
                                value={email}
                                type='text'
                                placeholder='Введите email'
                            />
                        </div>

                        <div className='pt-5' style={{minWidth:370}}>
                            <input
                                className="form-control"
                                onChange={e=>setPassword(e.target.value)}
                                value={password}
                                type='password'
                                placeholder='Пароль'
                            />

                        </div>
                        {userStore.errorMessage ?<h3 style={{paddingTop:'50px', color:'indianred'}}> { userStore.errorMessage } </h3> : '' }
                        <div  className='pt-5' >
                            <button className='button2 mx-2' onClick={()=>userStore.login(email,password)}>Войти</button>
                            <button className='button2_2 mx-2' onClick={()=>userStore.registration(email,password)}>Регистрация</button>
                        </div>
                    </div>

                </div>


            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Письмо отправлено</Modal.Title>
                </Modal.Header>
                <Modal.Body>Проверьте ваш email и активируйте свою учетную запись</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>

                </Modal.Footer>
            </Modal>



        </div>
    );
});

export default LoginForm;
