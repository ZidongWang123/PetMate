import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const vertical = 'bottom';
const horizontal = 'center';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * 
 * @param {status, message, severity} param0 status: boolean, message: string, severity: error | warning | info | success
 * @returns 
 */
const FeedbackMsg = ({ status, message, severity }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(status);
    }, [status]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default FeedbackMsg;