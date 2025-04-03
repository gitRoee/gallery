import { IconButton, Box } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react';
import UploadFilesDialog from '.';
import { upload } from '@vercel/blob/client';
import { video } from '../../../types/videos';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from '../../context/ErrorContext';

type Props = {
    addVideos: (videos: video[]) => void;
}

const UploadFilesDialogContainer = ({ addVideos }: Props) => {
    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [progressMap, setProgressMap] = useState<Record<string, number>>({});
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const { setError } = useSnackbar()

    const removeFile = (fileName: string) => {
        setSelectedFiles(prev => prev.filter(file => file.name !== fileName));
    };

    const onFilesChange = (files: File[]) => {
        setSelectedFiles(files);
    }

    const onDialogClose = () => {
        setOpen(false);
        setIsUploading(false);
        setSelectedFiles([]);
        setProgressMap({});
    }

    const onUpload = async () => {
        try {
            setIsUploading(true);
            const generatedFolderName = uuidv4();

            const settledBlob = await Promise.allSettled(selectedFiles.map(file =>
                upload(`${generatedFolderName}/${file.name}`, file, {
                    access: 'public',
                    handleUploadUrl: '/api/videos/upload',
                    multipart: true,
                    onUploadProgress: ({ percentage }) => {
                        setProgressMap(prev => ({ ...prev, [file.name]: percentage }));
                    },
                })
            ));

            const videos = settledBlob.filter(blob => blob.status === 'fulfilled').map(blob => ({
                id: uuidv4(),
                videoPath: blob.value.url,
                thumbnailPath: ''
            }));

            addVideos(videos);
            setSelectedFiles([]);
            setIsUploading(false);

            const rejectedFiles = settledBlob.filter(blob => blob.status === 'rejected');

            if (rejectedFiles.length > 0) {
                setError(`${rejectedFiles.length} files failed to upload.`);
            }
        } catch (err: unknown) {
            setError((err as Error).message || 'Unexpected error');
        }
    }

    return (
        <>
            <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                <IconButton onClick={() => setOpen(true)} color="primary" size="large">
                    <UploadIcon />
                </IconButton>
            </Box>
            <UploadFilesDialog
                isOpen={open}
                onDialogClose={onDialogClose}
                onFilesChange={onFilesChange}
                onUpload={onUpload}
                removeFile={removeFile}
                selectedFiles={selectedFiles}
                progressMap={progressMap}
                isUploading={isUploading}
            />
        </>
    );
};

export default UploadFilesDialogContainer;