import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddPosts = ({ addPost }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && location && image) {
      const newPost = { 
        id: Date.now(), 
        title, 
        location, 
        image, 
        views: '0 views', 
        time: 'Just now', 
        likes: 0,
        comments: [],
        showCommentBox: false
      };
      addPost(newPost);
      setTitle('');
      setLocation('');
      setImage('');
      navigate('/posts'); // Navigate to the posts page after adding the post
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'whitesmoke', fontFamily: 'poppins' }}>
        Add a New Post
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', maxWidth: 500, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ marginTop: '16px' }}
        >
          Add Post
        </Button>
      </Box>
    </Box>
  );
};

export default AddPosts;
