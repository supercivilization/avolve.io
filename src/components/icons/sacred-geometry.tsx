// Sacred Geometry Icons for 5S Framework
// Each icon represents a concept through geometric symbolism

interface IconProps {
  className?: string;
  size?: number;
}

// Solutions: Pentagram/Pentagon - 5 points representing complete solutions
export function SolutionsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

// Systems: Hexagon - 6 sides representing interconnected architecture
export function SystemsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 2V12M12 12L20.66 7M12 12L3.34 7M12 12V22M12 12L20.66 17M12 12L3.34 17"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

// Software: Cube/Sacred Geometry Cube - 3D structure representing code
export function SoftwareIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L20 7L20 17L12 22L4 17L4 7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 2V12M12 12L20 7M12 12L4 7M12 12V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 7L12 12L20 7"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  );
}

// Services: Flower of Life pattern - circles representing external services
export function ServicesIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="12" cy="18" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Support: Triangle/Pyramid - stable foundation representing support
export function SupportIcon({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L22 20H2L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 2V20M2 20L12 8M22 20L12 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />
      <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// Alternative: Simple minimal geometric shapes for header/nav
export function SolutionsIconSimple({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 0L12.94 6.91L20 7.75L15 12.6L16.18 19.5L10 16.27L3.82 19.5L5 12.6L0 7.75L7.06 6.91L10 0Z" />
    </svg>
  );
}

export function SystemsIconSimple({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 0L18 5.5V14.5L10 20L2 14.5V5.5L10 0Z" />
    </svg>
  );
}

export function SoftwareIconSimple({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="2" />
      <rect x="6" y="6" width="8" height="8" rx="1" fill="white" fillOpacity="0.3" />
    </svg>
  );
}

export function ServicesIconSimple({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <circle cx="10" cy="10" r="8" />
      <circle cx="10" cy="10" r="4" fill="white" fillOpacity="0.4" />
    </svg>
  );
}

export function SupportIconSimple({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 0L20 18H0L10 0Z" />
    </svg>
  );
}
