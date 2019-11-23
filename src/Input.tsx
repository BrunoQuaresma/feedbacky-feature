import React, { InputHTMLAttributes, forwardRef } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...inputProps }, ref) => {
    return (
      <input
        {...inputProps}
        ref={ref}
        className={`bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none ${className} focus:border-indigo-500`}
      />
    )
  }
)

export default Input
