import React, {useContext, useState} from "react";
import "../styles/navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import {Link, useNavigate} from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { GiExitDoor} from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai"
import { AiFillProfile} from "react-icons/ai"
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const {userStore} = useContext(Context)
    const navigate = useNavigate();

    const handleNavbarDisplay = () => {
        setShow(!show);
    };

    return (

        <div className='fixed-top navDiv' >



            <div className="nmy container ">
                <div className='col-md-2 '> <img onClick={() => navigate('/')}  style={{cursor:'pointer'}} src='/assets/logo.png' alt=''  /> </div>
                <div className='col-md-8 ' >
                    <ul >
                        <li>
                            <Link to='/allStrategy'>Стратегии</Link>
                        </li>
                        <li>
                            <Link to='/'>Обучение</Link>
                        </li>
                        <li>
                            <Link to='/'>Тарифы</Link>
                        </li>
                        <li>
                            <Link to='/'>Контакты</Link>
                        </li>
                    </ul>
                </div>
                <div className='col-md-2 '>

                        {userStore.isAuth

                            ? <ul >

                                {userStore?.user?.role === "ADMIN" ?
                                <li> <Link to='/admin'> <AiFillProfile className='navbar_icon'/> </Link> </li> : ''}
                                <li> <Link to='/' onClick={()=>userStore.logout()}> <GiExitDoor className='navbar_icon'/> </Link> </li>
                                <li> <Link to='/settings'> <AiFillSetting className='navbar_icon'/> </Link> </li>
                            </ul>
                            : <ul > <li> <Link to='/login'> <BsFillPersonFill className='navbar_icon'/> Войти</Link> </li> </ul>}




                    <GiHamburgerMenu
                        onClick={() => handleNavbarDisplay()}
                        size={30}
                        width={30}
                        className="navbarIcon"
                    />
                </div>

            </div>

            {show && (
                <section className="navbarMobile">
                    <Link to='/allStrategy' onClick={() => handleNavbarDisplay()}>Стратегии</Link>
                    <Link to='/' onClick={() => handleNavbarDisplay()}>Обучение</Link>
                    <Link to='/' onClick={() => handleNavbarDisplay()}>Тарифы</Link>
                    <Link to='/' onClick={() => handleNavbarDisplay()}>Контакты</Link>
                    <hr></hr>
                    {userStore.isAuth

                        ?
<>
                            {userStore?.user?.role === "ADMIN" ?
                                <li> <Link to='/admin'  onClick={() => handleNavbarDisplay()}> <AiFillProfile className='navbar_icon'/> Админ панель </Link>  </li> : ''}
                            <li> <Link to='/' onClick={()=>{userStore.logout();handleNavbarDisplay()}}> <GiExitDoor className='navbar_icon'/> Выйти </Link> </li>
                            <li> <Link to='/settings'  onClick={() => handleNavbarDisplay()}> <AiFillSetting className='navbar_icon'/> Настройки </Link> </li>
</>
                        : <Link to='/login' onClick={() => handleNavbarDisplay()}> <BsFillPersonFill className='navbar_icon'/> Войти</Link>}


                </section>
            )}
        </div>
    );
};

export default observer( Navbar);
