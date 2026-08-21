export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  previewUrl: string;
}

const CLOUD_NAME = "pikzelkraft";

function mockMetadata(file: File): { width: number; height: number; format: string } {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "png";
  return { width: 1200, height: 800, format: extension };
}

/**
 * Simulates a Cloudinary unsigned image upload.
 *
 * The real backend (POST /api/admin/portfolio/upload) will replace this with
 * a signed upload to Cloudinary. Until then the file is read locally so the
 * UI can preview it, and a realistic Cloudinary URL is returned.
 */
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const { width, height, format } = mockMetadata(file);
  const publicId = `portfolio/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-").slice(0, 60)}`;
  const secureUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1730000000/${publicId}`;

  const previewUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.readAsDataURL(file);
  });

  return { publicId, secureUrl, width, height, format, previewUrl };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
