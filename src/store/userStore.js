import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";



export default class UserStore {
    user = {}
    isAuth = false
    errorMessage = null

    constructor() {
        makeAutoObservable((this))
    }

    setAuth(isAuth){
        this.isAuth = isAuth
    }

    setUser(user){
        this.user = user

    }

    setErrorMessage(errorMessage){
        this.errorMessage = errorMessage
    }


    async login(email, password){
        try {
            this.setErrorMessage(null)
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response?.data?.accessToken )
            localStorage.setItem('refreshToken', response?.data?.refreshToken )
            this.setAuth(true)
            const user = response?.data?.user

            this.setUser(user)

        } catch (e) {
            const errorMessage = e.message

            this.setErrorMessage(null)
            if (errorMessage) {
                if (errorMessage ==='Network Error') {this.setErrorMessage('Нет соединения с сервером')}
                else  this.setErrorMessage(e?.response?.data?.message)

            } {this.setErrorMessage('Непредвиденная ошибка')}
             console.log(e.message)

        }
    }

    async saveUser(user){
        try {

            const response = await AuthService.saveUser(user)

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async sendEmailConfirm(email){
        try {
            const response = await AuthService.sendEmailConfirm(email)

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email, password){
        try {
            this.setErrorMessage(null)
            // console.log('tut');
            // console.log('email  '+email);
            // console.log('password  '+password);

            const response = await AuthService.registration(email, password)
            console.log('response  '+ JSON.stringify(response));
            localStorage.setItem('token', response?.data?.accessToken )
            localStorage.setItem('refreshToken', response?.data?.refreshToken )
            this.setAuth(true)
            const user = response?.data?.user
            this.setUser(user)

        } catch (e) {
            this.setErrorMessage(e.response?.data?.message)
            console.log(e.response?.data?.message);
        }
    }

    async logout(){
        try {
             const response = await AuthService.logout()

             localStorage.removeItem('token' )
             localStorage.removeItem('refreshToken' )
             this.setAuth(false)
             this.setUser({})

        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth(){
        try {

            // const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true})
            const refreshToken = localStorage.getItem('refreshToken')
            // console.log('Отправили refreshToken '+refreshToken);
            const response = await axios.post(`${API_URL}/refresh`, {refreshToken})


            // console.log('response  '+ JSON.stringify(response));
            // console.log('checkAuth accessToken on res '+response?.data?.accessToken);
            // console.log('refreshToken');
            // console.log(response.data.refreshToken);
            localStorage.setItem('token', response?.data?.accessToken )
            localStorage.setItem('refreshToken', response?.data?.refreshToken )
            this.setAuth(true)
            const user = response?.data?.user
            this.setUser(user)

        } catch (e) {
            console.log('kos');
            console.log(e.response?.data?.message);
        }

    }

}
