import axios from 'axios'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_action/user_action';
import{withRouter} from 'react-router-dom'
function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //page refresh 방지

        // console.log('Email', Email)
        // console.log('Password',Password)

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body)) //redux사용
        .then(response=> {
            //로그인 완료 후 페이지 처음으로 이동
            //react에서 페이지 이동시 props.history.push()사용
                if(response.payload.loginSuccess){
                    props.history.push('/')
                }
                else{
                    alert('Error')
                }
             })
        // axios.post('/api/users/login', body)
        // .then(response=> {

        // })

        //enter키 넣어보기
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style={{display: 'flex', flexDirection : 'column'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type = "submit">
                    Login
                </button>
            </form>
        </div>
    )
}
/*로그인 창에 typing시 state를 바꾸면 value가 바뀐다 
typing시 onchange라는 이벤트를 발생시켜서 state을 바꿔줌 => value가 바뀜*/
export default withRouter(LoginPage)
