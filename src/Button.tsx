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
    ? `bg-${color}-400 text-white cursor-default`
    : `bg-${color}-500 hover:bg-${color}-600 text-white`

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

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  size,
  block,
  outline,
  className,
  disabled,
  ...otherButtonProps
}) => {
  return (
    <button
      className={getButtonClassName({
        color,
        size,
        block,
        outline,
        className,
        disabled
      })}
      disabled={disabled}
      {...otherButtonProps}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  color: 'indigo',
  size: 'xs'
} as Partial<ButtonProps>

export default Button
