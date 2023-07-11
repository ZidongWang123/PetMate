import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { paleYellow, darkPurple, orange } from '../../constant/actionTypes'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (location.pathname === '/subscription') {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [location]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const directToPayment = () => {
        setOpen(false);
    };

    const handleClose = () => {
        navigate("/explore");
        setOpen(false);
    };

    return (
        <div style={{ marginRight: '10px' }}>
            <Button onClick={handleClickOpen}
                sx={{
                    fontFamily: 'Comic Sans MS',
                    color: darkPurple,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '20px',
                }}>
                Join us!
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    backgroundColor: paleYellow,
                }}
            >
                <DialogTitle id="alert-dialog-title"
                    sx={{
                        fontFamily: 'Comic Sans MS',
                        color: darkPurple,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '25px',
                        justifyContent: 'center',
                        display: 'flex',
                        borderBottom: '1px solid',
                    }}>
                    Be our membership now!
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            textTransform: 'none',
                            fontSize: '17px',
                            whiteSpace: 'pre-line',
                        }}>
                        
                        Sharing Posts and Building Groups!
                        Creating Events and Sharing Services!
                        Higher Exposure in Explore!
                        Pure Mode! No Ads!
                        ...

                        More benefits of membership are waiting for you!
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        justifyContent: 'center',
                    }}>
                    <Button
                        onClick={directToPayment}
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '20px',
                            backgroundColor: orange,
                            borderRadius: '10px',
                            marginRight: '20px',
                        }}>9$ per month</Button>
                    <Button onClick={directToPayment} autoFocus
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '20px',
                            backgroundColor: darkPurple,
                            borderRadius: '10px',
                            marginLeft: '20px',
                        }}>
                        90$ per year
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}