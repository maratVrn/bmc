import React, {useState, useContext, useEffect,useRef} from 'react';
import Table from "react-bootstrap/Table";
import StrategyEdit from "./modal/StrategyEdit";
import StrategyDataEdit from "./modal/StrategyDataEdit";
import {Context} from "../../../src/index";
import {observer} from "mobx-react-lite";
import StrategyChart from "../StrategyChart";
import {dataAllViewOneData, dataGetNewProfitData} from "../../bmfunctions";
import UserStore from "../../store/userStore";


const UsersSettings = () => {


    const {userStore} = useContext(Context);
    const [strategyEdit, setStrategyEdit] = useState(false)  // Отображение окна редактирования стратегий
    const [strategyDataEdit, setStrategyDataEdit] = useState(false)  // Отображение окна редактирования данных для стратегий


    //
    // const setOneShowData = (strategyData) => {
    //
    //     strategyStore.setSelectedStrategyDataOne(strategyData)
    //     // const newData =dataGetViewOneData(strategyData)
    //     // setShowData(newData)
    //
    // }
    //
    const setSelectedUser = (user) => {
        userStore.setSelectedOne(user)
    }


    const changeUser = () => {
        // strategyStore.setIsNew(false)
        // if (strategyStore.selectedOne.id) { setStrategyEdit(true) }
        //      else {alert('Необходимо выбрать стратегию')}
    }
    //
    // const changeStrategyData = () => {
    //     strategyStore.setIsNew(false)
    //     if (strategyStore.selectedStrategyDataOne.id) { setStrategyDataEdit(true) }
    //     else {alert('Необходимо выбрать данные')}
    // }
    // const newStrategyData = () => {
    //
    //     if (strategyStore.selectedOne.name){
    //         strategyStore.setIsNew(true)
    //         setStrategyDataEdit(true) }
    // }

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


    // const confirmAndDeleteStrategyData = () => {
    //     if (strategyStore.selectedStrategyDataOne)
    //         if (strategyStore.selectedStrategyDataOne.id) {
    //             if (window.confirm(`Вы действительно хотите удалить данные для стратегии ${strategyStore.selectedOne.name} за ${strategyStore.selectedStrategyDataOne.year} год`)) {
    //                 strategyStore.deleteSelectedData()
    //             }
    //
    //         } else {
    //             alert('Необходимо выбрать стратегию и год')
    //         }
    //
    // }

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
            {/*<StrategyEdit show={strategyEdit} onHide={() => setStrategyEdit(false)}/>*/}



            <div className='p-2'>


                <Table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 14}}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>E-mail</th>
                        <th>Имя</th>
                        <th>Роль</th>
                        <th>mail active</th>

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
                                // onDoubleClick={changeStrategy}

                            >
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.isActivated? 'Да':'Нет'}</td>

                            </tr>)
                    }
                    </tbody>
                </Table>
                {userStore.errorMessage? <h3 style={{color:'red'}}>{userStore.errorMessage}</h3>:''}
            </div>
            {/*/!*---------------------------Данные по выбранной стратегии-------------------------------*!/*/}
            {/*<StrategyDataEdit show={strategyDataEdit} onHide={() => setStrategyDataEdit(false)}/>*/}
            {/*<h3>Доступные данные по стратегии {strategyStore.selectedOne?.name} </h3>*/}
            {/*<div className='p-2'>*/}
            {/*    <button className="button3" onClick={newStrategyData} >Добавить</button>*/}

            {/*    <button className='button3' onClick={changeStrategyData}>Изменить</button>*/}
            {/*    <button className='button3' onClick={confirmAndDeleteStrategyData }>Удалить</button>*/}
            {/*    <button className='button3' onClick={test }>test</button>*/}

            {/*</div>*/}

            {/*<div className='p-2'>*/}


            {/*    <Table className="table border  table-hover h-25 "  style={{lineHeight: 1, fontSize: 14}}>*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            <th>№</th>*/}
            {/*            <th>Год</th>*/}
            {/*            <th>Что то</th>*/}

            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {*/}
            {/*            strategyStore.selectedOne?.strategyData?.map((strategyData,idx) =>*/}
            {/*                <tr*/}
            {/*                    key={strategyData.id}*/}
            {/*                    className="col-lg"*/}
            {/*                    style={{backgroundColor: strategyData.id === strategyStore.selectedStrategyDataOne?.id ? 'LightGray' : 'white', cursor: 'pointer'}}*/}
            {/*                    onClick={() => {setOneShowData(strategyData)}}*/}
            {/*                    onDoubleClick={changeStrategyData} >*/}
            {/*                    <td>{idx+1}</td>*/}
            {/*                    <td>{strategyData.year}</td>*/}
            {/*                    <td>{strategyData.points}</td>*/}

            {/*                </tr>)*/}
            {/*        }*/}
            {/*        </tbody>*/}
            {/*    </Table>*/}

            {/*</div>*/}
            {/*<StrategyChart key={dataKey} data = {showData} curDeal = {curDeal} name =  {strategyStore?.selectedOne?.name} />*/}

        </div>
    );
};

export default observer(UsersSettings);
