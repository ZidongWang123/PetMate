import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {paleYellow,darkPurple,orange} from '../../constant/actionTypes'

export default function Subscription({ button, title, contentText }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const directToPayment = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}
                sx={{
                    fontFamily: 'Comic Sans MS',
                    color: darkPurple,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '20px',
                }}>
                {button}
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
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            textTransform: 'none',
                            fontSize: '17px',
                            whiteSpace: 'pre-line',
                        }}>
                        {contentText}
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