import { video } from "../../types/videos";

export const getVideosQuery = async (): Promise<video[]> => {
    const vidRes = await fetch('/api/videos/list', {
        method: 'GET'
    })

    if (!vidRes.ok) {
        throw new Error('Failed to load videos');
    }

    return await vidRes.json();
}