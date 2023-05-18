import axios from "axios"; // Библиотека для запросов на сервер

// API запросов на сервер для авторизации логина и чека пользователя

//TODO: Поменять на нужный сервер при деплое

export const API_URL='http://localhost:5000/api'

//Для обычных запросов
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL

})

// Интерцептор для запросов - цепляем токен к каждому запросу из локал стораджа
$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

// Интерцептор перезаписи аксесс токена если он перестал действовать
// Т.е. если получили 401 то рефрешнули, записали новый токен и отправили повторно старый запрос
$api.interceptors.response.use((config)=>{return config},
    async (error) =>  {
        const originalRequest = error.config;

        if (error.response.status == 401 && error.config && !error.config._isRetry){
            originalRequest._isRetry = true
            try {
                const response = await axios.get(`${API_URL}/refresh`, {withCredentials:true})
                localStorage.setItem('token', response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН')
            }

        } throw error
    }

)

export default $api

