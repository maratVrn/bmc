import './App.css';
import React, {useContext, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AllStrategy from "./widgets/AllStrategy";
import AllBriefcase from "./widgets/AllBriefcase";
import "./styles/styles.css"
import MainPage from "./pages/mainPage";
import Strategy from "./widgets/Strategy";
import Briefcase from './widgets/Briefcase'
import Footer from "./widgets/footer";
import NavBar from "./widgets/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import UserSettings from "./widgets/UserSettings";
import Admin from "./widgets/Admin";



function App() {
    const {userStore} = useContext(Context)
    const {strategyStore} = useContext(Context)
    const {briefcaseStore} = useContext(Context)

    // при открытии приложения загружаем основные данные

    useEffect(()=>{

        // Загружаем стратегии
        strategyStore.getAllStrategy().then(() => {
           // После загрузки вычиляем лучшую стратегию
            strategyStore.getBestStrategyData()
        }
        )

        briefcaseStore.getAllAdminBriefcase().then(()=>{
            briefcaseStore.getBestBriefCaseData()
        })


        console.log('Загрузка стартовых данных');

        // Проверяем если пользователь ранее логинился то рефрешим его
        if (localStorage.getItem('token')){
            userStore.checkAuth()
        }

    },[])


  return (
      <>
          <BrowserRouter>
              <div>
              <NavBar />

              <Routes>

                  <Route  path={'/'}        element={<MainPage />} exact />
                  <Route  path={'/allStrategy'}   element={<AllStrategy/>} exact/>
                  <Route  path={'/allBriefcase'}   element={<AllBriefcase/>} exact/>
                  <Route  path={'/strategy'}element={<Strategy/>} exact/>
                  <Route  path={'/briefcase'}element={<Briefcase/>} exact/>
                  <Route  path={'/login'}   element={<LoginForm/>} exact/>
                  <Route  path={'/settings'}element={<UserSettings/>} exact/>
                  <Route  path={'/admin'}   element={<Admin/>} exact/>

              </Routes>

                <Footer/>
              </div>
          </BrowserRouter>
      </>
          );
}

export default App;


