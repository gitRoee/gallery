import { useEffect, useState } from 'react';
import VideosCarousel from '.';
import { video } from '../../../types/videos';
import { getVideosQuery } from '../../queries/videos';
import { useSnackbar } from '../../context/ErrorContext';

type Props = {
    videos: video[];
    onVideosChange: (videos: video[]) => void;
}

const VideosCarouselContainer = ({ videos, onVideosChange }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const { setError } = useSnackbar()

    const getVideos = async () => {
        try {
            const videos = await getVideosQuery();
            onVideosChange(videos);
            setIsLoading(false)
        } catch (err: unknown) {
            setError((err as Error).message || 'Unexpected error');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <VideosCarousel videos={videos} isLoading={isLoading} />
    )
}

export default VideosCarouselContainer;
