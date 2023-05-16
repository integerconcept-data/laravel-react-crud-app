import {createRef, React, useState} from 'react'
import { Link } from 'react-router-dom'
import axiosClient from "../axios-client.js";
import { useStateContext } from '../contexts/ContextProvider';

function Signup() {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const {setUser,setToken} = useStateContext()
    const [errors,setErrors] = useState(null)
    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload);
        axiosClient.post('/signup',payload)
            .then(({data}) => {
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
                    Signup for free
                </h1>
                {errors &&
                <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
                </div>
            }
                <input ref={nameRef} type='text' placeholder='Full Name' />
                <input ref={emailRef} type='email' placeholder='Email Address' />
                <input ref={passwordRef} type='password' placeholder='Password' />
                <input ref={passwordConfirmationRef} type='password' placeholder='Password Confirmation' />
                <button className='btn btn-block'>Signup</button>
                <p className='message'>
                    Already Registered? <Link to="/login">Signin</Link>
                </p>

            </form>

        </div>
    </div>
  )
}

export default Signup