import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
  Menu,
  Avatar,
} from "@mui/material";
import { useState } from "react";

import { AccountCircle } from "@mui/icons-material";
import { useAuthenticateUser } from "@hooks/useUserAuthDetails.hooks";
import { useNavigate } from "react-router-dom";
import { TAppPage } from "@model/data.types";


const MenuFilter = ({}: {}): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const {clearCurrentSession} = useAuthenticateUser();
  const navigate = useNavigate();

  const menuId = "primary-account-menu";

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () =>{
    handleMenuClose();
    clearCurrentSession();
    navigate(TAppPage.ROOT);
  }

  return (
    <>
      <Box className="flex grow">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Stealth Solution
            </Typography>
            <Box className="flex grow" />
            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                 <Avatar alt="Profile Picture" src="https://i.imgur.com/kFCTrZW.png" />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MenuFilter;
