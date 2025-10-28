import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MySnackbar({openToast,message}) {

  return (
    <div>
      <Snackbar open={openToast} autoHideDuration={6000} style={{direction:"ltr"}}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}