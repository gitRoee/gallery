import { Box, CircularProgress, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Virtual } from 'swiper/modules';
import { video } from '../../../types/videos';

type Props = {
    videos: video[],
    isLoading: boolean,
}

const VideosCarousel = ({ videos, isLoading }: Props) => {
    return (
        <Box sx={{ width: '60vw' }}>
            {
                isLoading ? <CircularProgress />
                    : videos.length > 0 ? <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        speed={0}
                        navigation
                        virtual
                        modules={[Navigation, Virtual]}
                    >
                        {videos.map((vid) => (
                            <SwiperSlide key={vid.id}>
                                <Box>
                                    <video
                                        src={vid.videoPath}
                                        poster={vid.thumbnailPath}
                                        controls
                                        playsInline
                                        style={{ width: '100%', borderRadius: 8 }}
                                    />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper> : <Typography>No Videos Present</Typography>}
        </Box>
    )
}

export default VideosCarousel;
