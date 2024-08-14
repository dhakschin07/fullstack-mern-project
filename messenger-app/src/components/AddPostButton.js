import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddPostButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Only show the button on the "/posts" page
  if (location.pathname !== '/posts') {
    return null;
  }

  const handleClick = () => {
    navigate('/add-post');
  };

  return (
    <Fab 
      color="primary" 
      aria-label="add" 
      onClick={handleClick} 
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddPostButton;
