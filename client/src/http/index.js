import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL

//Instanse для обычных запросов без авторизации
const $host = axios.create({
  baseURL: API_URL,//URL для отправки запросов
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

//Instanse для запросов с авторизацией, где в каждый запрос подставляется header Autorization
const $authHost = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,

})

//autoInterceptor(Функция для подставки токена к каждому запросу)
const authInterceptor = async (config) => {
  config.headers.authorization = `Bearer ${await AsyncStorage.getItem('@token')}`
  return config
}

//Interceptor для запроса, для подставки токена
$authHost.interceptors.request.use(authInterceptor)

export {//Экспортируем Interceptor
  $host,
  $authHost
}