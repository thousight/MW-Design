import { FC } from 'react'
import styled from 'styled-components'

import { MWDesignTheme } from '../../themes/defaultTheme'

interface ButtonProps {
  theme: MWDesignTheme
}

const Button: FC<ButtonProps> = styled.button<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => theme.border || 'none'};
  border-radius: ${({ theme }) => theme.borderRadius || 'none'};
  box-shadow: ${({ theme }) => theme.shadow.default};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.space.M}px ${({ theme }) => theme.space.XL}px;
  position: relative;

  &::before {
    display: block;
    box-shadow: ${({ theme }) => theme.shadow.active};
    border-radius: ${({ theme }) => theme.borderRadius || 'none'};
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: opacity 250ms;
  }

  &:active::before {
    opacity: 1;
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: 0;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.disabled};
  }
`

Button.displayName = 'Button'

export default Button;
