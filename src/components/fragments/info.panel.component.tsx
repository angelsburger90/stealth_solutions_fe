import { Typography } from "@mui/material";
import FlutterDashOutlinedIcon from "@mui/icons-material/FlutterDashOutlined";

const InfoPanel = ({ message }: { message: string }): JSX.Element => {
  return (
    <Typography variant="h5" component="div" className="text-gray-500">
      <FlutterDashOutlinedIcon fontSize="large" /> {message}
    </Typography>
  );
};

export default InfoPanel;
