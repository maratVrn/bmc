import $api from '../http/index'
export default class AuthService{
    static async login(email, password):Promise{
        return $api.post('/login', {email, password})
    }

    static async sendEmailConfirm(email):Promise{
        return $api.post('/sendemailconfirm', {email})
    }

    static async saveUser(user):Promise{
        return $api.post('/saveUser', {user})
    }

    static async registration(email, password):Promise{
        return $api.post('/registration', {email, password})
    }

    static async sendTelegramQuestion(message, email):Promise{
        return $api.post('/sendtelquestion', {message, email})
    }

    static async logout(refreshToken):Promise{
        return $api.post('/logout',{refreshToken})
    }


    static async getUsers():Promise{
        return $api.get('/users')
    }



}
