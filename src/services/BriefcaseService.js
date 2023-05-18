import $api from '../http/index'
export default class BriefcaseService{

    static async saveBriefcase(briefcase):Promise{
        return $api.post('/saveBriefcase', {briefcase})
    }

    static async saveBriefcaseData(briefcaseData):Promise{
        return $api.post('/saveBriefcaseData', {briefcaseData})
    }

    static async newBriefcase(briefcase):Promise{
        return $api.post('/newBriefcase', {briefcase})
    }


    static async newBriefcaseData(briefcaseData):Promise{
        return $api.post('/newBriefcaseData', {briefcaseData})
    }

    // TODO: Сделать 2 разных запроса для портфелей общих и чисто пользовтаельских
    static async getAllBriefcase():Promise{
        return $api.get('/allBriefcase')
    }

    // TODO: Проверить как работает - передавать нужные параметры
    static async getBriefcaseData(briefcaseID):Promise{

        return $api.get(`/briefcaseData/${briefcaseID}`)
    }

    static async deleteBriefcase(stdId):Promise{
        return $api.post('/deleteBriefcase', {stdId})
    }

    static async deleteBriefcaseData(stdId):Promise{
        return $api.post('/deleteBriefcaseData', {stdId})
    }

}
