import { Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const ErrorPanel = ({ message }: { message: string }): JSX.Element => {
  return (
    <Typography variant="h5" component="div" className="text-red-500">
      <ErrorOutlineOutlinedIcon fontSize="large" />
      {message}
    </Typography>
  );
};

export default ErrorPanel;
