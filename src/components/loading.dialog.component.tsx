import { CircularProgress, Dialog } from "@mui/material";

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
        <div className="flex flex-col items-center m-8">
            <div>
                <CircularProgress />
            </div>
            <div>
                <span>Signing in...</span>
            </div>
        </div>
      </Dialog>
    </>
  );
};

export default LoadingDialog;
