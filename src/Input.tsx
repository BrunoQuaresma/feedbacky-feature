import React, { InputHTMLAttributes } from 'react'
import { Ref } from 'react-hook-form/dist/types'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref: Ref
}

const Input: React.FC<InputProps> = ({ className, ref, ...inputProps }) => {
  return (
    <input
      {...inputProps}
      ref={ref}
      className={`bg-white px-3 py-2 block w-full rounded border border-solid border-gray-300 outline-none ${className} focus:border-indigo-500`}
    />
  )
}

export default Input
