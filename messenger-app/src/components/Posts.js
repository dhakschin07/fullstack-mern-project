import React, { useState, useEffect } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Favorite from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserList from './UserList'; // Import the UserList component

const initialPostData = [ {
  id: 1,
  title: "",
  location: "Mrunal Thakur",
  image: "https://wallpapercave.com/wp/wp5295474.jpg",
  views: "6.3k views",
  time: "1 hour ago",
  likes: 0,
  comments: [],
  showCommentBox: false
},
{
  id: 2,
  title: "",
  location: "Switzerland",
  image: "https://th.bing.com/th/id/OIP.cDA1vRbJg7TWAHdWjr-jdwAAAA?rs=1&pid=ImgDetMain",
  views: "8.1k views",
  time: "2 hours ago",
  likes: 0,
  comments: [],
  showCommentBox: false
},
{
  id: 3,
  title: "",
  location: "Maldives",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400",
  views: "9.7k views",
  time: "3 hours ago",
  likes: 0,
  comments: [],
  showCommentBox: false
},
{
  id: 4,
  title: "",
  location: "Canada",
  image: "https://preview.redd.it/20pie90zmh071.png?width=960&crop=smart&auto=webp&s=c56f230ad859a5a472c0102cce0ba7615748f6ff",
  views: "5.4k views",
  time: "4 hours ago",
  likes: 0,
  comments: [],
  showCommentBox: false
},
{
  id: 5,
  title: "G",
  location: "Germany",
  image: "https://i.etsystatic.com/40517395/r/il/434c33/4641810540/il_1080xN.4641810540_9ddd.jpg",
  views: "7.2k views",
  time: "5 hours ago",
  likes: 0,
  comments: [],
  showCommentBox: false
},
{
  id: 6,
  title: "Royal Enfield",
  location: "Norway",
  image: "https://th.bing.com/th/id/OIP.lSU9nglCj6F1x6And07DxwAAAA?rs=1&pid=ImgDetMain",
  views: "10.4k views",
  time: "6 hours ago",
  likes: 0,
  comments: [],
  showCommentBox: false
},
{
  id: 7,
  title: "CSK",
  location: "IPL",
  image: "https://www.insidesport.in/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-30-at-3.48.59-AM-1.jpeg",
  views: "4.8k views",
  time: "7 hours ago",
  likes: 0,
  comments: [],
  showCommentBox: false
}
];

const Posts = ({ posts }) => {
  const [allPosts, setAllPosts] = useState([...initialPostData, ...posts]);
  const [commentInput, setCommentInput] = useState({});
  const [showUserList, setShowUserList] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    setAllPosts([...posts, ...initialPostData]);
  }, [posts]);

  const handleLike = (id) => {
    setAllPosts(allPosts.map(post =>
      post.id === id
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleToggleCommentBox = (id) => {
    setAllPosts(allPosts.map(post =>
      post.id === id
        ? { ...post, showCommentBox: !post.showCommentBox }
        : post
    ));
  };

  const handleCommentChange = (id, value) => {
    setCommentInput({ ...commentInput, [id]: value });
  };

  const handleAddComment = (id) => {
    const comment = commentInput[id]?.trim();
    if (comment) {
      setAllPosts(allPosts.map(post =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment], showCommentBox: false }
          : post
      ));
      setCommentInput({ ...commentInput, [id]: '' });
    }
  };

  const handleSendButtonClick = (post) => {
    setSelectedPost(post);
    setShowUserList(true);
  };

  const handleSendPostToUsers = (users) => {
    console.log(`Post ${selectedPost.id} sent to users:`, users);
    setSelectedPost(null);
    setShowUserList(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      {allPosts.map((post) => (
        <Card
          key={post.id}
          variant="outlined"
          sx={{ width: 400, mb: 3, position: 'relative' }}
        >
          <CardOverflow>
            <AspectRatio ratio="16/9" sx={{ height: 200 }}>
              <img
                src={post.image}
                loading="lazy"
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/400x400.png?text=Image+Not+Found'}
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="h5">{post.title}</Typography>
            <Typography level="body2">{post.location}</Typography>
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
            <Divider inset="context" />
            <CardContent orientation="horizontal" sx={{ gap: 1, alignItems: 'center' }}>
              <Box sx={{ display: 'inline', gap: 1, flex: 2 }}>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  sx={{ color: post.likes > 0 ? 'red' : 'inherit' }}
                >
                  {post.likes > 0 ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  onClick={() => handleToggleCommentBox(post.id)}
                >
                  <ModeCommentOutlined />
                </IconButton>
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  onClick={() => handleSendButtonClick(post)}
                >
                  <SendOutlined />
                </IconButton>
                <IconButton variant="plain" color="neutral" size="sm">
                  <BookmarkBorderRoundedIcon />
                </IconButton>
              </Box>
            </CardContent>
            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
              <Typography level="body2" fontWeight="medium" textColor="text.secondary" sx={{ flex: 1 }}>
                {post.likes} likes
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography level="body2" fontWeight="medium" textColor="text.secondary">
                {post.views}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography level="body2" fontWeight="medium" textColor="text.secondary">
                {post.time}
              </Typography>
            </CardContent>
            {post.showCommentBox && (
              <Box sx={{ padding: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Add a comment"
                  value={commentInput[post.id] || ''}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={() => handleAddComment(post.id)}
                >
                  Comment
                </Button>
              </Box>
            )}
            <CardContent sx={{ padding: 2 }}>
              {post.comments.map((comment, index) => (
                <Typography key={index} level="body2" textColor="text.secondary" sx={{ mb: 1 }}>
                  {comment}
                </Typography>
              ))}
            </CardContent>
          </CardOverflow>
        </Card>
      ))}
      {showUserList && (
        <UserList
          currentUser={null}
          setCurrentUser={() => {}}
          setUserAvatars={() => {}}   
          onClose={() => setShowUserList(false)}
          onSend={handleSendPostToUsers}
          isFloatingModal={true} 
        />
      )}
    </Box>
  );
};

export default Posts;
