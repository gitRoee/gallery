import { Button } from '@mui/material';
import { useRef } from 'react';
import { maxFileSizeInBytes } from '../../../consts/files';
import { useSnackbar } from '../../context/ErrorContext';

type Props = {
    onFilesSelected: (files: File[]) => void;
}

const FilePicker = ({ onFilesSelected }: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { setError } = useSnackbar()

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            const files = Array.from(e.target.files);
            const validFiles = files.filter(file => file.size < maxFileSizeInBytes);

            if (validFiles.length < files.length) {
                setError("Some files were larger than 30MB and were not added.");
            }

            onFilesSelected(Array.from(validFiles));
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="video/mp4"
                multiple
                onChange={handleFileChange}
                style={{ marginBottom: '20px' }}
            />
            <Button variant="outlined" onClick={handleButtonClick}>
                Select Videos
            </Button>
        </>
    );
};

export default FilePicker;