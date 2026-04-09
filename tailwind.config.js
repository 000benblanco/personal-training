/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        surface: '#0b1326',
        'surface-dim': '#0b1326',
        'surface-container-lowest': '#060e20',
        'surface-container-low': '#131b2e',
        'surface-container': '#171f33',
        'surface-container-high': '#222a3d',
        'surface-container-highest': '#2d3449',
        'surface-bright': '#31394d',
        'surface-variant': '#2d3449',
        
        // Primary - Blue clinical
        primary: '#b9c8de',
        'primary-fixed': '#d4e4fa',
        'primary-fixed-dim': '#b9c8de',
        'primary-container': '#091828',
        'on-primary': '#233143',
        'on-primary-fixed': '#0d1c2d',
        'on-primary-fixed-variant': '#39485a',
        'on-primary-container': '#738296',
        'surface-tint': '#b9c8de',
        
        // Secondary - Serene blue
        secondary: '#a9caeb',
        'secondary-fixed': '#cee5ff',
        'secondary-fixed-dim': '#a9caeb',
        'secondary-container': '#2b4c68',
        'on-secondary': '#0e334e',
        'on-secondary-fixed': '#001d32',
        'on-secondary-fixed-variant': '#294965',
        'on-secondary-container': '#9bbcdd',
        
        // Tertiary - Sage green (for rest/success)
        tertiary: '#becca3',
        'tertiary-fixed': '#dae8be',
        'tertiary-fixed-dim': '#becca3',
        'tertiary-container': '#111b03',
        'on-tertiary': '#293417',
        'on-tertiary-fixed': '#141f05',
        'on-tertiary-fixed-variant': '#3f4b2c',
        'on-tertiary-container': '#788662',
        
        // Text
        'on-surface': '#dae2fd',
        'on-surface-variant': '#c6c6cd',
        'inverse-surface': '#dae2fd',
        'inverse-on-surface': '#283044',
        'inverse-primary': '#516072',
        
        // Outlines
        outline: '#909097',
        'outline-variant': '#45464d',
        
        // Errors
        error: '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
        
        // Background
        background: '#0b1326',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      fontFamily: {
        headline: ['Inter'],
        body: ['Inter'],
        label: ['Inter'],
      },
      backdropBlur: {
        'glass': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'ambient': '0 0 32px rgba(185, 200, 222, 0.08)',
      },
    },
  },
  plugins: [],
}