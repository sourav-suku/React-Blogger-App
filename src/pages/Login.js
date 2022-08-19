import React from 'react'
import {auth,provider} from "../firebase-config"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate} from 'react-router-dom'

const Login = ({setIsAuth}) => {
  let navigate=useNavigate( );
  const SignInWithGoogle=()=>{signInWithPopup(auth,provider).then(result=>{
    setIsAuth(true);
    localStorage.setItem("isAuth",true);
    navigate("/")
  });
};
  return (
    <div className='loginPage'>
      <p>Sign In with Google to Continue</p>
      <button className="login-with-google-btn" onClick={SignInWithGoogle}>Sign in with Google</button>
    </div>

  )
}

export default Login