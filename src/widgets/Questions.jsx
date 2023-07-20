import React from 'react';
import ImageFaq from "./img/faq-img.svg";
import Accordion from 'react-bootstrap/Accordion';

const Questions = () => {
    return (
        <div className='container' style={{paddingTop:'80px'}}>
            <h3 style={{fontSize: '36px', fontWeight: '900', paddingTop: '30px'}}>Частые вопросы</h3>

            <div className='row'>

                <div className='col-md-6 img_container' style={{minHeight:'600px', paddingTop:'50px'}}>
                    <img  src={ImageFaq} alt=""/>
                </div>
                <div className='col-md-6'>
                    <Accordion  defaultActiveKey="-1">

                        <Accordion.Item style={{borderLeft : '2px', borderTop : '2px', borderRight : '2px', paddingTop:'20px' }} eventKey="0">
                            <Accordion.Header ><h4>Как долго нужно учиться?</h4></Accordion.Header>
                            <Accordion.Body>
                                Обучение основам интернет трейдинга занимает в среднем 2-3 недели. Однако создание торговой стратегии, умение торговать прибыльно, правильный подход к рискам – все эти навыки требуют длительного времени и зачастую сопровождаются пробами и ошибками на личном опыте.

                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item style={{borderLeft : '2px', borderTop : '2px', borderRight : '2px', paddingTop:'10px' }} eventKey="1">
                            <Accordion.Header><h4>Сколько я смогу заработать?</h4></Accordion.Header>
                            <Accordion.Body>
                                При торговле акциями Вы зарабатываете определенный % от Ваших средств. Мы считаем, что хорошей целью является прибыль в среднем 30 % годовых. Т.е. при капитале в 1 млн. рублей Ваша прибыль составит 261 000 рублей (после уплаты налогов по законам РФ – 13%).  Более высокие доходы возможны в период хороших долгосрочных трендов или при использовании финансовых плечей. Мы настоятельно не рекомендуем использовать плечи начинающим трейдерам.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item style={{borderLeft : '2px', borderTop : '2px', borderRight : '2px' , paddingTop:'10px'}} eventKey="2">
                            <Accordion.Header ><h4>Сколько денег нужно вложить?</h4></Accordion.Header>
                            <Accordion.Body>
                                Большим плюсом интернет трейдинга является тот факт, что размер ваших вложений не ограничен минимальными или максимальными инвестициями. Вы можете начинать со 100 рублей или даже с демо счета.  Вкладывать большие суммы имеет смысл только когда вы точно осознаете все риски и дейтсвуете строго согласно стратегии торговли.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item style={{borderLeft : '2px', borderTop : '2px', borderRight : '2px', paddingTop:'10px' }} eventKey="3">
                            <Accordion.Header ><h4>Какой брокер лучше?</h4></Accordion.Header>
                            <Accordion.Body>
                                Мы не выделяем какого-либо одного Брокера однако рекомендуем выбирать брокеров входящих в ТОП-5 и имеющих соответствующие лицензии и доступы к реальным торгам.  Также при выборе брокера внимательно изучайте тарифы и условия по вводу/выводу финансовых средств.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item style={{borderLeft : '2px', borderTop : '2px', borderRight : '2px', paddingTop:'10px' }} eventKey="4">
                            <Accordion.Header ><h4>Сколько времени занимает трейдинг? можно ли совмещать с работой?</h4></Accordion.Header>
                            <Accordion.Body>
                                Зависит от того что Вы ожидаете от трейдинга. Если хотите разрабатывать собственные стратегии, управлять капиталом и развиваться как специалист в этой области то трейдинг должен стать для Вас работой.   Если Вам интересно инвестирование и вы выбрали хороший торговый подход или стратегию то следить за ценами постоянно в течении дня не имеет смысла. Вы должны заниматься именно своей работой а трейдинг рассматривать как вариант сохранения/увеличения Вашего капитала. Наши торговые стратегии предполагают, что по одному инструменту производиться в среднем по 1-2 сделке в месяц.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item style={{borderLeft : '2px', borderTop : '2px', borderRight : '2px', paddingTop:'10px' }} eventKey="5">
                            <Accordion.Header ><h4>Какие риски возможны?</h4></Accordion.Header>
                            <Accordion.Body>
                                Это очень Важный вопрос, в разделе обучение у нас есть отдельное видео на эту тему. Важно понимать, что сейчас очень распространены методы агрессивной торговли с использованием больших финансовых плечей. Но как показывает практика (и математика) такие подходы приводят к полной потере капитала. Мы категорически не рекомендуем использовать плечи начинающим трейдерам. Без использование финансовых плечей и при составлении правильного риск менеджмента мы ставим рекомендацию по максимальным потерям – 10% на один инструмент.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item style={{borderLeft : '2px', borderTop : '2px', borderRight : '2px', paddingTop:'10px' }} eventKey="6">
                            <Accordion.Header ><h4>Реально ли зарабатывать 100 % годовых?</h4></Accordion.Header>
                            <Accordion.Body>
                                Потенциально трейдинг дает очень большие возможности для заработка. Обратной стороной этой возможности является то что многие хотят именно больших заработков не понимая, как именно этого достичь. Мы считаем хорошим показателем – 30 % годовых при спокойном варианте торговли. 100 % годовых реально при хорошем трендовом рынке и портфеле от 4-5 акций и использованием 2 плеча и капитализации. Более подробно про высокие доходы и аналитику наших стратегий смотрите в обучающем видео.
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </div>
            </div>

        </div>
    );
};

export default Questions;
