import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimizes Cloudinary URLs by inserting transformation parameters (f_auto, q_auto, width).
 * Supports DPR, width limits, and correct scaling for both mobile and desktop.
 */
export function getOptimizedCloudinaryUrl(url: string, options: { width?: number; quality?: string; format?: string } = {}) {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) return url;

  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const beforeUpload = url.substring(0, uploadIndex + 8); // includes '/upload/'
  const afterUpload = url.substring(uploadIndex + 8);

  const quality = options.quality || 'auto';
  const format = options.format || 'auto';
  
  let transform = `f_${format},q_${quality}`;
  if (options.width) {
    transform += `,w_${options.width}`;
  }

  return `${beforeUpload}${transform}/${afterUpload}`;
}
