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
    setStrategyIn(strategyIn){
        this.selectedOne.strategyIn = strategyIn
    }

    async getBestBriefCaseData(){
        try {


            this.setBestBriefcaseI(-1)

            let currProfit = 0
            for (let i = 0; i < this.allSBriefcaseAdmin.length; i++) {
                if (this.allSBriefcaseAdmin[i].aboutData.currProfit){

                    const profit = this.allSBriefcaseAdmin[i].aboutData.currProfit
                    if (currProfit < parseFloat(profit)){
                            currProfit = parseFloat(profit)
                            this.setBestBriefcaseI(i)
                    }
                }
            }

            if (this.bestBriefcaseI>-1){

                const briefcase = this.allSBriefcaseAdmin[this.bestBriefcaseI]
                this.setSelectedOne(briefcase)
                if (briefcase.id) this.getBriefcaseData(briefcase.id).then(()=>{
                    //
                    // console.log(this.selectedOne?.allBriefcaseData);
                })

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
   //
   //
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
   //
   //  setSelectedStrategyDataOne(oneData){
   //      this.selectedStrategyDataOne = oneData
   //
   //  }
   //
   //  async saveBriefcaseData(briefcaseData){
   //      try {
   //          this.setErrorMessage(null)
   //          const response = await BriefcaseService.saveBriefcaseData(briefcaseData)
   //          return response
   //      } catch (e) {
   //          this.setErrorMessage(e.response?.data?.message)
   //          console.log(e.response?.data?.message);
   //      }
   //  }

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
        console.log('---tut----');
        console.log(this.selectedOne?.briefcaseData);

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



    async  getBriefcaseData(briefcaseID){
        //TODO: Делать проверку - если данные были загружены НЕ грузить все трафик умрет

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
