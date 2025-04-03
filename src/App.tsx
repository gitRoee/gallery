import VideosCarouselContainer from './components/videosCarousel/container';
import UploadFilesDialogContainer from './components/uploadFilesDialog/container';
import { useState } from 'react';
import { video } from '../types/videos';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSnackbar } from './context/ErrorContext';

const App = () => {
  const [videos, setVideos] = useState<video[]>([]);
  const { errorMessage, setError } = useSnackbar();

  const onVideosChange = (videos: video[]) => {
    setVideos(videos);
  }

  const addVideos = (videos: video[]) => {
    setVideos(prev => prev.concat(videos));
  }

  return (
    <>
      <UploadFilesDialogContainer addVideos={addVideos} />
      <VideosCarouselContainer videos={videos} onVideosChange={onVideosChange} />
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError('')} variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
