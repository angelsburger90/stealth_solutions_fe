import { TUser } from "@model/data.types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ThreePOutlinedIcon from "@mui/icons-material/ThreePOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import { convertToSimpleDateFormat } from "@services/date.services";

const UserCard = ({ userDetails }: { userDetails: TUser }): JSX.Element => {
  const getAvatarInitial = () => {
    if (userDetails.name.length > 1) {
      return userDetails.name.substring(0, 1)?.toUpperCase();
    }
    return "N"; //as none
  };

  return (
    <>
      <Card className="w-11/12 sm:w-84 md:w-96">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {getAvatarInitial()}
            </Avatar>
          }
          title={userDetails.name}
          subheader={
            <>
              <MailOutlinedIcon fontSize="small" />
              <a href={`mailto:${userDetails.email}`} className="ml-1">
                {userDetails.email}
              </a>
            </>
          }
        />
        <CardMedia
          component="img"
          height="194"
          image="https://i.imgur.com/kFCTrZW.png"
          alt={userDetails.name}
        />
        <CardContent className="[&_div]:mb-2 [&_svg]:mr-2 text-sm md:text-base">
          <Box>
            <Box>
              <ThreePOutlinedIcon fontSize="small" />
              User created at:{" "}
            </Box>
            <Box className="font-bold text-orange-500">
              {convertToSimpleDateFormat(userDetails.created_at.toString())}
            </Box>
          </Box>
          <Box>
            <Box>
              <MarkEmailReadOutlinedIcon fontSize="small" />
              Email verified on:{" "}
            </Box>
            <Box className="font-bold text-orange-500">
              {convertToSimpleDateFormat(
                userDetails.email_verified_at.toString(),
              )}
            </Box>
          </Box>
          <Box>
            <Box>
              <ContactPageOutlinedIcon fontSize="small" />
              Account last update on:{" "}
            </Box>
            <Box className="font-bold text-orange-500">
              {convertToSimpleDateFormat(
                userDetails.email_verified_at.toString(),
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
