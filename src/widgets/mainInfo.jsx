import React from 'react';

const MainInfo = () => {
    const allClass = 'col-md-4 col-sm-4 pt-3 text-center '
    return (
        <div className='pt-5 align-middle' id='mainInfo'>
          <div className='container  ' >
              <div className="row justify-content-center align-items-center">
                  <h1 style={{color:'white', paddingTop:'180px'}}>
                      Инвестиционные торговые <br />
                      стратегии
                  </h1>
                  <div style={{marginTop:'20px', marginBottom : '20px'}}>
                      <p style={{marginTop: '20px', textAlign:'center', fontSize: '20px'}}>Сигналы торговли акциями на основе матемитического моделирования и машинного обучения.</p>
                  </div>

                      <div className='row' style={{marginTop:'40px'}}>
                          <div className= {allClass} >
                              <h1 style={{color:'white'}}>
                                  37%
                              </h1>
                              <p>   Средняя годовая доходность с 2017 года </p>

                          </div>
                          <div className= {allClass} >
                              <h1 style={{color:'white'}}>
                                  15
                              </h1>
                              <p >   Среднее колличество сделок по одному иструменту в год</p>
                          </div>
                          <div className= {allClass} >
                              <h1 style={{color:'white'}}>
                                  12%
                              </h1>
                              <p >   Доходность лучшего инструмента с начала 2023 года </p>
                          </div>
                      </div>
              </div>
          </div>



        </div>
    );
};

export default MainInfo;
