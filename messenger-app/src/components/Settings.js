import React, { useState } from 'react';
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';

function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false); // State for settings notification
  const [showInviteNotification, setShowInviteNotification] = useState(false); // State for invite notification

  const handleSave = () => {
    // Handle save settings logic here
    const settings = {
      darkMode,
      password,
      confirmPassword,
    };
    console.log('Settings saved:', settings);

    // Show notification
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleInvite = () => {
    // Handle invite logic here
    // Show invite notification
    setShowInviteNotification(true);

    // Hide invite notification after 3 seconds
    setTimeout(() => {
      setShowInviteNotification(false);
    }, 3000);
  };

  const handleEditProfile = () => {
    // Handle edit profile logic here
    console.log('Edit Profile button clicked');
    // You can navigate to the Edit Profile page or show an edit profile form
  };

  return (
    <div>
      <style>
        {`
          .settings-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: ${darkMode ? '#000000' : '#f0f0f0'};
            position: relative;
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            background: url('https://wallpaperaccess.com/full/4224720.jpg') no-repeat center center fixed;
            transition: background-color 0.3s ease;
          }
          .settings {
            max-width: 600px;
            width: 100%;
            padding: 20px;
            background-color: ${darkMode ? '#2c2c2c' : '#ffffff'};
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 0 10px ${darkMode ? '#00bcd4' : '#6200ea'};
            color: ${darkMode ? '#fff' : '#000'};
            transition: box-shadow 0.3s ease;
          }
          h2 {
            margin-bottom: 20px;
            color: ${darkMode ? '#fff' : '#000'};
          }
          .setting-group {
            margin-bottom: 20px;
          }
          .setting-group h3 {
            margin-bottom: 10px;
            color: ${darkMode ? '#ddd' : '#000'};
          }
          label {
            display: block;
            margin-bottom: 10px;
            color: ${darkMode ? '#ccc' : '#000'};
          }
          input[type="password"] {
            width: 100%;
            padding: 6px;
            border-radius: 5px;
            border: 1px solid #666;
            background-color: #444;
            color: #fff;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
          }
          input[type="password"]:focus {
            outline: none;
            border-color: #888;
          }
          button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #6200ea;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background-color: #3700b3;
          }
          .toggle-button {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
          }
          .toggle-button input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${darkMode ? '#ccc' : '#2196F3'};
            transition: 0.4s;
            border-radius: 20px;
          }
          .slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
          }
          input:checked + .slider {
            background-color: ${darkMode ? '#2196F3' : '#ccc'};
          }
          input:checked + .slider:before {
            transform: translateX(18px);
          }
          .notification, .invite-notification {
            margin: 20px 0;
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border-radius: 5px;
            display: block;
          }
          .invite-notification {
            background-color: #ff9800;
          }
          .invite-friends {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .invite-friends img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .invite-friends input[type="email"] {
            flex-grow: 1;
            padding: 6px;
            border-radius: 5px;
            border: 1px solid #666;
            background-color: ${darkMode ? '#444' : '#f0f0f0'};
            color: ${darkMode ? '#fff' : '#000'};
            font-size: 14px;
          }
          .invite-friends button {
            padding: 6px 12px;
            font-size: 14px;
          }
        `}
      </style>
      <div className="settings-container">
        <div className="settings">
          <h2>Settings</h2>
          {showNotification && (
            <div className="notification">
              Settings saved successfully!
            </div>
          )}
          {showInviteNotification && (
            <div className="invite-notification">
              Invitation sent successfully!
            </div>
          )}
          <div className="setting-group">
            <h3>
              Theme
              <InitColorSchemeScript />
            </h3>
            <label className="toggle-button">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-group">
            <h3>Security</h3>
            <label>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="setting-group">
            <h3>Invite Friends</h3>
            <div className="invite-friends">
              <img src="https://via.placeholder.com/40" alt="Invite Friends Logo" />
              <input
                type="email"
                placeholder="Enter friend's email"
              />
              <button onClick={handleInvite}>Send Invite</button>
            </div>
          </div>
          <div>
           
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
