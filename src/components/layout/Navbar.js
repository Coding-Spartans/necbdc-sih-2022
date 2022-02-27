import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CareerIcon from "@mui/icons-material/Insights";

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
      width: "100%",
    },
  },
}));

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = useNavigate();
  let location = useLocation();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openLoginPage = () => {
    handleMenuClose();
    if (props.pathname !== "/login") props.onEnterOut();

    if (props.pathname === "/predict-career") navigate("/login");
    else
      setTimeout(() => {
        navigate("/login");
      }, 400);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={openLoginPage}>My account</MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar
          sx={{
            backgroundColor: "transparent",
            boxShadow: "0",
          }}
          className={classes.navBar}
          position="static"
        >
          <Toolbar>
            <div className={classes.logo}>
              {window.innerWidth > 1000 ? (
                <Link to="/">Career Dendrogram DR710</Link>
              ) : (
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon color="white" />
                </IconButton>
              )}
            </div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ width: { sm: "30rem", xl: "40rem" } }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ display: window.innerWidth > 1000 ? "flex" : "none" }}>
              <div className={classes.logo}>
                <Link to="/predict-career">Predict your career</Link>
              </div>
            </Box>
            <Box sx={{ display: "flex" }}>
              {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
              <div onClick={openLoginPage} className={classes.logo}>
                Login
              </div>
            </Box>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu}
      {renderMenu} */}
        <Drawer anchor={"left"} open={isMenuOpen} onClose={handleMenuClose}>
          <Box
            sx={{
              width: 250,
              marginTop: { xs: "0.5rem", sm: "1rem" },
            }}
            role="presentation"
          >
            <List>
              <ListItem
                onClick={() => {
                  navigate("/");
                }}
                disabled={location.pathname === "/"}
                button
              >
                <ListItemIcon sx={{ minWidth: "46px" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem
                onClick={() => {
                  navigate("/predict-career");
                }}
                disabled={location.pathname === "/predict-career"}
                button
              >
                <ListItemIcon sx={{ minWidth: "46px" }}>
                  <CareerIcon />
                </ListItemIcon>
                <ListItemText primary={"Predict your career"} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon sx={{ minWidth: "46px" }}>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary={"My Account"} />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box></Box>
    </React.Fragment>
  );
}
