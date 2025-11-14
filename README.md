# MW-Design

A minimal, themeable React design system with Storybook documentation.

## About

MW-Design is a personal design system focused on simplicity and theming. It provides a set of React components with CSS custom properties (CSS variables) for complete theme customization.

## Getting Started

### View the Design System

Open the Storybook documentation:

```bash
npm run dev
```

Visit http://localhost:6006 to explore components, interact with them, and see theme options.

### Development

Install dependencies:

```bash
npm install
```

Start Storybook dev server:

```bash
npm run dev
```

### Build

Generate a static Storybook site:

```bash
npm run build
```

Output is generated in `storybook-static/`.

## Theming

MW-Design components are fully themed with CSS custom properties. Select themes from the toolbar (circle icon) in Storybook.

### Available Themes

- **Light**: Light background, dark text
- **Dark**: Dark background, light text

### CSS Variables

Components use the following design tokens:

- `--mwds-background`: Background color
- `--mwds-text`: Text color
- `--mwds-primary`: Primary action color
- `--mwds-secondary`: Secondary action color
- `--mwds-accent`: Accent color

## Components

### Button

A flexible button component for user interactions.

**Features:**
- Multiple sizes (small, medium, large)
- Disabled state
- Full HTML button attribute support

Explore in Storybook: Button stories

## Scripts

- `npm run dev` - Start Storybook dev server
- `npm run build` - Build static Storybook site
- `npm run lint` - Run ESLint
- `npm start` - Serve built Storybook (requires build first)
