import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_action/types';

export default function (state = {}, action) {
    //전 state action 조합
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload } //spread 오퍼레이터 
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload }
            break;
        default:
            return state;
    }
}
