import React from 'react';
import {useNavigate} from "react-router-dom";

const MainInfo = () => {
    const navigate = useNavigate();

    return (
        <div className='pt-5 align-middle ' id='mainInfo'>
          <div className='container' style={{paddingTop:'00px'}}>
              <div className=" m2 row justify-content-center align-items-center">
                  <div className= {'col-md-7 col-sm-7 pt-5 '} >

                      <h1 id='m2'  className='pt-5' >
                          Инвестиционные стратегии <br />
                          прибыль 37 % годовых <br />
                          с 2017 года
                      </h1>
                      <p id='m2' className='pt-5'>Торговые стратегии проверенные с 2017 года</p>
                      <button onClick={() => navigate('/allStrategy')}  className='btn-a_blue mt-5'>Результаты за 2023 год</button>

                  </div>
                  <div className= '  col-md-5 col-sm-5 text-center  ' >
                      <div  className='border' id='m2f' style={{ maxWidth:'492px', height : '492px', borderRadius :'240px'}}></div>
                  </div>


              </div>
          </div>



        </div>
    );
};

export default MainInfo;
