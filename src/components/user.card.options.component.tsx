import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SortByAlphaOutlinedIcon from "@mui/icons-material/SortByAlphaOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useUsersStore } from "@hooks/user.store.hooks";
import { useState } from "react";
import { ESortDirection } from "@model/constants";

const UserCardOptions = (): JSX.Element => {
  /**
   * intentionally demonstrating here the state management of zustand instead
   * of just passing the variable directly into the components
   */
  const setSortDirection = useUsersStore((state) => state.setSortDirection);

  const [selectedDirection, setSelectedDirection] = useState<ESortDirection>(
    ESortDirection.ASCENDING,
  );

  const handleSortDirChange = () => {
    const newDirection =
      selectedDirection === ESortDirection.ASCENDING
        ? ESortDirection.DESCENDING
        : ESortDirection.ASCENDING;
    setSelectedDirection(newDirection);
    setSortDirection(newDirection);
  };

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Options
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleSortDirChange}>
          <ListItemIcon>
            <SortByAlphaOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sort Card by Name" />
          {selectedDirection === ESortDirection.ASCENDING ? (
            <ArrowDropUpOutlinedIcon />
          ) : (
            <ArrowDropDownOutlinedIcon />
          )}
        </ListItemButton>
      </List>
    </>
  );
};

export default UserCardOptions;
