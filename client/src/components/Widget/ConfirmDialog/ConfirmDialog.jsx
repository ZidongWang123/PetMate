import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./ConfirmDialog.css";

export default function ConfirmDialog({ button, title, contentText, dialogColor }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}
                sx={{
                    fontFamily: 'Comic Sans MS',
                    color: dialogColor,
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
            >
                <DialogTitle id="alert-dialog-title"
                    sx={{
                        fontFamily: 'Comic Sans MS',
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        fontSize: '25px',
                        backgroundColor: dialogColor,
                    }}>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            color: dialogColor,
                            textTransform: 'none',
                            fontSize: '15px',
                            whiteSpace: 'pre-line',
                        }}>
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='outlined' 
                        onClick={handleClose}
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            color: dialogColor,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '20px',
                            borderColor: dialogColor,
                            borderRadius: '10px',
                        }}>Cancel</Button>
                    <Button onClick={handleClose} autoFocus
                        sx={{
                            fontFamily: 'Comic Sans MS',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '20px',
                            borderRadius: '10px',
                            backgroundColor: dialogColor,
                        }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}