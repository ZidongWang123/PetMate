import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

import logo from '../../images/petHouse.png';
import './Navbar.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import decode from 'jwt-decode';

import { darkPurple, paleYellow, orange } from "../../constant/actionTypes";
import ConfirmDialog from '../Widget/ConfirmDialog/ConfirmDialog';
import Subscription from './Subscription';


const pages = ['Explore', 'Groups', 'Event', 'Service'];
const settings = ['Personal Info', 'My posts', 'My groups', 'My events', 'My services', 'How it works', 'Logout'];

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [activeButton, setActiveButton] = useState(localStorage.getItem('ActiveButton') || 'Explore');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const pageNavigate = (page) => {
        setActiveButton(page);
        localStorage.setItem('ActiveButton', page);
        navigate(`/${page.toLowerCase()}`);
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
        setActiveButton(null);
        localStorage.setItem('ActiveButton', null);
        if (typeof setting === 'string') {
            navigate(`/${setting.toLowerCase().replace(/\s+/g, '')}`);
        }
        setAnchorElUser(null);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');

        setUser(null);

        window.location.reload();//极端方法，不推荐，但是暂时没有更好的办法
    };

    React.useEffect(() => {
        const handleBrowserBack = () => {
            const currentPath = window.location.pathname.toLowerCase().slice(1);
            const formattedButton = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

            console.log(currentPath);
            console.log(formattedButton);
            if (pages.includes(formattedButton)) {
                setActiveButton(formattedButton);
                localStorage.setItem('ActiveButton', formattedButton);
            } else {
                setActiveButton(null);
            }
        };

        const handlePopstate = () => {
            handleBrowserBack();
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, []);

    React.useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar position="static" sx={{ backgroundColor: paleYellow }}>
            <Container maxWidth="xxl" className="container">
                <Toolbar disableGutters={true}>

                    <img src={logo} alt="logo" key="small-logo" className="small-logo" />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        onClick={() => pageNavigate('Explore')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Comic Sans MS',
                            fontWeight: 800,
                            letterSpacing: '.1rem',
                            color: darkPurple,
                            textDecoration: 'none',
                        }}
                    >
                        PetMate
                    </Typography>


                    <Box sx={{ flexGrow: 1, fontFamily: 'Comic Sans MS', display: { xs: 'flex', md: 'none' } }}>
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                fontFamily: 'Comic Sans MS',
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ fontFamily: 'Comic Sans MS', fontWeight: 500 }}>
                                    <Typography textAlign="center" fontFamily="Comic Sans MS">{page}</Typography>
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
                        onClick={() => pageNavigate('Explore')}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Comic Sans MS',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: darkPurple,
                            textDecoration: 'none',
                        }}
                    >
                        PetMate
                    </Typography>

                    <Box sx={{ flexGrow: 1, fontFamily: 'Comic Sans MS', display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => pageNavigate(page)}
                                sx={{
                                    fontFamily: 'Comic Sans MS',
                                    color: darkPurple,
                                    backgroundColor: paleYellow,
                                    display: 'block',
                                    fontWeight: 800,
                                    textDecoration: activeButton === page ? 'underline !important' : 'none',
                                    textDecorationThickness: '2px !important',
                                    textDecorationSkipInk: 'none !important',
                                    textUnderlineOffset: '4px !important',
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Toolbar>
                        {user ? (
                            <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Subscription
                                    button="Join us!"
                                    title="Be our membership now!"
                                    contentText={`
                                                    Sharing Posts and Building Groups!
                                                    Creating Events and Sharing Services!
                                                    Higher Exposure in Explore!
                                                    Pure Mode! No Ads!
                                                    ...
                                                    
                                                    More benefits of membership are waiting for you!
                                        `}
                                    style={{ marginRight: '10px' }}
                                />
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: '20px' }}>
                                        <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    PaperProps={{
                                        style: {
                                            borderRadius: '20px',
                                        },
                                    }}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={() => {
                                                handleCloseUserMenu(setting);
                                                if (setting === "Logout") {
                                                    logout();
                                                }
                                            }}>
                                            <Typography sx={{
                                                fontFamily: 'Comic Sans MS',
                                                fontWeight: 800,
                                                color: setting === 'Logout' ? 'red' : 'inherit',
                                            }}>{setting}</Typography>
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