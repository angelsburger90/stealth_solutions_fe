import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TUser } from "@model/data.types";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmojiTransportationOutlinedIcon from "@mui/icons-material/EmojiTransportationOutlined";

const UserDetailsDialog = ({
  openDialog = false,
  onCloseDialog,
  userDetails,
}: {
  openDialog: boolean;
  onCloseDialog: () => void;
  userDetails: TUser;
}): JSX.Element => {
  const handleClose = () => {
    onCloseDialog?.();
  };

  const ItemEntry = ({
    icon,
    contentLabel = "",
    contentLabelSecondary,
  }: {
    icon: JSX.Element;
    contentLabel: string;
    contentLabelSecondary?: string;
  }) => {
    return (
      <Grid item xs={6} md={12}>
        <List dense={true}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{icon}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={contentLabel}
              secondary={contentLabelSecondary}
            />
          </ListItem>
        </List>
      </Grid>
    );
  };
  const getAddressLabel = (): string => {
    return `Address: ${userDetails.address?.suite} 
        ${userDetails.address?.street}, 
        ${userDetails.address?.city}, 
        ${userDetails.address?.zipcode}`;
  };

  const getGetLocationLabel = (): string => {
    return `Geolocation: ${userDetails.address?.geo?.lat},  
        ${userDetails.address?.geo?.lng}`;
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{userDetails?.name}</DialogTitle>
        <DialogContent dividers={true}>
          <div id="scroll-dialog-description" tabIndex={-1}>
            <Grid container spacing={1}>
              <ItemEntry
                icon={<BadgeOutlinedIcon />}
                contentLabel={userDetails?.username ?? ""}
              />
              <ItemEntry
                icon={<MailOutlineOutlinedIcon />}
                contentLabel={userDetails?.email ?? ""}
              />
              <ItemEntry
                icon={<LocalPhoneOutlinedIcon />}
                contentLabel={userDetails?.phone ?? ""}
              />
              <ItemEntry
                icon={<LanguageOutlinedIcon />}
                contentLabel={userDetails?.website ?? ""}
              />
              <ItemEntry
                icon={<HomeOutlinedIcon />}
                contentLabel={getAddressLabel() ?? ""}
              />
              <ItemEntry
                icon={<LocationOnOutlinedIcon />}
                contentLabel={getGetLocationLabel() ?? ""}
              />
              <ItemEntry
                icon={<EmojiTransportationOutlinedIcon />}
                contentLabel={userDetails.company?.name ?? ""}
                contentLabelSecondary={`${userDetails.company?.catchPhrase}`}
              />
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UserDetailsDialog;
