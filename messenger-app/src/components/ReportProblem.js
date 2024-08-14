import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import PrivacyTipOutlined from '@mui/icons-material/PrivacyTipOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined';
import AppRegistrationOutlined from '@mui/icons-material/AppRegistrationOutlined';

function HelpCenter() {
  const [openDialog, setOpenDialog] = useState(null);

  const handleOpen = (section) => {
    setOpenDialog(section);
  };

  const handleClose = () => {
    setOpenDialog(null);
  };

  const renderDialog = (section, content) => (
    <Dialog open={openDialog === section} onClose={handleClose}>
      <DialogTitle>{section}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 1,
        boxShadow: 2,
        p: 2,
        width: '100%',
        maxWidth: '600px',
        mx: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Help Center
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box>
          <IconButton onClick={() => handleOpen('Terms and Conditions')}>
            <InfoOutlined />
          </IconButton>
          <Typography variant="subtitle1" display="inline" gutterBottom>
            <Link onClick={() => handleOpen('Terms and Conditions')} underline="none">
              Terms and Conditions
            </Link>
          </Typography>
          {renderDialog('Terms and Conditions', 'Detailed terms and conditions content goes here.')}
        </Box>
        
        <Box>
          <IconButton onClick={() => handleOpen('Privacy Policy')}>
            <PrivacyTipOutlined />
          </IconButton>
          <Typography variant="subtitle1" display="inline" gutterBottom>
            <Link onClick={() => handleOpen('Privacy Policy')} underline="none">
              Privacy Policy
            </Link>
          </Typography>
          {renderDialog('Privacy Policy', 'Detailed privacy policy content goes here.')}
        </Box>

        <Box>
          <IconButton onClick={() => handleOpen('Yearly Reminder of Our Terms of Service')}>
            <NotificationsOutlined />
          </IconButton>
          <Typography variant="subtitle1" display="inline" gutterBottom>
            <Link onClick={() => handleOpen('Yearly Reminder of Our Terms of Service')} underline="none">
              Yearly Reminder of Our Terms of Service
            </Link>
          </Typography>
          {renderDialog('Yearly Reminder of Our Terms of Service', 'Information about yearly reminders goes here.')}
        </Box>

        <Box>
          <IconButton onClick={() => handleOpen('Channel Reports')}>
            <ReportProblemOutlined />
          </IconButton>
          <Typography variant="subtitle1" display="inline" gutterBottom>
            <Link onClick={() => handleOpen('Channel Reports')} underline="none">
              Channel Reports
            </Link>
          </Typography>
          {renderDialog('Channel Reports', 'Information about channel reports goes here.')}
        </Box>

        <Box>
          <IconButton onClick={() => handleOpen('App Info')}>
            <AppRegistrationOutlined />
          </IconButton>
          <Typography variant="subtitle1" display="inline" gutterBottom>
            <Link onClick={() => handleOpen('App Info')} underline="none">
              App Info
            </Link>
          </Typography>
          {renderDialog('App Info', 'Details about the app info go here.')}
        </Box>
      </Box>
    </Box>
  );
}

export default function HelpPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <HelpCenter />
    </Box>
  );
}
