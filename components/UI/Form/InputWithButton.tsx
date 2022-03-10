import React from 'react';

type Props = {
  name: string,
  label?: string | undefined;
  placeholder?: string;
  onChange: (e: any) => void;
  handleButtonClick: (e: any) => void;
  buttonContent: any;
  buttonDisabled?: boolean;
  value: string | number | undefined;
  type?: "number" | "password" | "email" | "text";
  required?: boolean,
}

const InputWithButton = ({
  label,
  name,
  placeholder,
  onChange,
  handleButtonClick,
  buttonContent,
  value,
  type = 'text',
  required = false,
  buttonDisabled = false,
}: Props) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={name}>{label}</label>
      )}
      <div className="flex">
        <div
          className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            className={`
                  px-2.5
                  py-2.5
                  rounded-l-md
                  leading-normal
                  block
                  w-full
                  border
                  border-gray-300
                  text-black
                  bg-white
                  font-sans
                  text-left
                  appearance-none
                  relative
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                `}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
          />
        </div>
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={buttonDisabled}
          className="-ml-px relative p-2.5 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2
           focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

export default InputWithButton;