import { FC } from 'react'
import styled, { DefaultTheme } from 'styled-components'

interface ButtonProps {
  children?: any
  onClick?: any
  disabled?: boolean
  style?: string
  theme?: DefaultTheme
}

const Button: FC<ButtonProps> = styled.button<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => theme.border || 'none'};
  border-radius: ${({ theme }) => theme.borderRadius || 'none'};
  box-shadow: ${({ theme }) => theme.shadow.default};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space.M}px ${({ theme }) => theme.space.XL}px;
`

export default Button;
