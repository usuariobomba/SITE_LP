import { useState, ImgHTMLAttributes, ReactNode } from 'react';
import { getOptimizedCloudinaryUrl } from '../lib/utils';

interface AssetImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSvg: ReactNode;
  className?: string;
  alt?: string;
  maxWidth?: number; // Optional custom physical pixel width limit
  width?: string | number;
  decoding?: 'async' | 'auto' | 'sync';
  loading?: 'eager' | 'lazy';
}

export default function AssetImg({ 
  src, 
  fallbackSvg, 
  className = '', 
  alt = '', 
  maxWidth, 
  width,
  decoding = 'async',
  loading = 'lazy',
  ...props 
}: AssetImgProps) {
  const [error, setError] = useState(false);

  if (error) {
    return <div className={className}>{fallbackSvg}</div>;
  }

  // Derive an optimized Cloudinary source if applicable
  const optimizedSrc = getOptimizedCloudinaryUrl(src, { 
    width: maxWidth || (width ? Number(width) : undefined) 
  });

  return (
    <img
      src={optimizedSrc}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
      className={className}
      alt={alt}
      width={width}
      decoding={decoding}
      loading={loading}
      {...props}
    />
  );
}
