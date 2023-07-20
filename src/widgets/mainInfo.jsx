import React from 'react';

const MainInfo = () => {

    return (
        <div className='pt-5 align-middle ' id='mainInfo'>
          <div className='container' style={{paddingTop:'00px'}}>
              <div className=" m2 row justify-content-center align-items-center">
                  <div className= {'col-md-7 col-sm-7 pt-5 '} >

                      <h1 id='m2'  className='pt-5' >
                          Зарабатывайте на акциях <br />
                          до 100 % годовых
                      </h1>
                      <p id='m2' className='pt-5'>Торговые стратегии проверенные с 2017 года</p>
                      <button className='btn-a_blue mt-5'>Выбрать стратегию</button>

                  </div>
                  <div className= '  col-md-5 col-sm-5 text-center  ' >
                      <div  className='border' id='m2f' style={{ maxWidth:'492px', height : '492px', borderRadius :'240px'}}></div>
                  </div>


                  {/*<div style={{marginTop:'20px', marginBottom : '20px'}}>*/}
                  {/*    <p style={{marginTop: '20px', textAlign:'center', fontSize: '20px'}}>Сигналы торговли акциями на основе матемитического моделирования и машинного обучения.</p>*/}
                  {/*</div>*/}

                      {/*<div className='row' style={{marginTop:'40px'}}>*/}
                      {/*    <div className= {allClass} >*/}
                      {/*        <h1 style={{color:'white'}}>*/}
                      {/*            37%*/}
                      {/*        </h1>*/}
                      {/*        <p>   Средняя годовая доходность с 2017 года </p>*/}

                      {/*    </div>*/}
                      {/*    <div className= {allClass} >*/}
                      {/*        <h1 style={{color:'white'}}>*/}
                      {/*            15*/}
                      {/*        </h1>*/}
                      {/*        <p >   Среднее колличество сделок по одному иструменту в год</p>*/}
                      {/*    </div>*/}
                      {/*    <div className= {allClass} >*/}
                      {/*        <h1 style={{color:'white'}}>*/}
                      {/*            44%*/}
                      {/*        </h1>*/}
                      {/*        <p >   Доходность лучшего инструмента с начала 2023 года </p>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
              </div>
          </div>



        </div>
    );
};

export default MainInfo;
