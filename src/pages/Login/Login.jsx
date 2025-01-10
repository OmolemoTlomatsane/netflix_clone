import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import {user_login, sign_up} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { toast } from 'react-toastify'

const Login = () => {
  const [signState, setsignState] = useState('Sign In')

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [loading, setloading] = useState(false)

  const user_auth = async (event)=>{
    event.preventDefault()
    setloading(true)
    try {
      if (signState === 'Sign In'){
        await user_login(email, password)
      }
      else{
        await sign_up(name,email,password)
    }
    } catch (error) {
      console.log(error)
      toast.error(error.code.split('/')[1].split('-').join(' '))
    } finally{
      setloading(false)
    }
  }
  return (
    loading? (<div className="login-spinner">
      <img src={netflix_spinner} alt='' />
    </div>) :(
      <div className='login'>
      <img src={logo} alt='' className='login-logo'/>
      <form className='login-form'>
      <h1>{signState}</h1>
        {signState === 'Sign Up'? <input type='text' value={name} onChange={(e)=>{setname(e.target.value)}} placeholder='Your name' /> : <></>}
        <input type='email' value={email} placeholder='Email' onChange={(e)=>{setemail(e.target.value)}} />
        <input type='password' value={password} placeholder='password' onChange={(e)=>{setpassword(e.target.value)}} />
        <button onClick={user_auth} type='submit'>{signState}</button>
        <div className="form-help">
          <div className="remember">
              <input type='checkbox' />
              <label htmlFor=''>Remember Me</label>
          </div>
          <p>Need Help?</p>
        </div>
        <div className="form-switch">
          {signState === 'Sign In' 
          ? <p>New to Netflix<span onClick={()=>{setsignState('Sign Up')}}>Sign Up Now</span></p> 
          : <p>Already Have Account?<span onClick={()=>{setsignState('Sign In')}}>Sign In</span></p>
           }
      </div>
      </form>
    </div> )
  )
}

export default Login
