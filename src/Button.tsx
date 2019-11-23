import React, { ButtonHTMLAttributes } from 'react'

export type ButtonProps = {
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  block?: boolean
  outline?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const getOutLineClassNames = (color?: string) =>
  `border border-solid border-${color}-500 text-${color}-700 hover:bg-${color}-100`

const getFlatClassNames = (color?: string, disabled?: boolean) =>
  disabled
    ? `shadow bg-${color}-400 text-white cursor-default`
    : `shadow bg-${color}-500 hover:bg-${color}-600 text-white`

export const getButtonClassName = ({
  color,
  size,
  block,
  outline,
  className,
  disabled
}: ButtonProps) =>
  [
    `text-${size}`,
    block ? 'block w-full' : 'inline-block',
    outline ? getOutLineClassNames(color) : getFlatClassNames(color, disabled),
    'rounded-full',
    'py-2',
    'px-4',
    'font-medium',
    'uppercase',
    'focus:outline-none',
    className
  ].join(' ')

const Button: React.FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return <button className={getButtonClassName(buttonProps)}>{children}</button>
}

Button.defaultProps = {
  color: 'indigo',
  size: 'xs'
} as Partial<ButtonProps>

export default Button
