import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components'

import theme from './theme'

interface ThemeWrapperProps {
  children?: any
}

const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

export default ThemeWrapper
