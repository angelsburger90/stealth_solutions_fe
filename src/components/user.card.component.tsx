import { TUser } from "@model/data.types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { useState } from "react";
import UserDetailsDialog from "./user.details.dialog.component";

const UserCard = ({ userDetails }: { userDetails: TUser }): JSX.Element => {
  const [openMoreDetails, setOpenMoreDetails] = useState(false);
  const onHandleMoreDetails = (): void => {
    setOpenMoreDetails(true);
  };

  return (
    <>
      <UserDetailsDialog
        openDialog={openMoreDetails}
        onCloseDialog={() => setOpenMoreDetails(false)}
        userDetails={userDetails}
      />
      <Card
        variant="outlined"
        key={`${userDetails.name}_${userDetails.id}`}
        className="mb-2"
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <BadgeOutlinedIcon className="mr-2" fontSize="small" />
            {userDetails.username}
          </Typography>
          <Typography variant="h4" component="div">
            {userDetails.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <MailOutlineOutlinedIcon className="mr-2" fontSize="small" />
            {userDetails.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onHandleMoreDetails}>
            More Details
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserCard;
