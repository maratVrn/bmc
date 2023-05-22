import React, {useState, useContext, useEffect} from 'react';
import Table from "react-bootstrap/Table";
import {Context} from "../../../src/index";
import {observer} from "mobx-react-lite";
import UserEdit from "./modal/UserEdit";


const UsersSettings = () => {


    const {userStore} = useContext(Context);
    const [userEdit, setUserEdit] = useState(false)  // Отображение окна редактирования пользователя


    const setSelectedUser = (user) => {
        userStore.setSelectedOne(user)
    }


    const changeUser = () => {
        userStore.setIsNew(false)
        if (userStore.selectedOne.id) { setUserEdit(true) }
        else {alert('Необходимо выбрать пользователя')}
    }
    const confirmAndDeleteUser = () => {
        // if (strategyStore.selectedOne)
        // if (strategyStore.selectedOne.id) {
        //     if (window.confirm(`Вы действительно хотите удалить стратегию ${strategyStore.selectedOne.name}`)) {
        //          strategyStore.deleteSelected()
        //     }
        //
        // } else {
        //     alert('Необходимо выбрать стратегию')
        // }

    }

    useEffect(() =>{
        userStore.getAllUsers()
    },[])

    return (
        <div>
            <h1>Пользователи</h1>
            <div className='p-2'>
                <button className="button3" onClick={() => {
                    // strategyStore.setIsNew(true)
                    // setStrategyEdit(true)
                }
                }
                >Добавить</button>
                <button className='button3' onClick={changeUser}>Изменить</button>
                <button className='button3' onClick={confirmAndDeleteUser }>Удалить</button>
            </div>

            <div className='p-2'>


                <Table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 14}}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>E-mail</th>
                        <th>Имя</th>
                        <th>Роль</th>
                        <th>mail active</th>
                        <th>Data</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        userStore.allUsers.map((user,idx) =>
                            <tr
                                key={user.id}
                                className="col-lg"
                                style={{backgroundColor: user.id === userStore.selectedOne?.id ? 'LightGray' : 'white', cursor: 'pointer'}}
                                onClick={() => {setSelectedUser(user)}}
                                onDoubleClick={changeUser}

                            >
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.isActivated? 'Да':'Нет'}</td>
                                <td>{user.about}</td>


                            </tr>)
                    }
                    </tbody>
                </Table>
                {userStore.errorMessage? <h3 style={{color:'red'}}>{userStore.errorMessage}</h3>:''}
            </div>


            {/*-------------------- Редактирование пользователя -----------------------------*/}
            <UserEdit show={userEdit} onHide={() => setUserEdit(false)}/>


        </div>
    );
};

export default observer(UsersSettings);
