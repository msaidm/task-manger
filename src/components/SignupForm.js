import React from 'react';
import MainText from './MainText';
import MainInput from './MainInput';

const SignupForm = ({
  name,
  email,
  password,
  showPassword,
  handleEmailChange,
  handlePasswordChange,
  toggleShowPassword,
  handleNameChange,
  handleForm,
  handleSignInClick,
  nameErrorMessage,
  emailErrorMessage,
  passwordErrorMessage,

}) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
      <p className="mb-2">Welcome!</p>
      <MainInput
        type={"text"}
        placeholder={"Name"}
        value={name}
        onChange={handleNameChange}
        errorMessage={nameErrorMessage}
      />
      <MainInput
        type={"text"}
        placeholder={"Email"}
        value={email}
        onChange={handleEmailChange}
        errorMessage={emailErrorMessage}
      />
      <MainInput
        type={showPassword ? 'text' : 'password'}
        placeholder={"Password"}
        value={password}
        onChange={handlePasswordChange}
        errorMessage={passwordErrorMessage}
        isPassword={true}
        togglePasswordVisibility={toggleShowPassword}
      />
      
      
      <button onClick={handleForm} className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create account
      </button>
      <MainText className={"mt-2"}>
        Already have an account?{' '}
        <span style={{ cursor: 'pointer' }} onClick={handleSignInClick} className="text-black underline">Sign in now!</span>
      </MainText>
    </div>
  );
};

export default SignupForm;