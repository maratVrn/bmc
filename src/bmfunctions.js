import ChartParam from "./store/chartParam";
const ru = require("apexcharts/dist/locales/ru.json")

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
    if (data)
        if (data.length){
            data.map(dc => {
                res += dc[0]+'#'+dc[1]+'*\n'
                return 'ok'
            })
        }



    return res.slice(0, -2)
}

// Сделки в строку
export function dealsToStr (dealsData) {

    let res = ''
    dealsData.map(dc => {
        res += dc.x+'#'+dc.y+'#'
        dc.isLong ? res +='1' :  res +='0'
            res += '*\n'
        return 'ok'
    })


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

    aboutData.map(dc => {

        const a = dc[0]
        switch(a) {
            case 'profit':  res.profit = dc[1]
                break
            case 'dealCount':  res.dealCount = dc[1]
                break
            case 'maxMinus':  res.maxMinus = dc[1]
                break
            default :
                break
        }

    })
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

// Формируем график изменения приыбли за период - для каждого дня находим значения (сейчас линейно)
// чтобы потом обьединять с данными других стратегйи
export function dataGetNewProfitData (strategyDataOne,capital) {

    const newProfitData = []
    let predDay = 0
    let predProfit = 0
    let start_x = 0
    // Смотрим какой капитал от общего депозита используется в расчете исходя из этого график прибыли меняется
    const capitalX= rounded2(capital/100)


    for (let j = 0; j < strategyDataOne.ticketData.length; j++) {
        const k = []

        Object.assign(k,strategyDataOne.ticketData[j])

        const day = new Date(k[0]).getDate()
        if (j===0) predDay = day

        if (predDay !== day){

            Object.assign(k,strategyDataOne.ticketData[j-1])
            const date = new Date(k[0]).getDate()
            const month = new Date(k[0]).getMonth()
            let prof = 0
            if (newProfitData.length>0) prof = newProfitData[newProfitData.length-1][1] // Чтобы полсдение элементы были не нулевыми
            // Если нашлись данные прибыли на этот день то заполняем предыдущие данныме по профиту
             for (let i = 0; i < strategyDataOne.profitData.length; i++){

                 const crProf = strategyDataOne.profitData[i]
                 const dateProf = new Date(crProf[0]).getDate()
                 const monthProf = new Date(crProf[0]).getMonth()



                 if ((date === dateProf) && (month === monthProf)){

                     prof =  capitalX*crProf[1]

                     //  Заполняем предыдущие значения по равномерному изменению
                     // TODO: ВАЖНО сейчас график изменения прибыли линейный, идеально если он привязан к изменению цену
                     let dayCount = newProfitData.length - start_x
                     if (dayCount<1) dayCount = 1
                     let profAdd = (parseFloat(prof)-predProfit)/dayCount

                     for (let x = start_x+1; x < newProfitData.length; x++){

                         const a = newProfitData[x]
                         const curProf = predProfit + profAdd*(x-start_x)

                         a[1] = rounded2( curProf)
                         newProfitData[x] = a
                     }
                     start_x = newProfitData.length
                     predProfit = parseFloat(prof)

                 }


             }

            k[1] = parseFloat(prof)


            newProfitData.push(k)
            predDay = day
        }
    }

    // Заполняем данные за посоледний профит
    if (strategyDataOne.profitData.length>0){
        const crProf = strategyDataOne.profitData[strategyDataOne.profitData.length-1]
        const prof =  capitalX*crProf[1]
        let dayCount = newProfitData.length - start_x
        if (dayCount<1) dayCount = 1
        let profAdd = (parseFloat(prof)-predProfit)/dayCount

        for (let x = start_x+1; x < newProfitData.length; x++){

            const a = newProfitData[x]
            const curProf = predProfit + profAdd*(x-start_x)

            a[1] = rounded2( curProf)
            newProfitData[x] = a
        }
        // Добавляем последний день
        const k = []

        Object.assign(k,crProf)
        k[1]=rounded2(parseFloat(capitalX*crProf[1]))
        newProfitData.push(k)


    }


    return newProfitData
}

// Формируем график изменения приыбли за период - для каждого дня находим значения (сейчас линейно)
// чтобы потом обьединять с данными других стратегйи
export function dataGetNewProfitData2 (strategyDataOne,capital) {

    const newProfitData = []
    let predDay = 0              // Предудыщий день используем чтобы понять когда произошла смена дня для расчета прибыль на конец дня
    let closePrisePredDay = 0;   // цена закрытия перудыдущего дня для расчета изменения % цены за день

    let dealType = 'none' //Типа текуще сделки - для расчета кривой прибыли

    // Смотрим какой капитал от общего депозита используется в расчете исходя из этого график прибыли меняется
    const capitalX= rounded2(capital/100)

    ;
    console.log(strategyDataOne.dealsData);

    for (let j = 0; j < strategyDataOne.ticketData.length; j++) {

        const day = new Date(strategyDataOne.ticketData[j][0]).getDate()
        if (j===0) { predDay = day; closePrisePredDay = parseFloat(strategyDataOne.ticketData[j][1])}

        if ((predDay !== day) && (j>0)) {
            const crRes = []
            Object.assign(crRes,strategyDataOne.ticketData[j-1])
            const endPriseCurDay = parseFloat(crRes[1])
            if (closePrisePredDay===0) closePrisePredDay = 0.001 // Фич
            const dayProfit = 100*((endPriseCurDay-closePrisePredDay)/closePrisePredDay)

            crRes[1] = rounded2(dayProfit);
            crRes[2] = closePrisePredDay
            crRes[3] = endPriseCurDay


            closePrisePredDay = endPriseCurDay

            // const date = new Date(k[0]).getDate()
            // const month = new Date(k[0]).getMonth()

            for (let i = 0; i < strategyDataOne.dealsData.length; i++){
                // TODO: Доделать алгоритм расчета прибыли - т.е. найти сделку и относительно нее перерасчитать прибыль

            }



            newProfitData.push(crRes)
            predDay = day
        }
    }


    return newProfitData
}

// Готовим данные ддля отображения с учетом финансового плеча
export function dataGetViewOneBriefcaseDataLevel (profitData, level, needCapital) {

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
    let capitalLevel = 1
    let capitalParam = 10 // насколько в % должна вырасти прибыль чтобы учитывать капитализацию
    let startProfit = 0
    if (needCapital){
        for (let j = 0; j < res[0].data.length; j++){

            const crProfit = res[0].data[j]
            if (j===0) startProfit = crProfit[1]
            if (crProfit[1] - startProfit >= capitalParam){
                capitalLevel = capitalLevel*(1+capitalParam/100)
                crProfit[1] = rounded2(capitalLevel*parseFloat(crProfit[1]))
                startProfit = crProfit[1]
            } else crProfit[1] = rounded2(capitalLevel*parseFloat(crProfit[1]))

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

// Расчет параметров стратегии
export function dataCalcStrategyParam (strategyData) {


    const data = {
        profit : 0,
        dealCount : strategyData.dealsData.length,
        maxStartMinus : 0,
        middleDeal : 0,
        plusDeal : 0,
        maxMinus : 0
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

    let res = 'profit#'+rounded2(data.profit)+' %*\n'
    res += 'dealCount#'+data.dealCount+'*\n'
    res += 'maxStartMinus#'+rounded2(data.maxStartMinus)+' %*\n'
    res += 'middleDeal#'+Math.ceil(data.middleDeal)+'*\n'
    res += 'plusDeal#'+Math.ceil(data.plusDeal)+'*\n'
    res += 'maxMinus#'+rounded2(data.maxMinus)+' %'


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
