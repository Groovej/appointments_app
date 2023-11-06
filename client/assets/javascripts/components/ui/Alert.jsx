import React, { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertComponent(props) {
  const [open, setOpen] = useState(props.open);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} key={'top' + 'center'} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        { props.errorText }
      </Alert>
    </Snackbar>
  );
}
