import { v2 as cloudinary } from 'cloudinary';

// Check if credentials are provided and valid
export const isCloudinaryConfigured = (): boolean => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  return !!(
    cloudName &&
    apiKey &&
    apiSecret &&
    cloudName.trim() !== '' &&
    apiKey.trim() !== '' &&
    apiSecret.trim() !== '' &&
    !cloudName.includes('your_cloud_name')
  );
};

export const isDemoMode = (): boolean => {
  if (process.env.DEMO_MODE === 'true') return true;
  return !isCloudinaryConfigured();
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export { cloudinary };

/**
 * Builds a direct Cloudinary delivery URL with transformations applied.
 * Works even when generating URLs for demo assets or client previews.
 */
export function buildCloudinaryUrl(
  publicId: string,
  transformations: string = 'f_auto,q_auto'
): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
  const cleanPublicId = publicId.startsWith('/') ? publicId.slice(1) : publicId;
  const cleanTransform = transformations.replace(/^\/+|\/+$/g, '');

  if (cleanTransform) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${cleanTransform}/${cleanPublicId}`;
  }
  return `https://res.cloudinary.com/${cloudName}/image/upload/${cleanPublicId}`;
}
