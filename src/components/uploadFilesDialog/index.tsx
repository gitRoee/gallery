import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Close';
import FilePicker from '../filerPicker';

type Props = {
    isOpen: boolean;
    isUploading: boolean;
    progressMap: Record<string, number>;
    selectedFiles: File[];
    onDialogClose: VoidFunction;
    onFilesChange: (files: File[]) => void;
    onUpload: () => Promise<void>;
    removeFile: (fileName: string) => void;
}

const UploadFilesDialog = ({ isOpen,
    onDialogClose,
    onUpload,
    onFilesChange,
    selectedFiles,
    removeFile,
    progressMap,
    isUploading }: Props) => {

    return (
        <Dialog open={isOpen} onClose={onDialogClose} fullWidth>
            <DialogTitle>Select MP4 Videos to Upload</DialogTitle>
            <DialogContent>
                {!isUploading && <FilePicker onFilesSelected={onFilesChange} />}
                {selectedFiles.length > 0 ? (
                    <List>
                        {selectedFiles.map((file) => (
                            <ListItem key={`${file.name}-${file.size}`} divider>
                                <ListItemText primary={file.name} />
                                <progress value={progressMap[file.name] ?? 0} max={100} />
                                <IconButton
                                    onClick={() => removeFile(file.name)}
                                    size="small"
                                    disabled={isUploading}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        No files selected.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button disabled={isUploading} onClick={onDialogClose}>Close</Button>
                <Button disabled={selectedFiles.length === 0 || isUploading} onClick={onUpload}>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadFilesDialog;