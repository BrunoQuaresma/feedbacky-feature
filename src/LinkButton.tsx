import React from 'react'
import Button, { ButtonProps, getButtonClassName } from './Button'
import { LinkProps, Link } from 'react-router-dom'

export type LinkButtonProps = ButtonProps & LinkProps

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  to,
  ...buttonProps
}) => {
  return (
    <Link to={to} className={getButtonClassName(buttonProps)}>
      {children}
    </Link>
  )
}

LinkButton.defaultProps = Button.defaultProps as Partial<LinkButtonProps>

export default LinkButton
