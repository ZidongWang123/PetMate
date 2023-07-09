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
const FeedbackMsg = ({ status, message, severity, onClose}) => {
   

    return (
        <Snackbar open={status} onClose={onClose} autoHideDuration={3000}  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default FeedbackMsg;