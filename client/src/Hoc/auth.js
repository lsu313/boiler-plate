import axios from 'axios';
import React ,{ useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {auth} from '../_action/user_action';

export default function (SpecificComponent, option, adminRoute = null){

    // null , true , false 라는 option 존재
    // null 아무나 출입가능
    // true 로그인한 유저만 출입가능
    // false 로그인한 유저는 출입불가능
    // App.js에서 설정
    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth()).then (response => {
                console.log(response)

                /*로그인 한 사람이 로그인 페이지에 가면 들어가려 할때
                Auth에서 다른페이지로 가게 막아준다.*/

                
                if(!response.payload.isAuth){
                    //로그인 하지 않은 상태
                    if(option) // ===true(로그인한 유저만 출입가능)
                    {
                        props.history.push('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //admin이 아닌데 admin만 들어갈수 있는 페이지에 진입 시
                        props.history.push('/')
                    }else{
                        if(option === false){
                            //로그인 한 상태에서 진입 못하는 페이지(로그인 페이지 및 회원가입 페이지 등 진입 시)
                            props.history.push('/')
                        }
                    }
                }





            })
            
            //axios.get('/api/users/auth')
        }, [])
        return(
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}
//Auth에서 backend로 request 날려서 user_state를 받아옴