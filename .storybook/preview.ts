import type { Preview } from '@storybook/react-vite'
import {
  storybookThemes,
  getActiveTheme,
  THEME_STORAGE_KEY,
  THEME_CHANGE_EVENT_KEY,
} from './theming'
import { themes } from '../src/theme'
import '../src/theme/theme.css'

const themeKeys = Object.keys(storybookThemes)

const applyPreviewTheme = (themeName: string) => {
  const theme = themes[themeName]

  if (theme) {
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    document.documentElement.setAttribute('data-theme', themeName)

    // Save selected theme preference (manual mode only)
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, themeName)
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

// (System theme support removed) Preview now relies only on manual theme selection.

// Apply the active (manual) theme on initial preview load
if (typeof document !== 'undefined') {
  try {
    const initialTheme = getActiveTheme()
    applyPreviewTheme(initialTheme)
  } catch (e) {
    // Don't block story rendering for theming errors
    // eslint-disable-next-line no-console
    console.warn('Failed to apply initial theme on preview load:', e)
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
      // Apply manual theme selection from toolbar
      const themeToApply = context.globals.theme
      const currentTheme = getActiveTheme()

      if (typeof document !== 'undefined' && themeToApply && themeToApply !== currentTheme) {
        applyPreviewTheme(themeToApply)
      }

      return Story()
    },
  ],
}

export default preview
