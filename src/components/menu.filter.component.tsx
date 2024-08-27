import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  alpha,
  InputBase,
  styled,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, FocusEventHandler, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SEARCH_FILTER, TSearchFilter } from "@model/constants";
import { getValue } from "@services/object.utils.services";
import classNames from "classnames";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

/* eslint-disable  @typescript-eslint/no-explicit-any */
type TBlurEvent =
  | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined
  | any;

const MenuFilter = ({
  onSearch,
}: {
  onSearch?: (selectedFilter: TSearchFilter, searchQuery: string) => void;
}): JSX.Element => {
  const [selectedFilter, setSelectedFilter] = useState<TSearchFilter>("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [isQueryErr, setIsQueryErr] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedFilter(event.target.value as TSearchFilter);
  };
  const onHandleSearch = () => {
    if (isQueryErr) return;
    if (searchQuery.length <= 0) {
      setIsQueryErr(true);
      return;
    }
    onSearch?.(selectedFilter as TSearchFilter, searchQuery);
  };
  const onHandleSearchQuery = (event: TBlurEvent) => {
    setSearchQuery(getValue(event, "target.value") ?? "");
  };
  function onTextChangeHandler(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const txtVal = event.target?.value ?? "";
    if (txtVal && txtVal.length === 1) {
      setIsQueryErr(true);
      return;
    }
    setIsQueryErr(false);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Ryan Seth Roldan - Exam
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                className={classNames({
                  "border border-red-700": isQueryErr,
                })}
                error={isQueryErr}
                placeholder="Search user…"
                inputProps={{ "aria-label": "search" }}
                onBlur={onHandleSearchQuery}
                onChange={onTextChangeHandler}
              />
            </Search>
            <Select
              size="small"
              value={selectedFilter}
              onChange={handleChange}
              label="Filter"
              className="bg-white mr-2"
            >
              {Object.keys(SEARCH_FILTER).map((key: string, i: number) => (
                <MenuItem value={key} key={`${key}_${i}`}>
                  {getValue(SEARCH_FILTER, key)}
                </MenuItem>
              ))}
            </Select>

            <Button
              variant="outlined"
              className="!bg-white ml-1"
              onClick={onHandleSearch}
            >
              Filter
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MenuFilter;
