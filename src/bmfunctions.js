// Разбираем строку на массив график цен
export function dataGetTicketData (ticketData) {

    const data = ticketData.split('*');
    const res = []
    data.map(dc => {
        dc = dc.split('\n').join('')
        dc = dc.split('#')
        if (dc !== '') res.push(dc)
        return 'ok'
    })

    return res
}

// Разбираем строку на массив данных изменения прибыли
export function dataGetProfitData (profitData) {

    const data = profitData.split('*');
    const res = []
    data.map(dc => {
        dc = dc.split('\n').join('')
        dc = dc.split('#')
        if (dc !== '') res.push(dc)
        return 'ok'
    })

    return res
}

// Разбираем строку на массив сделок
export function dataGetDealsData (dealsData) {

    const data = dealsData.split('*');
    const res = []
    data.map(dc => {
        dc = dc.split('\n').join('')
        dc = dc.split('#')
        if (dc !== '') {
            const deal = {}
            deal.x = dc[0]
            deal.y = parseFloat(dc[1])
            dc[2] ==='1' ? deal.isLong = true : deal.isLong = false
            res.push(deal)
        }
        return 'ok'
    })

    return res
}

export function dataGetAboutData (aboutData) {

    const data = aboutData.split('*');
    const res = []
    data.map(dc => {
        dc = dc.split('\n').join('')
        dc = dc.split('#')
        if (dc !== '') res.push(dc)
        return 'ok'
    })

    return res
}


// график цен в строку
export function dataToStr (data) {

    let res = ''
    try {
        if (data)
            if (data.length){
                data.map(dc => {
                    res += dc[0]+'#'+dc[1]+'*\n'
                    return 'ok'
                })
            }
    } catch {console.log('Ошибка в dataToStr')}

    return res.slice(0, -2)
}

// Сделки в строку
export function dealsToStr (dealsData) {

    let res = ''
    try {
        dealsData.map(dc => {
            res += dc.x + '#' + dc.y + '#'
            dc.isLong ? res += '1' : res += '0'
            res += '*\n'
            return 'ok'
        })
    } catch {console.log('Ошибка в dealsToStr')}


    return res.slice(0, -2)
}

// Собираем информацию из нескольких  count источников по Портфелю c конца массива
export function dataGetBriefcaseInfoNum (briefcaseData, count) {
    const res = {
        profit : 0,
        dealCount : 0,
        maxMinus : 0,

    }
    const strategyLength = briefcaseData.length
    try {
        for (let i = strategyLength-count; i < strategyLength; i++) {
            const curRes = dataGetBriefcaseInfo(briefcaseData[i].aboutData)
            res.profit += parseFloat(curRes.profit)
            res.dealCount += parseInt(curRes.dealCount)
            if (res.maxMinus > parseFloat(curRes.maxMinus)) res.maxMinus = parseFloat(curRes.maxMinus)
        }

        res.profit = rounded2(res.profit)+' %'
        res.dealCount = Math.ceil(res.dealCount)
        res.maxMinus = rounded2(res.maxMinus)+' %'


    } catch (e) {
        console.log('Ошибка в dataGetBriefcaseInfoNum:  ' +e);

    }

    return res;

}

// Собираем информацию из нескольких  count источников c конца массива
export function dataGetStrategyInfoNum (strategyData, count) {
    const res = {
        profit : 0,
        dealCount : 0,
        maxStartMinus : 0,
        middleDeal : 0,
        plusDeal : 0,
        maxMinus : 0,

    }
    const strategyLength = strategyData.length
    try {
        for (let i = strategyLength-count; i < strategyLength; i++) {
            const curRes = dataGetObjFromArray(strategyData[i].aboutData)
            res.profit += parseFloat(curRes.profit)
            res.dealCount += parseInt(curRes.dealCount)
            if (i === strategyLength-count) res.maxStartMinus = parseFloat(curRes.maxStartMinus)
            res.middleDeal += parseInt(curRes.middleDeal)
            res.plusDeal += parseInt(curRes.plusDeal)
            if (res.maxMinus > parseFloat(curRes.maxMinus)) res.maxMinus = parseFloat(curRes.maxMinus)
        }
        if (count>0) res.middleDeal = Math.ceil(res.middleDeal/count)
        res.profit = rounded2(res.profit)+' %'
        res.dealCount = Math.ceil(res.dealCount)
        res.maxStartMinus = rounded2(res.maxStartMinus)+' %'
        res.plusDeal = Math.ceil(res.plusDeal)
        res.maxMinus = rounded2(res.maxMinus)+' %'


    } catch (e) {
        console.log('Ошибка в dataGetStrategyInfoNum:  ' +e);

    }

     return res;

}
// Расшифровываем данные о портфеле
export function dataGetBriefcaseInfo (aboutData) {
    const res = {}
    try {

        aboutData.map(dc => {

            const a = dc[0]
            switch (a) {
                case 'profit':
                    res.profit = dc[1]
                    break
                case 'dealCount':
                    res.dealCount = dc[1]
                    break
                case 'maxMinus':
                    res.maxMinus = dc[1]
                    break
                default :
                    break
            }

        })
    } catch (e) { console.log('Ошибка в dataGetBriefcaseInfo:  ' +e);}
    return res;

}

// Расшифровываем ЕндПоинты стратегии (данные которые показывают посленюю сделку, посдение созраненные даннные и т.п. )
export function dataGetObjFromArray (data) {


    const res = {}

    if (data)
        if (data.length){
            data.map(dc => {
                res[dc[0]]=dc[1]
            })
        }

    return res;

}

// Собираем вседанные на отображение Стратегии за последние 3 года для главной страницы
export function data3YearsViewBriefcaseData (briefcaseData) {
    const res = []
    if ( briefcaseData) {
        for (let i = 0; i < briefcaseData.length; i++) {
            if (i>briefcaseData.length-4){
                const viewData = dataGetViewOneBriefcaseData(briefcaseData[i])
                res.push(viewData)
            }
        }

    }
    return res
}


export function dataAllViewBriefcaseData (briefcaseData) {


    const res = []

    if (briefcaseData) {

        briefcaseData.map((OneData) => {

            const viewData = dataGetViewOneBriefcaseData(OneData)
            res.push(viewData)
        })

        let YearData = {}
        if (res.length > 2) {
            YearData = dataGetViewCountBriefcaseData(briefcaseData, 3, '3 года')
        }
        if (res.length > 2) {
            res.push(YearData)
        }
        let allYear = {}
        if (res.length > 3) {
            allYear = dataGetViewCountBriefcaseData(briefcaseData, res.length - 1, 'За все время')
        }
        if (res.length > 3) {
            res.push(allYear)
        }
    }

    return res
}
// Собираем вседанные на отображение Стратегии
export function dataAllViewOneData (strategyData) {


    const res = []
    if ( strategyData) {
        strategyData.map((OneData) => {

            const viewData = dataGetViewOneData(OneData)
            res.push(viewData)
        })

        let YearData = {}
        if (res.length > 2) {
            YearData = dataGetViewCountData(strategyData, 3, '3 года')
        }
        if (res.length > 2) {
            res.push(YearData)
        }
        let allYear = {}
        if (res.length > 3) {
            allYear = dataGetViewCountData(strategyData, res.length - 1, 'За все время')
        }
        if (res.length > 3) {
            res.push(allYear)
        }
    }

    return res
}


// Собираем вседанные на отображение Стратегии за последние 3 года для главной страницы
export function data3YearsViewOneData (strategyData) {
    const res = []
    if ( strategyData) {
        for (let i = 0; i < strategyData.length; i++) {
            if (i>strategyData.length-4){
                const viewData = dataGetViewOneData(strategyData[i])
                res.push(viewData)
            }
        }

    }
    return res
}

// Возвращает масссив где берем только n-й элемент для уменьшения данных
export function thinArray(array, n) {
    const result = [];
    for (let i=0; i<array.length; i+=n) result.push(array[i]);
    return result;
}

// Собираем данные за count лет
export function dataGetViewCountData (strategyData, count, yearName) {
    const strategyLength = strategyData.length


    let dealPoints = []
    let ticketData = []
    let profitData = []

    let tmp = 0;

    for (let i = strategyLength-count; i < strategyLength; i++) {
        dealPoints = [...dealPoints,...strategyData[i].dealsData]
        ticketData = [...ticketData,...strategyData[i].ticketData]

            // Вычисляем доходность

        // Получаем значение прибыли конца предыдущего периоду
        tmp = 0
        if (i > strategyLength-count)
            if (profitData.length > 0)
                tmp = rounded2(parseFloat(profitData[profitData.length - 1][1]))


            for (let j = 0; j < strategyData[i].profitData.length; j++) {
                const k = []
                Object.assign(k,strategyData[i].profitData[j])
                k[1] = rounded2(parseFloat(k[1])+tmp)
                profitData.push(k)
            }

    }


    const res = {

        strategyInfo :dataGetStrategyInfoNum(strategyData, count),
        year :  yearName,
        profit : 62.30,
        dealPoints: dealPoints,


        dealData : [
            {
                name: 'Цена акции, руб',
                data: ticketData
            },
            {
                name: 'Прибыль, %',
                data: profitData
            }
        ]
    }
    res.dealData[0].data =  thinArray(res.dealData[0].data,5)




    return res

}

// Собираем данные по портфеою за count лет
export function dataGetViewCountBriefcaseData (briefcaseData, count, yearName) {
    const briefcaseLength = briefcaseData.length


    let dealPoints = []
    let profitData = []

    let tmp = 0;

    for (let i = briefcaseLength-count; i < briefcaseLength; i++) {
        dealPoints = [...dealPoints,...briefcaseData[i].dealsData]

        // Вычисляем доходность

        // Получаем значение прибыли конца предыдущего периоду
        tmp = 0
        if (i > briefcaseLength-count)
            if (profitData.length > 0)
                tmp = rounded2(parseFloat(profitData[profitData.length - 1][1]))


        for (let j = 0; j < briefcaseData[i].profitData.length; j++) {
            const k = []
            Object.assign(k,briefcaseData[i].profitData[j])
            k[1] = rounded2(parseFloat(k[1])+tmp)
            profitData.push(k)
        }

    }


    const res = {

        briefcaseInfo :dataGetBriefcaseInfoNum(briefcaseData, count),
        year :  yearName,
        profit : 62.30,
        dealPoints: dealPoints,


        profitData : [
            {
                name: 'Прибыль, %',
                data: profitData
            }
        ]
    }





    return res

}
// Собираем информацию о сделках для отображение в таблице стратегии

export function dataGetDeals(data){
    const newDealStory = []
    for (let i = 0; i < data.dealPoints.length; i++){

        let deal = {}
        Object.assign(deal, data.dealPoints[i])

        let startPrise = parseFloat(deal.y);
        if (startPrise===0) startPrise = 0.00001

        if (i<data.dealPoints.length-1){
            deal.closeDt = data.dealPoints[i+1].x
            deal.closePr = data.dealPoints[i+1].y
            const profit = 100*(parseFloat(deal.closePr)- startPrise)/startPrise
            deal.isLong? deal.profit = profit : deal.profit = -1*profit
            deal.profit = rounded2(deal.profit)
        }
        // Расчет последней сделки
        else {
            if (data.dealData[0].data.length>0){
                const endPriseData = data.dealData[0].data[data.dealData[0].data.length - 1]
                deal.closeDt = endPriseData[0]
                deal.closePr = endPriseData[1]
                const profit = 100*(parseFloat(deal.closePr)- startPrise)/startPrise
                deal.isLong? deal.profit = profit : deal.profit = -1*profit
                deal.profit = rounded2(deal.profit)

            }
        }

        newDealStory.push(deal)

    }
    return newDealStory
}

// Формируем график изменения приыбли за период
// чтобы потом обьединять с данными других стратегйи
export function dataGetNewProfitData (strategyDataOne,capital) {

    const newProfitData = []

    // Смотрим какой капитал от общего депозита используется в расчете исходя из этого график прибыли меняется
    const capitalX= capital/100
    console.log(capitalX);

    for (let j = 0; j < strategyDataOne.profitData.length; j++) {
        const k = []
        Object.assign(k,strategyDataOne.profitData[j])
        const prof =  rounded2(capitalX*parseFloat(k[1]))
        k[1] = parseFloat(prof)
        newProfitData.push(k)
    }


    return newProfitData
}

// Готовим данные ддля отображения с учетом финансового плеча
export function dataGetViewOneBriefcaseDataLevel (profitData, level, needCapital, capitalParam) {


    const res = [
        {
            name: 'Прибыль, %',
            data: []
        }
    ]

    // Сначала сделаем расчет с учетом плеча
    for (let j = 0; j < profitData.data.length; j++){
        const crProfit = profitData.data[j].slice(0)
        crProfit[1] = rounded2(level*parseFloat(crProfit[1]))
        res[0].data.push(crProfit)
    }
    // Далее расчетом с капитализацией
    console.log('start');
    let capitalLevel = 1
    let addProfit = 0
    let startProfit = 0
    // console.log('startProfit  '+startProfit);

    if (needCapital){
        for (let j = 0; j < res[0].data.length; j++){

            const crProfit = res[0].data[j]

            if (crProfit[1] - startProfit >= capitalParam){
                startProfit += parseFloat(capitalParam)

                addProfit += capitalParam*capitalLevel
                capitalLevel += capitalLevel*capitalParam/100
                // console.log(crProfit[0])
                // console.log('capitalLevel  '+capitalLevel)
                // console.log('addProfit  ' + addProfit)
                // console.log('startProfit  ' + startProfit)

            }

            let rise = parseFloat(crProfit[1])-startProfit
            const newProfit = rounded2(addProfit+ capitalLevel*rise)
            // console.log(crProfit[0])
            // console.log('rise  '+rise)
            // console.log('newProfit  ' + newProfit)

            crProfit[1] = newProfit




        }

    }

    return res
}

// Данные на отображение за один год по портфелю
export function dataGetViewOneBriefcaseData (briefcaseDataOne) {
    const res = {


        briefcaseInfo :dataGetBriefcaseInfo(briefcaseDataOne.aboutData),
        year :  briefcaseDataOne.year,
        profit : 62.30,


        profitData : [
            {
                name: 'Прибыль, %',
                data: briefcaseDataOne.profitData
            }
        ]
    }

    return res
}

// Данные на отображение за один год по стратегии
export function dataGetViewOneData (strategyDataOne) {

    const res = {

        strategyInfo :dataGetObjFromArray(strategyDataOne.aboutData),
        year :  strategyDataOne.year,
        profit : 62.30,
        dealPoints : strategyDataOne.dealsData,

        dealData : [
        {
            name: 'Цена акции, руб',
            data: strategyDataOne.ticketData
        },
        {
            name: 'Прибыль, %',
            data: strategyDataOne.profitData
        }
    ]
    }

    return res
}

export function rounded2(number){
    return Math.round(parseFloat(number) * 10) / 10;
}

// Расчет параметров Портфеля
export function dataCalcBriefcaseParam (briefcaseData) {


    const data = {
        profit : 0,
        dealCount : briefcaseData.dealsData.length,
        maxMinus : 0
    }

    briefcaseData.profitData.length >0 ? data.profit = briefcaseData.profitData[briefcaseData.profitData.length-1][1] : data.profit ='Нет данных'


    let crMax = 0
    let predProfit = 0
    briefcaseData.profitData.map(pr => {
        // Вычисляем макс просадку

        if (crMax - pr[1] <0) crMax = pr[1]
        if (crMax - pr[1] > data.maxMinus) data.maxMinus = crMax - pr[1]


        // Вычисляем кол-вол положительных сделок
        if (pr[1]>predProfit) data.plusDeal+=1;
        predProfit = pr[1]

    })

    if (data.maxMinus>0) data.maxMinus= -1*data.maxMinus

    let res = 'profit#'+rounded2(data.profit)+' %*\n'
    res += 'dealCount#'+data.dealCount+'*\n'
    res += 'maxMinus#'+rounded2(data.maxMinus)+' %'


    return res
}
export function dataToDelphiDataStr(dt){
    let res = ''
    const dtDtr = dt.toString()

    try {
        res = dtDtr.slice(8, 10) + '.'+ dtDtr.slice(5, 7)+'.'+dtDtr.slice(0, 4)+' '+dtDtr.slice(11, 20)
    } catch {res = '01.01.2023 10:00:00'}
    console.log(res);

    return res
}
// Расчет ендпоинтов стратегии
export function dataCalcStrategyPoints (strategyData) {

    const dataInfo = dataGetObjFromArray(strategyData?.aboutData)
    console.log(dataInfo);
    const endTicket = strategyData?.ticketData.at(-1);
    const endDeal = strategyData?.dealsData.at(-1);
    const endProfit = strategyData?.profitData.at(-1);


    let nowProfit = endProfit[1] ? endProfit[1] - dataInfo.addProfit : 0

    const data = {
        nowProfit : nowProfit,
        profit : dataInfo?.profit,
        dealCount : dataInfo?.dealCount,//strategyData.dealsData.length,
        dealType : endDeal? endDeal.isLong : false ,
        dateDealStart : endDeal? endDeal.x : 'no' ,
        priseDealStart : endDeal? endDeal.y : 'no' ,
        curPrise : endTicket[1]? endTicket[1] : 'no',
        marketTicket : 'NO',
        endTicketDataDate : endTicket[0]? dataToDelphiDataStr(endTicket[0]) : '01.01.2023 10:00:00'
    }



    let res = 'nowProfit#'+rounded2(data.nowProfit)+' %*\n'
    res += 'profit#'+rounded2(data.profit)+' %*\n'
    res += 'dealCount#'+data.dealCount+'*\ndealType#'
    res += data.dealType? 'true' : 'false'
    res += '*\n'
    res += 'dateDealStart#'+data.dateDealStart+'*\n'
    res += 'priseDealStart#'+data.priseDealStart+'*\n'
    res += 'curPrise#'+data.curPrise+'*\n'
    res += 'marketTicket#RF*\n'
    res += 'endTicketDataDate#'+data.endTicketDataDate+'*\n'
    return res
}

// Расчет ендпоинтов портфеля
export function dataCalcBriefcasePoints (briefcaseAboutData) {
    let res = 'nowProfit#'+parseFloat(briefcaseAboutData[0][1])+' %*\n'
    res += 'dealCount#'+briefcaseAboutData[1][1]+'*\n'
    res += 'maxMinus#'+parseFloat(briefcaseAboutData[2][1])+' %*\n'
    res += 'finLevel#1*\n'
    return res
}
// Расчет параметров данных стратегии
export function dataCalcStrategyDataParam (strategyData, addProfit) {


    const data = {
        profit        : 0,
        dealCount     : strategyData.dealsData.length,
        maxStartMinus : 0,
        middleDeal    : 0,
        plusDeal      : 0,
        maxMinus      : 0
    }

    data.maxStartMinus = Math.min(...strategyData.profitData.map(o => o[1]))
    strategyData.profitData.length >0 ? data.profit = strategyData.profitData[strategyData.profitData.length-1][1] : data.profit ='Нет данных'


    // Считаем кол-во дней сколько торговали и потом среднюю длит сделки
    let dayCount = 0
    let predDay = 0
    strategyData.ticketData.map(pr => {

        const a = new Date(pr[0]).getDate()
        if (predDay!==a) {
            dayCount+=1
            predDay=a
        }
    })

    if (data.dealCount>0) data.middleDeal = dayCount/data.dealCount

    let crMax = 0
    let predProfit = 0
    strategyData.profitData.map(pr => {
        // Вычисляем макс просадку

        if (crMax - pr[1] <0) crMax = pr[1]
        if (crMax - pr[1] > data.maxMinus) data.maxMinus = crMax - pr[1]


        // Вычисляем кол-вол положительных сделок
        if (pr[1]>predProfit) data.plusDeal+=1;
        predProfit = pr[1]

    })

    if (data.maxMinus>0) data.maxMinus= -1*data.maxMinus
    if (data.middleDeal<1) data.middleDeal = 1
    let res = 'profit#'+rounded2(data.profit)+' %*\n'
    res += 'dealCount#'+data.dealCount+'*\n'
    res += 'maxStartMinus#'+rounded2(data.maxStartMinus)+' %*\n'
    res += 'middleDeal#'+Math.ceil(data.middleDeal)+'*\n'
    res += 'plusDeal#'+Math.ceil(data.plusDeal/data.middleDeal)+'*\n'
    res += 'maxMinus#'+rounded2(data.maxMinus)+' %*\n'
    res += 'addProfit#'+rounded2(addProfit)+''


    return res
}

// Разбираем строку на массив стратегий
export function dataGetBriefcaseParam (dataIn) {

    const data = dataIn.split('*');
    const res = []
    data.map(dc => {


        dc = dc.split('\n').join('')
        dc = dc.split('#')
        if (dc !== '') {
            const add = {}
            add.strategy = dc[0]
            add.capital = dc[1]
            if ((add.strategy!=='') && (add.capital))  res.push(add)
        }
        return 'ok'
    })
    return res
}
// график цен в строку
export function dataBriefcaseParamToStr (data) {

    let res = ''
    try {
        data.map(dc => {
            res += dc.strategy+'#'+dc.capital+'*\n'
            return 'ok'
        })
    }
    catch (e) {
        console.log('Ошибка в dataBriefcaseParamToStr  '+e)

    }


    return res.slice(0, -2)
}

export function  imageSrc  (strategyName)  {
    let res = '/assets/str/no_foto.jpg'
    if (strategyName)
        switch (strategyName) {
            // Акции РФ
            case  'Сбербанк'    : res = '/assets/str/sber_rf.jpg'; break
            case  'Сбербанк-п'  : res = '/assets/str/sber_p_rf.jpg'; break
            case  'Газпром'     : res = '/assets/str/gazp_rf.jpg'; break
            case  'Лукойл'      : res = '/assets/str/luk_rf.jpg'; break
            case  'Роснефть'    : res = '/assets/str/rosn_rf.jpg'; break
            case  'Аэрофлот'    : res = '/assets/str/aflt_rf.jpg'; break
            // Акции США
            case  'ExxonMobil' : res = '/assets/str/exmob_usa.jpg'; break
            case  'Tesla'      : res = '/assets/str/tesla_usa.jpg'; break
            case  'Chevron'    : res = '/assets/str/chevron_usa.jpg'; break
            case  'Banc of America' : res = '/assets/str/bac_usa.jpg'; break
            case  'Apple'      : res = '/assets/str/apple_usa.jpg'; break
            case  'ALCOA'      : res = '/assets/str/alcoa_usa.jpg'; break

            // Портфели
            case  'САЛРГ' : res = '/assets/str/a_g_s_l_r_rf.jpg'; break
            case  'СГ' : res = '/assets/str/luk_sb_rf.jpg'; break
            case  'ССА' : res = '/assets/str/sb_ae_rf.jpg'; break
            case  'СГА' : res = '/assets/str/sbp_gaz_ae_rf.jpg'; break

            default: break;

        }
    return res
}
