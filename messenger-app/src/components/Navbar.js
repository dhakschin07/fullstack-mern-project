import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings'; // Import SettingsIcon
import { Link, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const LogoText = styled(Typography)({
  height: '40px', // Adjust height as needed
  animation: 'glow 1.5s ease-in-out infinite', // Add glow animation
  '@keyframes glow': {
    '0%': {
      textShadow: '0 0 5px #66fcf1',
    },
    '50%': {
      textShadow: '0 0 15px #66fcf1',
    },
    '100%': {
      textShadow: '0 0 5px #66fcf1',
    },
  },
  color: '#66fcf1', // Text color
  fontFamily: 'Orpheus, sans-serif', // Apply Orpheus font here
  fontStyle: 'italic', // Apply italic style here
});

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'black',
          color: '#66fcf1',
        },
      }}
    >
      <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'black',
          color: '#66fcf1',
        },
      }}
    >
      <MenuItem component={Link} to="/poppins">
        <p>Profile</p>
      </MenuItem>
      <MenuItem component={Link} to="/settings">
        <p>Settings</p>
      </MenuItem>
      <MenuItem component={Link} to="/faq">
        <p>FAQ</p>
      </MenuItem>
      <MenuItem component={Link} to="/report">
        <p>Help Center</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" // Changed to fixed
        sx={{ 
          backgroundColor: 'black', 
          zIndex: theme => theme.zIndex.drawer + 1, // Ensure it floats above other components
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)', // Add box shadow for floating effect
          transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for shadow
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <LogoText
            variant="h6"
            noWrap
            component={Link}
            to="/Poppins" // Changed route to login page
            sx={{ 
              textDecoration: 'none', 
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Connexxion
          </LogoText>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#66fcf1' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: '#66fcf1' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              component={Link}
              to="/messenger"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon sx={{ color: '#66fcf1' }} />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              aria-label="show posts"
              color="inherit"
              component={Link}
              to="/posts"
            >
              <PostAddIcon sx={{ color: '#66fcf1' }} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show settings"
              color="inherit"
              component={Link}
              to="/settings"
            >
              <SettingsIcon sx={{ color: '#66fcf1' }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{ color: '#66fcf1' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
