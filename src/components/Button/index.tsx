import { FC } from 'react'
import styled from 'styled-components'

import { MWDesignTheme } from '../../themes/theme'

export interface ButtonProps {
  theme: MWDesignTheme
}

const Button: FC<ButtonProps> = styled.button<ButtonProps>`
  background-color: ${({ theme }: { theme: MWDesignTheme }) => theme.colors.primary};
  border: ${({ theme }: { theme: MWDesignTheme }) => theme.border || 'none'};
  border-radius: ${({ theme }: { theme: MWDesignTheme }) => theme.borderRadius || 'none'};
  box-shadow: ${({ theme }: { theme: MWDesignTheme }) => theme.shadow.default};
  box-sizing: border-box;
  color: ${({ theme }: { theme: MWDesignTheme }) => theme.colors.text};
  padding: ${({ theme }: { theme: MWDesignTheme }) => theme.space.M}px ${({ theme }) => theme.space.XL}px;
  position: relative;

  &:active {
    box-shadow: ${({ theme }: { theme: MWDesignTheme }) => theme.shadow.active};
  }

  &:hover {
    box-shadow: ${({ theme }: { theme: MWDesignTheme }) => theme.shadow.hover};
  }

  &:focus {
    box-shadow: ${({ theme }: { theme: MWDesignTheme }) => theme.shadow.focus};
  }

  &:focus-within {
    box-shadow: ${({ theme }: { theme: MWDesignTheme }) => theme.shadow['focus-within']};
  }

  &:visited {
    box-shadow: ${({ theme }: { theme: MWDesignTheme }) => theme.shadow.visited};
  }

  &:disabled {
    color: ${({ theme }: { theme: MWDesignTheme }) => theme.colors.disabled};
  }

  ${({ theme }: { theme: MWDesignTheme }) => theme.buttonTheme}
`

Button.displayName = 'Button'

export default Button;
