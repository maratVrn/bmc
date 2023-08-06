import {makeAutoObservable} from "mobx";
import StrategyService from "../services/StrategyService";
import {dataGetObjFromArray} from "../bmfunctions";

export default class StrategyStore {
    allStrategy      = []   // Список всех стратегий
    allStrategyRF    = []   // Список стратегий РФ
    allStrategyUSA   = []   // Список стратегий США
    bestStrategyRF   = []   // Список лучших стратегий РФ
    bestStrategyUSA  = []   // Список лучших стратегий США
    errorMessage = null
    isNew = false
    selectedOne = {}
    selectedStrategyDataOne = {}

    constructor() {
        makeAutoObservable((this))
    }

    setNewName(name){
        this.selectedOne.name = name
    }
    setNewPoints(points){
        this.selectedOne.points = points
    }


    async deleteSelectedData(){

        try {
            this.setErrorMessage(null)
            const response = await StrategyService.deleteStrategyData(this.selectedStrategyDataOne.id).then(response => {

                if (response.status===200) {
                    const idx = this.selectedOne.strategyData.indexOf(this.selectedStrategyDataOne)
                    if ((idx<this.selectedOne.strategyData.length) && (idx>-1)) {
                        this.selectedOne.strategyData.splice(idx, 1)}
                    this.setSelectedStrategyDataOne(null)
                    if (this.selectedOne.strategyData.length>0) this.setSelectedStrategyDataOne(this.selectedOne.strategyData[0])

                }
            })

            return response
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }


    async deleteSelected(){

        try {
            this.setErrorMessage(null)
            const response = await StrategyService.deleteStrategy(this.selectedOne).then(response => {

                if (response.status===200) {

                    const idx = this.allStrategy.indexOf(this.selectedOne)
                    console.log(idx);
                    if ((idx<this.allStrategy.length) && (idx>-1)) {
                    this.allStrategy.splice(idx, 1)}
                    this.setSelectedOne(null)
                    if (this.allStrategy.length>0) this.setSelectedOne(this.allStrategy[0])

                }
            })

            return response
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    getPoints(strategyName){
        let res = {}
        for (let i = 0; i < this.allStrategy.length; i++) {
            if (this.allStrategy[i].name === strategyName) {
                res = this.allStrategy[i].points
                break
            }
        }
        return res
    }

    setIsNew(isNew){
        this.isNew = isNew
    }


    setAllStrategy(allStrategy){
        this.allStrategy = allStrategy

    }



    addStrategy(strategy){
        this.allStrategy.push(strategy)
    }

    addStrategyData(strategyData){
        this.selectedOne?.strategyData.push(strategyData)

    }

    setErrorMessage(errorMessage){
        this.errorMessage = errorMessage
    }
    setSelectedOne(oneData){
        this.selectedOne = oneData
    }

    setSelectedStrategyDataOne(oneData){
        this.selectedStrategyDataOne = oneData

    }

    async saveStrategyData(strategyData){
        try {
            this.setErrorMessage(null)
            const response = await StrategyService.saveStrategyData(strategyData)
            return response
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

   async saveStrategy(strategy){
        try {
            this.setErrorMessage(null)
            const response = await StrategyService.saveStrategy(strategy)
            return response
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async newStrategy(name,points){
        try {
            this.setErrorMessage(null)
            const response = await StrategyService.newStrategy(name,points)
            // console.log('response  '+ JSON.stringify(response));

            const newStrategy = response?.data?.strategy
            this.addStrategy(newStrategy)
            return newStrategy

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async getBestStrategyData(){
        try {
            // Сортируем на акции РФ и США
            for (let i = 0; i < this.allStrategy.length; i++) {
                const dealData = dataGetObjFromArray(this.allStrategy[i].points)
                this.allStrategy[i].currProfit = 1
                this.allStrategy[i].dealCount  = 0
                if (dealData.profit)  this.allStrategy[i].currProfit = parseFloat(dealData.profit)
                if (dealData.dealCount)  this.allStrategy[i].dealCount  = parseFloat(dealData.dealCount)
                if (dealData.marketTicket){
                    if (dealData.marketTicket === 'USA') this.allStrategyUSA.push(this.allStrategy[i])
                    if (dealData.marketTicket === 'RF')  this.allStrategyRF.push(this.allStrategy[i])
                }

            }
            this.allStrategyUSA.sort((a, b) => a.currProfit > b.currProfit ? -1 : 1)
            this.allStrategyRF.sort((a, b) => a.currProfit > b.currProfit ? -1 : 1)

            // Соберем массив на отображение нужного коллличества лучших стратегий на главной странице
            const showStrategyCount = 4
            for (let i = 0; i < showStrategyCount; i++){
                if (i<this.allStrategyRF.length) this.bestStrategyRF.push(this.allStrategyRF[i])
                if (i<this.allStrategyUSA.length) this.bestStrategyUSA.push(this.allStrategyUSA[i])
            }


        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async newStrategyData(strategyData){
        try {
            this.setErrorMessage(null)
            const response = await StrategyService.newStrategyData(strategyData)
            const newId = response?.data
            strategyData.id = newId
            if (newId) this.addStrategyData(strategyData)
            return newId

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)

        }
    }




    async  getAllStrategy(){
        try{
            const response = await StrategyService.getAllStrategy()
            this.setAllStrategy(response.data)
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    getStrategyDataByName(strategyName){
        let res = {}


        if (this.allStrategy.length)
                for (let i = 0; i < this.allStrategy.length; i++) {
                    if (this.allStrategy[i].name === strategyName){
                        res = this.allStrategy[i].strategyData
                        break
                    }
                }

        return res
    }

    getStrategyByID(id){
        let res = {}
        if (this.allStrategy.length)
            for (let i = 0; i < this.allStrategy.length; i++) {
                if (this.allStrategy[i].id === id){
                    res = this.allStrategy[i]
                    break
                }
            }
        return res
    }

    // Загружаем данные по списку стратегий - используется для расчета портфеля
    async  getStrategyDataByArray(strategyArray, idx){
        for (let i = idx; i < strategyArray.length; i++){
            const strategyName = strategyArray[i].strategy
            await this.getStrategyData(strategyName).then(() => {
            })
        }
    }
    // Загружаем данные для стратегии - тикеты, сделки, профиты и ендпоинты, для каждого года отдельный наобор данных
    async  getStrategyData(strategyName){
        try{
            let needI = -1
            if (this.allStrategy.length)
                for (let i = 0; i < this.allStrategy.length; i++) {
                    if (this.allStrategy[i].name === strategyName){
                        // this.setSelectedOne(this.allStrategy[i]) // Для корректной работы внутренних механизмов расчеа портфеля
                        needI = i
                        break
                    }
                }
            // Делаем проверку - если данные были загружены НЕ грузить
            if (needI>-1)
                if (!this.allStrategy[needI].strategyData){
                    const response = await StrategyService.getStrategyData(strategyName)
                    this.setStrategyData(response.data, strategyName)
                }

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    setStrategyData (strategyData, strategyName) {

        if (this.allStrategy.length)
                for (let i = 0; i < this.allStrategy.length; i++) {
                    if (this.allStrategy[i].name === strategyName){
                        this.allStrategy[i].strategyData = []
                        this.allStrategy[i].strategyData = strategyData
                        break
                    }
                }

    }



}
