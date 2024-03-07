'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import signIn from '@/firebase/auth/signin';
import MainText from './MainText';
import SignupForm from './SignupForm';
import signUp from '@/firebase/auth/signup';
import addData from '@/firebase/firestore/addData';
import MainInput from './MainInput';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailLoginError, setEmailLoginError] = useState('');
  const [passwordLoginError, setPasswordLoginError] = useState('');



  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmailError("")
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };
  const checkMailIfValid = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return false
    } else {
      return true
    }

  }
  const handleEmailLoginChange = (event) => {
    setEmailLoginError("")
    const emailValue = event.target.value;
    setEmailLogin(emailValue);

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!checkMailIfValid(emailValue)) {
      setEmailLoginError('Invalid email address');
    } else {
      setEmailLoginError('');
    }
  };
  // const handlePasswordLoginChange = (event) => {
   
  //   setPasswordLogin(event.target.value);
  // };
  const handlePasswordLoginChange = (event) => {
    setPasswordLoginError("")
    const newPassword = event.target.value;
    const isPasswordValid = newPassword.length >=8;
    setPasswordLogin(newPassword);
  
    
    if (!isPasswordValid) {
      setPasswordLoginError("Password must be at least 8 characters long.");
    } else {
      setPasswordLoginError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPasswordError("")
    setPassword(event.target.value);
  };
  
  const handleNameChange = (event) => {
    setNameError("")
    setName(event.target.value);
  };
  const handleSignUpClick = () => {
    setEmailLogin("")
    setPasswordLogin("")
    setEmailLoginError("")
    setIsSignUp(true) // Redirect to the sign-up page
  };
  const handleSignInClick = () => {
    setEmail("")
    setPassword("")
    setEmailError("")
    setIsSignUp(false) // Redirect to the sign-up page
  };

  const handleForm = async (event) => {
    event.preventDefault();

    
    
    if(emailLogin==='' && passwordLogin==='' ){
      setEmailLoginError("Enter email please")
      setPasswordLoginError("Enter password please")
      return;
    }
    else if(emailLogin===''){
      setEmailLoginError("Enter email please")
      return;
    }
   else if(passwordLogin.length===0){
      setPasswordLoginError("Enter password please")
      return;
    }
    else if(passwordLogin.length<8){
      setPasswordLoginError("Password must be at least 8 characters long.")
      return;
    }
    const { result, error } = await signIn(emailLogin, passwordLogin);

    if (error) {
      alert(error)
      return console.log(error);
    }
    else if(result){
      const user =result.user
      //alert(user.uid)
      return router.push('/home');
    }
    

    // else successful
    // console.log(result);
    // return router.push('/admin');
  };

  const handleSignUpForm = async (event) => {
    try {
      event.preventDefault()

      if(email==='' && password==='' && name==="" ){
        setEmailError("Enter email please")
        setPasswordError("Enter password please")
        setNameError("Enter your name please")
        return;
      }
      else if(email===''){
        setEmailError("Enter email please")
        return;
      }
     else if(password.length===0){
        setPasswordError("Enter password please")
        return;
      }
      else if(password.length<8){
        setPasswordError("Password must be at least 8 characters long.")
        return;
      }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!checkMailIfValid(email)) {
      setEmailLoginError('Invalid email address');
      return;
    } 
    const { result, error } = await signUp(email, password);

      if (error) {
        alert(error)
        return console.log(error)
      }

      // else successful
      console.log(result)
      alert(email)
      const { uid } = result.user
      let userData = {
        name: name,
        uid: uid,
        password: password,
        email:email,
      }
      await addData("Users", result.user.uid, userData)

    } catch (error) {
      alert(error)
      console.log(error)
    }

    // return router.push("/admin")
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isSignUp) {
    return (
      <SignupForm
        name={name}
        email={email}
        password={password}
        showPassword={showPassword}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        toggleShowPassword={toggleShowPassword}
        handleForm={handleSignUpForm}
        handleSignInClick={handleSignInClick}
        handleNameChange={handleNameChange}
        nameErrorMessage={nameError}
        passwordErrorMessage={passwordError}
        emailErrorMessage={emailError}
      >
      </SignupForm>

    )
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
      <MainText >Welcome!</MainText>
      <MainInput
        placeholder={"Email"}
        value={emailLogin}
        onChange={handleEmailLoginChange}
        errorMessage={emailLoginError}
      >
      </MainInput>
      <MainInput
        type={showPassword ? 'text' : 'password'}
        placeholder={"Password"}
        value={passwordLogin}
        onChange={handlePasswordLoginChange}
        errorMessage={passwordLoginError}
        isPassword={true}
        togglePasswordVisibility={toggleShowPassword}
        
      ></MainInput>
      

    
      <button onClick={handleForm} className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Log In
      </button>
      <p className="mt-4 mb-2">
        Don't have an account?{' '}
        <span style={{ cursor: 'pointer' }} onClick={handleSignUpClick} className="text-black underline ">Sign up now!</span>
      </p>
    </div>
  );
};

export default LoginForm;