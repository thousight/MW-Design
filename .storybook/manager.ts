import { addons } from 'storybook/manager-api'
import {
  storybookThemes,
  getActiveTheme,
  THEME_CHANGE_EVENT_KEY,
} from './theming'

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

  // (System theme support removed) Manager no longer listens to OS theme changes.
}
