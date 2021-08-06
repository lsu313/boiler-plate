import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'
export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data)
    //server에서 받은 data request에 저장
    //return 시켜서 reducer 보냄
    //reducer 에서 previouseState와 현재 actiond을 조합해서
    //다음 state을 만든다.
    return {
        type: "REGISTER_USER",
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data)
    //server에서 받은 data request에 저장
    //return 시켜서 reducer 보냄
    //reducer 에서 previouseState와 현재 actiond을 조합해서
    //다음 state을 만든다.
    return {
        type: "LOGIN_USER",
        payload: request
    }
}

export function auth() {
    const request =axios.get('/api/users/auth')
        .then(response => response.data)
    return {
        type: "AUTH_USER",
        payload: request
    }
}

