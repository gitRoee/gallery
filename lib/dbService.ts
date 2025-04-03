import { createClient } from '@supabase/supabase-js'
import { videosSelectAll, videosTableName } from '../consts/db';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function saveVideo(videoPath: string, thumbnailPath: string) {
   await supabase.from(videosTableName).insert({thumbnailPath, videoPath});
}

export async function getAllVideos() {
    const { data } = await supabase.from(videosTableName).select(videosSelectAll);

    return data;
}
