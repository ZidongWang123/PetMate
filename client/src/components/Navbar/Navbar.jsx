import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import logo from "../../images/petHouse.png";
import "./Navbar.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import decode from "jwt-decode";

import { darkPurple, paleYellow, orange } from "../../constant/actionTypes";
import ConfirmDialog from '../Widget/ConfirmDialog/ConfirmDialog';
import Subscription from './Subscription';
import Switch from '@mui/material/Switch';

const pages = ['Explore', 'Groups', 'Event', 'Service'];
const settings = [
    'Personal Info', 
    'My posts',
    'My articles', 
    'My groups', 
    'My events', 
    'My services', 
    'Puremode', 
    'Logout'];
const myService = ['Applied Services', 'Created Services'];
const myEvent = ['Applied Events', 'Created Events'];

function Navbar({ handleSecNavbar,isAdsOpen,onAdsChange}) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [activeButton, setActiveButton] = useState(localStorage.getItem('ActiveButton') || 'Explore');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

    const pageNavigate = (page) => {
        console.log(page)
        setActiveButton(page);
        localStorage.setItem('ActiveButton', page);
        navigate(`/${page.toLowerCase()}`);
        handleSecNavbar([], '');
        window.location.reload();
    };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

    const handleCloseUserMenu = (setting) => {
        if (
            typeof setting === 'string' && 
            setting !== 'My services' && 
            setting !== 'My events' && 
            setting !== 'Logout'&&
            setting !=="My posts"&&
            setting !=="Puremode"
        ) {
            navigate(`/${setting.toLowerCase().replace(/\s+/g, '')}`);
        }
        setAnchorElUser(null);

    if (setting === "My services") {
      handleSecNavbar(myService, "My services");
      navigate(`/appliedservices`);
    }

        if (setting === 'My events') {
            handleSecNavbar(myEvent, 'My events');
            navigate(`/appliedevents`);
        }
        if(setting==="My posts"){
            navigate(`/userExplorePosts/${user.result._id}`);
        }
    };

  const logout = () => {
    try {
      dispatch({ type: "LOGOUT" });

      navigate("/");

      setUser(null);

      window.location.reload(); //极端方法，不推荐，但是暂时没有更好的办法
    } catch (error) {
      console.log("logout:", error);
    }
  };

  React.useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase().slice(1);
    const formattedButton =
      currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

    if (pages.includes(formattedButton)) {
      setActiveButton(formattedButton);
      localStorage.setItem("ActiveButton", formattedButton);
    } else {
      setActiveButton(null);
    }
  }, [location]);

  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", borderBottom: "1px solid gray" }}
    >
      <Container maxWidth="xxl" className="container">
        <Toolbar disableGutters={true}>
          <img src={logo} alt="logo" key="small-logo" className="small-logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={() => pageNavigate("Explore")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Comic Sans MS",
              fontWeight: 800,
              letterSpacing: ".1rem",
              color: darkPurple,
              textDecoration: "none",
            }}
          >
            PetMate
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              fontFamily: "Comic Sans MS",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#393c7c"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                fontFamily: "Comic Sans MS",
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ fontFamily: "Comic Sans MS", fontWeight: 500 }}
                >
                  <Typography textAlign="center" fontFamily="Comic Sans MS">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <img src={logo} alt="logo" key="large-logo" className="large-logo" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            onClick={() => pageNavigate("Explore")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Comic Sans MS",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: darkPurple,
              textDecoration: "none",
            }}
          >
            PetMate
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              fontFamily: "Comic Sans MS",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => pageNavigate(page)}
                sx={{
                  fontFamily: "Comic Sans MS",
                  color: activeButton === page ? "white" : darkPurple,
                  backgroundColor: activeButton === page ? darkPurple : "white",
                  display: "block",
                  fontWeight: 800,
                  /* textDecoration: activeButton === page ? 'underline !important' : 'none', */
                  textDecorationThickness: "2px !important",
                  textDecorationSkipInk: "none !important",
                  textUnderlineOffset: "4px !important",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Toolbar>
            {user ? (
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {user.result.isPrime ? (
                  <div className="membership">
                    Hi,{user.result.name},have a good time in PetMate!
                  </div>
                ) : (
                  <Subscription />
                )}
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, marginLeft: "20px" }}
                  >
                    {user.result.avatar ? (
                      <Avatar src={user.result.avatar} />
                    ) : (
                      <Avatar src={user.result.imageUrl}>
                        {user.result.name.charAt(0)}
                      </Avatar>
                    )}
                    {/* todo: show the avatar not the name of user */}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    style: {
                      borderRadius: "20px",
                    },
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu(setting);
                      }}
                    >
                      {setting === "Logout" ? (
                        <ConfirmDialog
                          fontSize="20px"
                          padding="0px"
                          button="Logout"
                          title="Confirm Logout"
                          contentText={`

                                                                    Are you sure you want to logout?

                                                                `}
                                                    dialogColor='#6f0000'
                                                    buttonColor='red'
                                                    onConfirm={logout}
                                                    />) :setting==="Puremode"?(user.result.isPrime&&
                                                        <div style={{display:"flex",alignItems:"center"}}>
                                                            < Typography sx={{
                                                                fontFamily: 'Comic Sans MS',
                                                                fontWeight: 800,
                                                                color:'inherit',
                                                            
                                                            }}>{setting}</Typography>
                                                            <Switch
                                                                checked={!isAdsOpen}
                                                                onChange={onAdsChange}
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                            />
                                                        </div>
                                                    ):(
                                                < Typography sx={{
                                                    fontFamily: 'Comic Sans MS',
                                                    fontWeight: 800,
                                                    color: setting === 'Logout' ? 'red' : 'inherit',
                                                }}>{setting}</Typography>)}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>) : (
                            <Button component={Link} to="/auth" onClick={() => setActiveButton(null)} variant="contained" sx={{ fontFamily: 'Comic Sans MS', color: darkPurple, backgroundColor: orange }}>Sign In</Button>
                        )}
                    </Toolbar>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;
