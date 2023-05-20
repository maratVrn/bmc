import {makeAutoObservable} from "mobx";
import StrategyService from "../services/StrategyService";
import {dataGetObjFromArray} from "../bmfunctions";

export default class StrategyStore {
    allStrategy = []   // Список стратегий
    errorMessage = null
    isNew = false
    selectedOne = {}
    bestStrategyI = -1
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

    setBestStrategyI(bestStrategyI){
        this.bestStrategyI = bestStrategyI
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

            this.setBestStrategyI(-1)

            let currProfit = 0
            for (let i = 0; i < this.allStrategy.length; i++) {
                const dealData = dataGetObjFromArray(this.allStrategy[i].points)
                if (dealData.nowProfit) {

                    if (currProfit < parseFloat(dealData.nowProfit)){
                        currProfit = parseFloat(dealData.nowProfit)
                        this.setBestStrategyI(i)
                    }
                }
            }
            if (this.bestStrategyI>-1){
                const strategy = this.allStrategy[this.bestStrategyI]


                if (strategy.name) this.getStrategyData(strategy.name).then()
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
