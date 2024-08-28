import { Box, CircularProgress, Dialog } from "@mui/material";

export interface LoadingDialogProps {
  open: boolean;
  onClose?: () => void;
}

const LoadingDialog = (props: LoadingDialogProps): JSX.Element => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose?.();
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <Box className="flex flex-col items-center m-8">
          <Box>
            <CircularProgress />
          </Box>
          <Box>
            <span>Signing in...</span>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default LoadingDialog;
