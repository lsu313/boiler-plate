import { combineReducers } from 'redux'; 
import user from './user_reducer';
/*STORE가 있고 여러가지reducer가 있는데
 (reducer=> 어떻게 state가 변하는지를 보여준다음에 변한 마지막 값을 return)
state 여러가지가 있다. => 여러 reducer 존재 => rootreducer에서 하나로 합침 = combine reducer*/
//improt user from './user_reducer';

const rootReducer = combineReducers({
    //여러 기능에 따른 reducer 합침
    user
})
export default rootReducer;