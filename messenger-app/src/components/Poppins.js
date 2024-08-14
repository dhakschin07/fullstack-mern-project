import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay, faMicrosoft, faApple } from '@fortawesome/free-brands-svg-icons';
import { faUserFriends, faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import './Poppins.css';

function Poppins() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name] = useState(location.state?.name || '');
  const [profilePhoto, setProfilePhoto] = useState(location.state?.profilePhoto || 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg');
  const [showSignOutMessage, setShowSignOutMessage] = useState(false);
  const fileInputRef = useRef(null);

  const handleSignOutClick = () => {
    setShowSignOutMessage(true);
  };

  const handleCancelClick = () => {
    setShowSignOutMessage(false);
  };

  const handleOkClick = () => {
    setShowSignOutMessage(false);
    navigate('/login');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfilePhoto(reader.result);

        // Create a FormData object
        const formData = new FormData();
        formData.append('profilePhoto', file);
        formData.append('username', name);

        try {
          // Send the profile photo to the backend
          const response = await fetch('/upload-profile-photo', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            const data = await response.json();
            setProfilePhoto(data.profilePhotoUrl); // Update profile photo with URL from server
            console.log('Profile photo uploaded successfully');
          } else {
            console.error('Error uploading profile photo');
          }
        } catch (error) {
          console.error('Error uploading profile photo:', error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="poppins-container">
      <div className="header">
        <button className="edit-profile-button" onClick={handleFileInputClick}>
          Edit Profile
        </button>
        <button className="signout-button" onClick={handleSignOutClick}>
          Sign Out
        </button>
      </div>
      <div className="profile-section">
        <div className="avatar-container">
          <img
            alt="Profile"
            src={profilePhoto}
            className="profile-photo"
          />
          <input
            type="file"
            id="file-input"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <div className="photo-icon" onClick={handleFileInputClick}>
            <FontAwesomeIcon
              icon={faCamera}
              size="lg"
            />
          </div>
        </div>
        <div className="profile-details">
          <h1 className="username">{name}</h1>
          <div className="stats-section">
            <div className="stats-item">
              <FontAwesomeIcon icon={faUserFriends} size="lg" />
              <div className="stats-number">120</div>
              <div className="stats-text">Followers</div>
            </div>
            <div className="stats-item">
              <FontAwesomeIcon icon={faUser} size="lg" />
              <div className="stats-number">80</div>
              <div className="stats-text">Following</div>
            </div>
          </div>
        </div>
      </div>
      {showSignOutMessage && (
        <div className="signout-message">
          <p>Are you sure you want to sign out?</p>
          <button onClick={handleOkClick}>OK</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
      <div className="app-download-icons">
        <p>Available on:</p>
        <div className="icons">
          <FontAwesomeIcon icon={faGooglePlay} size="2x" />
          <FontAwesomeIcon icon={faMicrosoft} size="2x" />
          <FontAwesomeIcon icon={faApple} size="2x" />
        </div>
      </div>
    </div>
  );
}

export default Poppins;
