import { statSync } from 'fs';
import { join } from 'path';

/**
 * Get the last modification time of a file
 * @param filePath - Relative path from project root (e.g., 'src/app/page.tsx')
 * @returns Date object of last modification
 */
export function getFileModifiedDate(filePath: string): Date {
  try {
    const fullPath = join(process.cwd(), filePath);
    const stats = statSync(fullPath);
    return stats.mtime;
  } catch (error) {
    // If file doesn't exist or can't be read, return current date as fallback
    console.warn(`Could not read file stats for ${filePath}, using current date`);
    return new Date();
  }
}
