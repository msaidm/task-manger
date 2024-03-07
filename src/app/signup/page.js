'use client'
import React, { useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import MainText from "@/components/MainText";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);



    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    



    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        return router.push("/admin")
    }

  const handleSignUpClick = () => {
    setIsSignUp(true)
  };


    if(isSignUp){
        return(
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
            <p className="mb-2">oa!</p>
            <input
                type="text"
                placeholder="Email"
                className="mb-2"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-2">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={toggleShowPassword}
                    className="mr-2"
                />
                <label htmlFor="showPassword">Show Password</label>
            </div>
            <button onClick={handleForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Log In
            </button>
            <MainText>
                Don't have an account?{' '}
                <a  onClick={handleSignUpClick} className="text-black underline ">Sign up now!</a>
            </MainText>
        </div>

        )
    }
    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
            <p className="mb-2">Welcome!</p>
            <input
                type="text"
                placeholder="Email"
                className="mb-2"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-2">
                <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={toggleShowPassword}
                    className="mr-2"
                />
                <label htmlFor="showPassword">Show Password</label>
            </div>
            <button onClick={handleForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Log In
            </button>
            <MainText>
                Don't have an account?{' '}
                <a  onClick={handleSignUpClick} className="text-black underline ">Sign up now!</a>
            </MainText>
        </div>
    );
}

export default Page;

