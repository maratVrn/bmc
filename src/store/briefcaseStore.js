import {makeAutoObservable} from "mobx";
import BriefcaseService from "../services/BriefcaseService";
import StrategyService from "../services/StrategyService";
import {dataGetObjFromArray} from "../bmfunctions";

export default class BriefcaseStore {
    allSBriefcaseAdmin = []   // Список общедоступных портфелей
    // allSBriefcaseUser  = []   // Список портфелей пользователя
    errorMessage = null
    isNew = false
    bestBriefcaseI = -1
    selectedOne = {}              // Выбранный портфель
    selectedBriefcaseDataOne = {} // Данные по выбранному портфелю

    constructor() {
        makeAutoObservable((this))
    }

    setBestBriefcaseI(bestBriefcaseI){
        this.bestBriefcaseI = bestBriefcaseI
    }

     setNewName(name){
        this.selectedOne.name = name
    }

    setNewPoints(points){
        this.selectedOne.points = points
    }
    setStrategyIn(strategyIn){
        this.selectedOne.strategyIn = strategyIn
    }

    async getBestBriefCaseData(){
        try {

            for (let i = 0; i < this.allSBriefcaseAdmin.length; i++) {
                const aboutData = dataGetObjFromArray(this.allSBriefcaseAdmin[i].aboutData)
                this.allSBriefcaseAdmin[i].currProfit = 1
                this.allSBriefcaseAdmin[i].dealCount  = 0
                if (aboutData.nowProfit)  this.allSBriefcaseAdmin[i].currProfit = parseFloat(aboutData.nowProfit)
                if (aboutData.dealCount)  this.allSBriefcaseAdmin[i].dealCount  = parseFloat(aboutData.dealCount)

            }

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async deleteSelectedData(){

        try {
            this.setErrorMessage(null)
            let resStatus = undefined
            await BriefcaseService.deleteBriefcaseData(this.selectedOne.id).then(response => {
                resStatus = response.status

            })
            return resStatus
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }


    async deleteSelected(){
        try {
            this.setErrorMessage(null)
            // Сначала удаляем данные по выбранному портфелю
             await this.deleteSelectedData().then(response=>{

                if (response === 200) {
                    BriefcaseService.deleteBriefcase(this.selectedOne.id).then(response => {
                            if (response.status===200) {

                                const idx = this.allSBriefcaseAdmin.indexOf(this.selectedOne)

                                if ((idx<this.allSBriefcaseAdmin.length) && (idx>-1)) {
                                    this.allSBriefcaseAdmin.splice(idx, 1)}
                                this.setSelectedOne(null)
                                if (this.allSBriefcaseAdmin.length>0) this.setSelectedOne(this.allSBriefcaseAdmin[0])

                            }
                    })
                }
            })
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }


    setIsNew(isNew){
        this.isNew = isNew
    }


    setAllAdminBriefCase(allBriefCase){
        this.allSBriefcaseAdmin = allBriefCase
    }

    addBriefcase(newBriefcase){
        this.allSBriefcaseAdmin.push(newBriefcase)
    }

    setErrorMessage(errorMessage){
        this.errorMessage = errorMessage
    }
    setSelectedOne(oneData){
        this.selectedOne = oneData
    }

   async saveBriefcase(briefcase){
        try {
            this.setErrorMessage(null)
            const response = await BriefcaseService.saveBriefcase(briefcase)
            return response
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async newBriefcase(briefcase){
        try {
            this.setErrorMessage(null)
            const response = await BriefcaseService.newBriefcase(briefcase)


            const newBriefcase = response?.data?.newBriefcase
            this.addBriefcase(newBriefcase)
            return newBriefcase

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }


    addBriefcaseData(briefcaseData){
         this.selectedOne?.briefcaseData.push(briefcaseData)
    }


    async newBriefcaseData(briefcaseData){
        try {

            this.setErrorMessage(null)
            const response = await BriefcaseService.newBriefcaseData(briefcaseData)
            const newId = response?.data
            briefcaseData.id = newId
              return newId

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)

        }
    }




    async  getAllAdminBriefcase(){
        try{
            // TODO: Переделать потмо под админа запрос
            const response = await BriefcaseService.getAllBriefcase()
            this.setAllAdminBriefCase(response.data)
        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    getBriefcaseByID(id){
        let res = {}
        if (this.allSBriefcaseAdmin.length)
            for (let i = 0; i < this.allSBriefcaseAdmin.length; i++) {
                if (this.allSBriefcaseAdmin[i].id === id){
                    res = this.allSBriefcaseAdmin[i]
                    break
                }
            }
        return res
    }

    async  getBriefcaseData(briefcaseID){
        try{

            let needI = -1
            if (this.allSBriefcaseAdmin.length)
                for (let i = 0; i < this.allSBriefcaseAdmin.length; i++) {
                    if (this.allSBriefcaseAdmin[i].id === briefcaseID){
                        needI = i
                        break
                    }
                }
            // Делаем проверку - если данные были загружены НЕ грузить
            if (!this.allSBriefcaseAdmin[needI].allBriefcaseData){
                const response = await BriefcaseService.getBriefcaseData(briefcaseID)
                this.setBriefcaseData(response.data, briefcaseID)
            }

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e)
        }
    }

    setBriefcaseData(allBriefcaseData, briefcaseId){
        if (this.allSBriefcaseAdmin.length)
            for (let i = 0; i < this.allSBriefcaseAdmin.length; i++) {
                if (this.allSBriefcaseAdmin[i].id === briefcaseId){
                    this.allSBriefcaseAdmin[i].allBriefcaseData = []
                    this.allSBriefcaseAdmin[i].allBriefcaseData = allBriefcaseData
                    break
                }
            }
    }



}
