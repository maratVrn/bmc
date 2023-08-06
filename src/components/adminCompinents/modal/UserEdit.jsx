import React, {useContext, useState} from 'react';
import {Modal, Form} from "react-bootstrap";
import {Context} from "../../../../src/index";


const UserEdit = ({show, onHide}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('USER')
    const [active, setActive] = useState(false)
    const [phone, setPhone] = useState('')
    const [about, setAbout] = useState('')



    const {userStore} = useContext(Context)


    const addClient = () => {
        // strategyStore.newStrategy(name,dataGetAboutData(points)).then(data =>{
        //     strategyStore.setSelectedOne(data)
        //     onHide()})
    }

    async function updateUser () {

        // const strategy = {}
        // Object.assign(strategy,strategyStore.selectedOne)
        // strategy.name = name
        // strategy.points = dataGetAboutData(points)
        //
        // strategyStore.saveStrategy(strategy ).then(data => {
        //     if (data.status===200){
        //         strategyStore.setNewName(name)
        //         strategyStore.setNewPoints(points) }
        //     onHide()
        //     } )

        try{
            const user = userStore.selectedOne
            user.name = name
            user.email = email
            user.phone = phone
            user.role = role
            user.isActivated = active
            user.about = about

            await  userStore.saveUser(user).then(onHide())

        } catch (e) {
            console.log(e)
        }

    }


    // При открытии страницы
    const SetParams = () => {
        if (userStore.isNew) {  setName('');setEmail('');
            setRole('USER'); setActive(false); setPhone(''); setAbout('')
        } else {   setName(userStore.selectedOne.name);
            setEmail(userStore.selectedOne.email); setRole(userStore.selectedOne.role);
            userStore.selectedOne.isActivated? setActive(true) :  setActive(false);
            setPhone(userStore.selectedOne.phone);
            setAbout(userStore.selectedOne.about) // тут возможно datatostr
        }
    }


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
                    {userStore.isNew? 'Создать пользователя' : 'Изменить пользователя'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className="input-group align-items-center mt-3">
                    <span className="input-group-text col-3"  style={{height:'35px'}}>E-mail</span>
                    <input type="text"  style={{height:'35px'}} className="form-control " value={email} onChange={e => {setEmail(e.target.value)}}   ></input>

                </div>

                <div className="input-group align-items-center mt-3">
                    <span className="input-group-text col-3"  style={{height:'35px'}}>Имя</span>
                    <input type="text"  style={{height:'35px'}} className="form-control " value={name} onChange={e => {setName(e.target.value)}}   ></input>
                </div>

                <div className="input-group align-items-center mt-3">
                    <span className="input-group-text col-3"  style={{height:'35px'}}>Роль</span>
                    <input type="text"  style={{height:'35px'}} className="form-control " value={role} onChange={e => {setRole(e.target.value)}}   ></input>
                </div>

                <div className="input-group align-items-center mt-3">
                    <span className="input-group-text col-3"  style={{height:'35px'}}>Телефон</span>
                    <input type="text"  style={{height:'35px'}} className="form-control " value={phone} onChange={e => {setPhone(e.target.value)}}   ></input>
                </div>

                <div className="input-group align-items-center mt-3">
                    <label>
                        <input type="checkbox" checked={active}  onChange={e => setActive(e.target.checked)}  />
                        Учетная запись активирована
                    </label>

                </div>
                <Form>
                    <Form.Control
                        className="mt-3"
                        as="textarea" rows={5}
                        value = {about}
                        onChange={e=>setAbout(e.target.value)}
                        placeholder={"Доступные данные.. "}
                    />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <button className="button3" onClick={onHide}>Закрыть</button>
                {userStore.isNew
                    ? <button className="button3" onClick={addClient}>Создать пользователя</button>
                    : <button className="button3" onClick={updateUser}>Изменить пользователя</button>
                }



            </Modal.Footer>

        </Modal>
    );
};

export default UserEdit;
