import { create } from 'storybook/theming'

export const THEME_STORAGE_KEY = 'mwds-theme'
export const THEME_MODE_KEY = 'mwds-theme-mode' // 'system' | 'manual'
export const THEME_CHANGE_EVENT_KEY = 'mwds-theme-change'

type ThemeVars = Record<string, string>

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
  const bgColor = themeVars['--mwds-bg'] || themeVars['--mwds-background'] || ''
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

export const themes: Record<string, ThemeVars> = {
  light: {
    '--mwds-bg': '#ffffff',
    '--mwds-text': '#0f172a',
    '--mwds-primary': '#2563eb',
    '--mwds-button-bg': 'var(--mwds-primary)',
    '--mwds-button-text': '#ffffff',
  },
  dark: {
    '--mwds-bg': '#333333',
    '--mwds-text': '#e5e7eb',
    '--mwds-primary': '#60a5fa',
    '--mwds-button-bg': 'var(--mwds-primary)',
    '--mwds-button-text': '#333333',
  },
}

// Create Storybook themes for all available themes
export const storybookThemes = Object.entries(themes).reduce(
  (acc, [themeName, themeVars]) => {
    acc[themeName] = create({
      base: isDarkTheme(themeName, themeVars) ? 'dark' : 'light',
      brandTitle: 'MW-Design',
      colorPrimary: themeVars['--mwds-primary'],
      colorSecondary:
        themeVars['--mwds-secondary'] || themeVars['--mwds-primary'],
    })

    return acc
  },
  {} as Record<string, ReturnType<typeof create>>,
)

const themeKeys = Object.keys(storybookThemes)

// Detect system theme preference
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

// Map system theme to available theme (find closest match)
export const mapSystemThemeToAvailableTheme = (
  systemTheme: 'light' | 'dark',
): string => {
  // Try exact match first
  if (themeKeys.includes(systemTheme)) {
    return systemTheme
  }

  // Try to find theme with similar name
  const matchingTheme = themeKeys.find(
    (key) =>
      key.toLowerCase().includes(systemTheme) ||
      (systemTheme === 'dark' && key.toLowerCase().includes('dark')) ||
      (systemTheme === 'light' && !key.toLowerCase().includes('dark')),
  )

  if (matchingTheme) {
    return matchingTheme
  }

  // Fallback to first available theme
  return themeKeys[0] || 'light'
}

// Get theme mode preference
export const getThemeMode = (): 'system' | 'manual' => {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const mode = localStorage.getItem(THEME_MODE_KEY)
  return mode === 'manual' ? 'manual' : 'system'
}

// Get saved theme from localStorage or system preference
export const getActiveTheme = (): string => {
  if (typeof window === 'undefined') {
    return themeKeys[0] || 'light'
  }

  const themeMode = getThemeMode()

  if (themeMode === 'manual') {
    // Manual mode: use saved theme
    const saved = localStorage.getItem(THEME_STORAGE_KEY)

    if (saved && themeKeys.includes(saved)) {
      return saved
    }
  }

  const systemTheme = getSystemTheme()

  return mapSystemThemeToAvailableTheme(systemTheme)
}