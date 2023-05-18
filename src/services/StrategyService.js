import $api from '../http/index'
export default class StrategyService{

    static async saveStrategy(strategy):Promise{
        return $api.post('/saveStrategy', {strategy})
    }

    static async saveStrategyData(strategyData):Promise{
        return $api.post('/saveStrategyData', {strategyData})
    }

    static async newStrategy(name,points):Promise{
        return $api.post('/newStrategy', {name,points})
    }


    static async newStrategyData(strategyData):Promise{
        return $api.post('/newStrategyData', {strategyData})
    }


    static async getAllStrategy():Promise{
        return $api.get('/allStrategy')
    }

    static async getStrategyData(strategyName):Promise{

        return $api.get(`/strategyData/${strategyName}`)
    }

    static async deleteStrategy(stdId):Promise{
        return $api.post('/deleteStrategy', {stdId})
    }

    static async deleteStrategyData(stdId):Promise{
        return $api.post('/deleteStrategyData', {stdId})
    }

}
