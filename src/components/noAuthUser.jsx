import React from 'react';
import {Link} from "react-router-dom";

const NoAuthUser = () => {
    return (
        <div style={{paddingTop:'50px', paddingBottom:'50px'}}>
            <h1> Вы не авторизованы на сайте </h1>
            <h2 style={{paddingTop:'30px'}}> Для просмотра данных вам необходимо зарегистрироваться и авторизоваться </h2>
            <h3 style={{paddingTop:'30px'}}><Link to='/login'>Войти / Зарегистрироваться</Link> </h3>
        </div>
    );
};

export default NoAuthUser;
