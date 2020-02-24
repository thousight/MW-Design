import React, { FC } from 'react'
import styled, { DefaultTheme } from 'styled-components'

export enum ButtonTypes {
  DEFAULT = 'DEFAULT',
  PRIMARY = 'PRIMARY',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

export enum ButtonSizes {
  SMALL = 'SMALL',
  REGULAR = 'REGULAR',
  LARGE = 'LARGE',
}

interface ButtonProps {
  children?: any
  onClick?: any
  type?: ButtonTypes
  disabled?: boolean
  transparent?: boolean
  outlined?: boolean
  rounded?: boolean
  elevate?: boolean
  block?: boolean
  full?: boolean
  sizes?: ButtonSizes
  theme?: DefaultTheme
}

const ButtonStyle: FC<ButtonProps> = styled.button<ButtonProps>`
  background-color: #FFFFFF;
  border: ${({ outlined }) => outlined ? '1px' : 'none'};
`

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <ButtonStyle>{children}</ButtonStyle>
)

Button.defaultProps = {
  type: ButtonTypes.DEFAULT,
}
export default Button;
