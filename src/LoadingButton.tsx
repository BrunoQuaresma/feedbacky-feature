import React from 'react'
import Button, { ButtonProps } from './Button'
import spinner from './spinner-white.svg'

export type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  className,
  isLoading,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      className={`relative ${isLoading ? 'cursor-wait' : ''} ${className}`}
      disabled={isLoading}
    >
      <img
        className={`h-5 mx-auto absolute w-full h-full py-2 top-0 left-0 ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
        src={spinner}
        alt="Loading spinner"
      />
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </Button>
  )
}

LoadingButton.defaultProps = Button.defaultProps as Partial<LoadingButtonProps>

export default LoadingButton
