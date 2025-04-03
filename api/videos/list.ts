import { getAllVideos } from "../../lib/dbService";

export async function GET(_request: Request) {
    console.log('Requesting videos metadata');

    try {
        const videos = await getAllVideos()
     
        return Response.json(videos);
    } catch (error) {
       console.error(error)

       return Response.json(
        { error: 'Error getting videos' },
        { status: 400 }, 
      );
    }
}