import type { Preview } from '@storybook/react-vite'
import {
  themes,
  storybookThemes,
  getThemeMode,
  getSystemTheme,
  mapSystemThemeToAvailableTheme,
  getActiveTheme,
  THEME_STORAGE_KEY,
  THEME_MODE_KEY,
  THEME_CHANGE_EVENT_KEY,
} from '../src/theme'
import '../src/theme/theme.css'

const themeKeys = Object.keys(storybookThemes)

const applyPreviewTheme = (themeName: string, themeMode: string) => {
  const theme = themes[themeName]

  if (theme) {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    document.documentElement.setAttribute('data-theme', themeName)

    // Save theme mode and theme preference
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_MODE_KEY, themeMode)

        // Save theme only in manual mode
        if (themeMode === 'manual') {
          localStorage.setItem(THEME_STORAGE_KEY, themeName)
        }
      }
    } catch (e) {
      // Ignore localStorage errors
      console.warn('Failed to save theme preference:', e)
    }

    // Notify manager
    if (window) {
      try {
        window.parent?.postMessage(
          {
            type: THEME_CHANGE_EVENT_KEY,
            theme: themeName,
          },
          '*',
        )
      } catch (e) {
        console.warn('Failed to emit theme change:', e)
      }
    }
  } else {
    console.warn(`Theme "${themeName}" not found`)
  }
}

// Listen for system theme changes (only in browser)
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleSystemThemeChange = () => {
    const themeMode = getThemeMode()

    // Only apply system theme if we're in system mode
    if (themeMode === 'system') {
      const systemTheme = getSystemTheme()
      const themeToApply = mapSystemThemeToAvailableTheme(systemTheme)

      if (typeof document !== 'undefined') {
        applyPreviewTheme(themeToApply, themeMode)
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

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    docs: {
      theme: storybookThemes[getActiveTheme()],
    },
  },

  globalTypes: {
    themeMode: {
      name: 'Theme Mode',
      description: 'Choose between system theme or manual theme selection',
      defaultValue: getThemeMode(),
      toolbar: {
        icon: 'paintbrush',
        items: [
          {
            value: 'system',
            title: 'System',
          },
          {
            value: 'manual',
            title: 'Manual',
          },
        ],
        dynamicTitle: true,
        showName: true,
      },
    },
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: getActiveTheme(),
      toolbar: {
        icon: 'circlehollow',
        items: themeKeys.map((themeName) => ({
          value: themeName,
          title: themeName.charAt(0).toUpperCase() + themeName.slice(1),
        })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get selected theme from context
      const themeModeToApply = context.globals.themeMode
      const currentThemeMode = getThemeMode()

      const themeToApply = context.globals.theme
      const currentTheme = getActiveTheme()
      const systemTheme = getSystemTheme()

      if (typeof document !== 'undefined') {
        if (themeModeToApply !== currentThemeMode) {
          // ThemeMode change
          applyPreviewTheme(
            themeModeToApply === 'system' ? systemTheme : themeToApply,
            themeModeToApply,
          )
        } else if (
          currentThemeMode === 'manual' &&
          themeToApply !== currentTheme
        ) {
          // Theme change
          applyPreviewTheme(themeToApply, currentThemeMode)
        }
      }

      return Story()
    },
  ],
}

export default preview
