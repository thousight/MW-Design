import { create } from 'storybook/theming'
import { themes } from '../src/theme'
import { THEME_TOKEN_ACCENT, THEME_TOKEN_TEXT } from '../src/theme/tokens'

export const THEME_STORAGE_KEY = 'mwds-theme'
export const THEME_CHANGE_EVENT_KEY = 'mwds-theme-change'

// Determine if a theme should use dark base based on theme name or background color
const isDarkTheme = (
  themeName: string,
  themeVars: Record<string, string>,
): boolean => {
  // Check if theme name contains "dark" (case-insensitive)
  if (themeName.toLowerCase().includes('dark')) {
    return true
  }

  // Check background color brightness as fallback
  const bgColor = themeVars['--mwds-primary'] || ''
  if (bgColor) {
    // Simple heuristic: if background is dark (low brightness), use dark base
    // This is a basic check - you might want a more sophisticated color analysis
    const hexMatch = bgColor.match(/#([0-9a-f]{6})/i)
    if (hexMatch) {
      const hex = hexMatch[1]
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      return brightness < 128
    }
  }

  return false
}

// Create Storybook themes for all available themes
export const storybookThemes = Object.entries(themes).reduce(
  (acc, [themeName, themeVars]) => {
    acc[themeName] = create({
      base: isDarkTheme(themeName, themeVars) ? 'dark' : 'light',
      brandTitle: 'MW-Design',
      colorPrimary: themeVars[THEME_TOKEN_ACCENT],
      fontBase: '"Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
      textColor: themeVars[THEME_TOKEN_TEXT],
    })

    return acc
  },
  {} as Record<string, ReturnType<typeof create>>,
)

const themeKeys = Object.keys(storybookThemes)

// Get saved theme from localStorage or fallback to first available
export const getActiveTheme = (): string => {
  if (typeof window === 'undefined') {
    return themeKeys[0] || 'light'
  }

  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  if (saved && themeKeys.includes(saved)) {
    return saved
  }

  return themeKeys[0] || 'light'
}