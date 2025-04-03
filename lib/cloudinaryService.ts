import { put, type PutBlobResult } from '@vercel/blob';
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { videoResourceType } from '../consts/files';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
export async function uploadThumbnail(blob: PutBlobResult) {
    const videoPublicId = uuidv4();

    const uploadResponse = await cloudinary.v2.uploader.upload(blob.downloadUrl, {
        resource_type: videoResourceType,
        public_id: videoPublicId,
    });

    const pickJPGAtStartOfVideo = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/so_0/${uploadResponse.public_id}.jpg`;

    const thumbnailResponse = await fetch(pickJPGAtStartOfVideo);

    if (!thumbnailResponse.ok || !thumbnailResponse.headers.get('content-type')?.includes('image')) {
        throw new Error(`Thumbnail fetch failed`);
    }

    const buffer = Buffer.from(await thumbnailResponse.arrayBuffer());

    const lastFolderIndex = blob.pathname.lastIndexOf('/');
    const videoFolderPath = blob.pathname.substring(0, lastFolderIndex);

    const { url: uploadedUrl } = await put(`${videoFolderPath}/thumb.jpg`, buffer, { access: 'public' });

    await cloudinary.v2.uploader.destroy(uploadResponse.public_id, { resource_type: videoResourceType });

    return uploadedUrl;
}
