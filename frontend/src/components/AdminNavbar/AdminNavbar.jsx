import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "../../Styles/Admin/AdminNavbar.css";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaUserGraduate, FaHome, FaChartBar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Z from "../../assets/Admin/Images/ZWhite.jfif";
import relevantzzzedited from "../../assets/Admin/Images/relevantzedited.png";
import { Button, Modal } from "react-bootstrap";
import { UseDispatch, useDispatch } from "react-redux";
import { successdata } from "../../actions/Admin/loginAction";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Tooltip } from "@mui/material";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // Logout
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const confirmLogout = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogout = () => {
    // Clear session ID from storage
    // debugger
    sessionStorage.removeItem("AdminSessionId"); // Replace "sessionId" with your actual session ID key
    sessionStorage.removeItem("Role");
    dispatch(successdata(false));

    localStorage.removeItem("IndividualLearnerrowsPerPage");

    localStorage.removeItem("LearnerrowsPerPage");

    localStorage.removeItem("CourserowsPerPage");
    localStorage.removeItem("rowsPerPage");

    // Navigate to login page or home page
    navigate("/"); // Replace "/login" with the path to your login page
    setShowLogoutConfirmation(false); // Hide the confirmation toast
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <Box sx={{ display: "flex" }} id="admin_navbar">
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "#27235c" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
              ...(open && { display: "none" }),
            }}
          >
            {/* <MenuIcon /> */}
            <img src={Z} style={{ width: "3vw", height: "7vh" }} />
          </IconButton>
          <Typography id="adminNavhead">
            <h4>
              <span>L</span>earning e<span>X</span>perience <span>P</span>
              latform
            </h4>
          </Typography>

          <Box
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "100px",
            }}
          >
            {/* <img src={logo} alt="logo" /> */}
            <Button
              style={{
                position: "absolute",
                marginLeft: "55%",
                marginTop: "-22px",
              }}
              onClick={handleLogoutClick}
            >
              <span>Logout </span>
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* ... Drawer and other components */}

      {/* Logout Confirmation Modal */}
      <Modal
        className="mt-5"
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <img src={Z} className="iconDrawer" />
            ) : (
              <img
                src={relevantzzzedited}
                style={{ width: "13vw" }}
                className="iconDrawer"
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Tooltip title="Home" placement="left-start" arrow>
            <Link
              to="/admindashboard"
              style={{ textDecoration: "none", color: "#27235c" }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <FaHome style={{ color: "#27235c" }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="LXP Courses" placement="left-start" arrow>
            <Link
              to="/admincourse"
              style={{ textDecoration: "none", color: "#27235c" }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <FaBookOpenReader style={{ color: "#27235c" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Courses"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip
            title="Individual Learner Details"
            placement="left-start"
            arrow
          >
            <Link
              to="/learnerviewall"
              style={{ textDecoration: "none", color: "#27235c" }}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <FaUserGraduate style={{ color: "#27235c" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Learners"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </Tooltip>

          <Tooltip title="LXP Report" placement="left-start" arrow>
            <Link
              style={{ textDecoration: "none", color: "#27235c" }}
              to="/report"
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <FaChartBar style={{ color: "#27235c" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reports"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </Tooltip>
        </List>
      </Drawer>
    </Box>
  );
}
