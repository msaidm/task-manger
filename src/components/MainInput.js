import React from 'react';
import MainText from './MainText'; // Assuming you have a MainText component
import IconEye from '../resources/SVGs/eyeIcon';
import IconEyeInvisible from '../resources/SVGs/eyeInvisibleIcon';

const MainInput = ({ type, placeholder, value, onChange, errorMessage, isPassword, togglePasswordVisibility ,className, width}) => {
  return (
    <div className="h-10 m-3 relative">
    <div className={width?`flex items-center ${width}`:'flex items-center w-1/2'}>
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        className={"flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"}
        value={value}
        onChange={onChange}
      />
      {isPassword && (
        <div onClick={togglePasswordVisibility} className="cursor-pointer absolute inset-y-0 right-0 pr-2 flex items-center">
          {type === 'text' ? <IconEye width='20px' height='20px'/> : <IconEyeInvisible width='20px' height='20px' />}
        </div>
      )}
    </div>
    {errorMessage && (
      <MainText className={isPassword? "mb-10":""} style={{ width:"200px"}} fontSize={12} color="red">
        {errorMessage}
      </MainText>
    )}
    
  </div>
  );
};

export default MainInput;