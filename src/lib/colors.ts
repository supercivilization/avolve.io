// Color palette mapping for 5S framework routes
// Each route uses a specific Tailwind color from the grayscale family

export const routeColors = {
  solutions: 'slate',   // /solutions - Slate colors
  systems: 'gray',      // /systems - Gray colors
  software: 'zinc',     // /software - Zinc colors (default)
  services: 'neutral',  // /services - Neutral colors
  support: 'stone',     // /support - Stone colors
} as const;

export type RouteColor = typeof routeColors[keyof typeof routeColors];

// Helper to get color classes for a specific route
export function getRouteColorClasses(route: keyof typeof routeColors) {
  const color = routeColors[route];

  return {
    // Text colors
    heading: `text-${color}-700`,
    headingDark: `dark:text-${color}-300`,
    body: `text-${color}-600`,
    bodyDark: `dark:text-${color}-400`,

    // Border colors
    border: `border-${color}-200`,
    borderDark: `dark:border-${color}-800`,
    borderAccent: `border-l-4 border-${color}-600`,
    borderAccentDark: `dark:border-${color}-400`,

    // Background colors
    bg: `bg-${color}-50`,
    bgDark: `dark:bg-${color}-900`,
    bgAccent: `bg-${color}-100`,
    bgAccentDark: `dark:bg-${color}-800`,

    // Link colors
    link: `text-${color}-600 hover:text-${color}-700`,
    linkDark: `dark:text-${color}-400 dark:hover:text-${color}-300`,
  };
}
