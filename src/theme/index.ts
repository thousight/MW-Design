import light from './themes/light'
import dark from './themes/dark'

type ThemeVars = Record<string, string>

export const themes: Record<string, ThemeVars> = {
  light,
  dark,
}
