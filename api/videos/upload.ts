import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { uploadThumbnail } from '../../lib/cloudinaryService';
import { saveVideo } from '../../lib/dbService';
import { allowedContentTypes, maxFileSizeInBytes } from '../../consts/files';

export async function POST(request: Request) {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
          body,
          request,
          onBeforeGenerateToken: async () => {
            return {
              maximumSizeInByte: maxFileSizeInBytes,
              allowedContentTypes: allowedContentTypes,
            };
          },
          onUploadCompleted: async ({ blob }) => {
            console.log('Blob upload completed', blob);

            try {
              const thumbnailUrl = await uploadThumbnail(blob);
             
              await saveVideo(blob.url, thumbnailUrl);
            } catch (err: unknown) {
              throw new Error(err as string);
            }
          },
        });
     
        return Response.json(jsonResponse);
      } catch (error) {
        console.error('Error in upload video', error)

        return Response.json(
          { error: 'Error uploading video' },
          { status: 400 }, 
        );
      }
}