import React from "react";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { paleYellow, darkPurple } from "../../constant/actionTypes";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SecondNavbar = ({ pages, activityType }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeSetting, setActiveSetting] = React.useState(pages[0]);

    React.useEffect(() => {
        const currentPath = window.location.pathname.toLowerCase().slice(1);
        const pageName = currentPath.split("/").pop();
        let formattedButton = '';
        if (pageName === 'createdevents') {
            formattedButton = 'Created Events';
        } else if (pageName === 'appliedevents') {
            formattedButton = 'Applied Events';
        } else if (pageName === 'createdservices') {
            formattedButton = 'Created Services';
        } else if (pageName === 'appliedservices') {
            formattedButton = 'Applied Services';
        }else{
            formattedButton = '';
        };

        if (pages.includes(formattedButton)) {
            setActiveSetting(formattedButton);
            localStorage.setItem('ActiveSetting' + activityType, formattedButton);
        } else {
            setActiveSetting(null);
        }
    }, [location, activityType, pages]);

    const pageNavigate = (page) => {
        setActiveSetting(page);
        localStorage.setItem('ActiveSetting' + activityType, page);
        navigate(`/${page.toLowerCase().replace(/\s+/g, '')}`);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: paleYellow, borderBottom:'1px solid gray', boxShadow:'none', marginBottom:'2px' }}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters={true}>
                    <Box sx={{ flexGrow: 1, fontFamily: 'Comic Sans MS' }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => pageNavigate(page)}
                                sx={{
                                    fontFamily: 'Comic Sans MS',
                                    color: darkPurple,
                                    backgroundColor: paleYellow,
                                    fontWeight: 900,
                                    fontSize: '15px',
                                    textDecoration: activeSetting === page ? 'underline !important' : 'none',
                                    textDecorationThickness: '2px !important',
                                    textDecorationSkipInk: 'none !important',
                                    textUnderlineOffset: '4px !important',
                                    textTransform: 'none',
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default SecondNavbar;