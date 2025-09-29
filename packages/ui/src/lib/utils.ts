import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Automatically handles conflicting classes and provides better IntelliSense
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * AI-enhanced utility to generate accessible component props
 * Automatically adds ARIA labels and accessibility attributes
 */
export function generateAccessibleProps(
  baseProps: Record<string, any>,
  options: {
    label?: string;
    description?: string;
    required?: boolean;
    invalid?: boolean;
    role?: string;
  } = {}
) {
  const accessibleProps = { ...baseProps };

  // Add ARIA label if provided
  if (options.label && !accessibleProps["aria-label"] && !accessibleProps["aria-labelledby"]) {
    accessibleProps["aria-label"] = options.label;
  }

  // Add description if provided
  if (options.description && !accessibleProps["aria-describedby"]) {
    const descriptionId = `desc-${Math.random().toString(36).substr(2, 9)}`;
    accessibleProps["aria-describedby"] = descriptionId;
  }

  // Add required attribute
  if (options.required) {
    accessibleProps["aria-required"] = true;
    accessibleProps.required = true;
  }

  // Add invalid state
  if (options.invalid) {
    accessibleProps["aria-invalid"] = true;
  }

  // Add role if provided
  if (options.role) {
    accessibleProps.role = options.role;
  }

  return accessibleProps;
}

/**
 * Utility to respect user motion preferences
 * Returns appropriate animation classes based on prefers-reduced-motion
 */
export function motionSafeClasses(
  normalClasses: string,
  reducedClasses: string = ""
): string {
  return cn(
    "motion-safe:" + normalClasses.split(" ").map(cls => "motion-safe:" + cls).join(" "),
    "motion-reduce:" + (reducedClasses || "motion-reduce:transform-none")
  );
}

/**
 * Generate responsive classes for touch targets
 * Ensures minimum 44px touch targets as per WCAG guidelines
 */
export function touchTargetClasses(size: "sm" | "md" | "lg" = "md"): string {
  const sizes = {
    sm: "min-h-[40px] min-w-[40px]", // Slightly smaller but still accessible
    md: "min-h-[44px] min-w-[44px]", // Standard WCAG requirement
    lg: "min-h-[48px] min-w-[48px]", // Larger for better accessibility
  };

  return sizes[size];
}

/**
 * Generate focus-visible classes with proper ring styling
 * Ensures consistent focus indicators across all interactive elements
 */
export function focusClasses(ringColor: string = "ring-ring"): string {
  return cn(
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    `focus-visible:${ringColor}`
  );
}

/**
 * Color contrast utility to ensure WCAG AA compliance
 * Calculates relative luminance and contrast ratios
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper color parsing library
  const getLuminance = (color: string): number => {
    // This is a simplified version - use a proper color library in production
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const sRGB = [r, g, b].map(c =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Utility to format screen reader text
 * Ensures proper pronunciation and clarity for assistive technologies
 */
export function formatScreenReaderText(text: string): string {
  return text
    .replace(/&/g, "and")
    .replace(/\//g, " slash ")
    .replace(/@/g, " at ")
    .replace(/\./g, " dot ")
    .replace(/,/g, ", ") // Add pause after commas
    .trim();
}

/**
 * Generate unique IDs for form associations
 * Ensures proper label-input relationships for accessibility
 */
export function generateId(prefix: string = "ui"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce utility for performance optimization
 * Prevents excessive re-renders and API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle utility for performance optimization
 * Limits function execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}