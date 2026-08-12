/**
 * Theme object for styled-components / Emotion
 * Reflects the design tokens defined in variables.css
 */
export const theme = {
  colors: {
    primary: '#2c3e50',
    primaryLight: '#34495e',
    primaryDark: '#1a252f',
    secondary: '#3498db',
    secondaryLight: '#5dade2',
    accent: '#e67e22',
    success: '#27ae60',
    warning: '#f1c40f',
    danger: '#e74c3c',
    info: '#1abc9c',
    bg: '#f4f6f9',
    bgCard: '#ffffff',
    bgInput: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#dce1e8',
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  fonts: {
    family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    baseSize: '16px',
    small: '0.875rem',
    large: '1.25rem',
    xl: '1.5rem',
    weightNormal: 400,
    weightBold: 600,
    lineHeight: 1.6,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    default: '6px',
    large: '12px',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  transitions: {
    speed: '0.3s',
  },
};

export default theme;