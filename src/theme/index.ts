type ThemeVars = Record<string, string>

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