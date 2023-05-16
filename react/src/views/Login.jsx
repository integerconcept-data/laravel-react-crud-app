import {createRef, React, useState} from 'react'
import { Link } from 'react-router-dom'
import axiosClient from "../axios-client.js";
import { useStateContext } from '../contexts/ContextProvider';

function Login() {
    //debugger
    const emailRef = createRef()
    const passwordRef = createRef()
    const {setUser,setToken} = useStateContext()
    const [errors,setErrors] = useState(null)
    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        console.log(payload);
        
        axiosClient.post('/login',payload)
            .then(({data}) => {
                debugger
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                console.log(err);
                const response =err.response;
                if (response && response.status === 422) {
                    //validation error from the server
                    setErrors(response.data.errors)
                    //console.log(response.data.errors);
                    
                }
            })
    }


  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className='form'>
            <form onSubmit={onSubmit}>
                <h1 className='title'>
                    Login into your account
                </h1>
                <input ref={emailRef} type='email' placeholder='Email' />
                <input ref={passwordRef} type='password' placeholder='Password' />
                <button className='btn btn-block'>Login</button>
                <p className='message'>
                    Not Register? <Link to="/signup">Create an account</Link>
                </p>

            </form>

        </div>
    </div>
  )
}

export default Login