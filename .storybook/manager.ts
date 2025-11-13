import { addons } from 'storybook/manager-api'
import {
  storybookThemes,
  getSystemTheme,
  mapSystemThemeToAvailableTheme,
  getActiveTheme,
  getThemeMode,
  THEME_CHANGE_EVENT_KEY,
} from '../src/theme'

const themeKeys = Object.keys(storybookThemes)

// Initialize with system or saved theme
addons.setConfig({
  theme: storybookThemes[getActiveTheme()] || storybookThemes[themeKeys[0]],
})

if (typeof window !== 'undefined') {
  // Listen for theme changes from preview
  window.addEventListener('message', ({ data }) => {
    if (data?.type === THEME_CHANGE_EVENT_KEY) {
      try {
        const themeName = data?.theme
        if (themeName && storybookThemes[themeName]) {
          addons.setConfig({ theme: storybookThemes[themeName] })
        } else {
          console.warn(
            '[Manager] Invalid theme name:',
            themeName,
            'Available themes:',
            themeKeys,
          )
        }
      } catch (error) {
        console.error('[Manager] Error applying theme:', error)
      }
    }
  })

  // Listen for system theme changes (only in browser)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleSystemThemeChange = () => {
    const themeMode = getThemeMode()

    // Only update manager theme if in system mode
    if (themeMode === 'system') {
      const systemTheme = getSystemTheme()
      const themeToApply = mapSystemThemeToAvailableTheme(systemTheme)
      const storybookTheme = storybookThemes[themeToApply]

      if (storybookTheme) {
        addons.setConfig({ theme: storybookTheme })
      }
    }
  }

  // Listen for system theme changes
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  } else {
    // Fallback for older browsers
    mediaQuery.addListener(handleSystemThemeChange)
  }
}
