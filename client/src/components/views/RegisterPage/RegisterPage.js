

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_action/user_action';
import{withRouter} from 'react-router-dom'
function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const  [Name, setName] = useState("")
    const  [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); //page refresh 방지

        // console.log('Email', Email)
        // console.log('Password',Password)

        if(Password !== ConfirmPassword){
            //비밀번호와 컨펌 비밀번호 다를때 회원가입 버튼 눌러도 가입안되게
            return alert("비밀번호와 확인 비밀번호가 다릅니다.")
        }

        let body = {
            email: Email,
            password: Password,
            name : Name
        }

        dispatch(registerUser(body)) //redux사용
            .then(response => {
                //로그인 완료 후 페이지 처음으로 이동
                //react에서 페이지 이동시 props.history.push()사용
                if(response.payload.success){
                    props.history.push("/login")
                }
                else{
                    alert("failed to sign up")
                }
            })
        // axios.post('/api/users/login', body)
        // .then(response=> {

        // })

        //enter키 넣어보기
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
