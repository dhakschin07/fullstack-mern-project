import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';
import Button from '@mui/material/Button'; // Import Button from Material-UI

const UserList = ({ currentUser, setCurrentUser, setUserAvatars, onClose, isFloatingModal }) => {
  const [users, setUsers] = useState([]);
  const [messageSent, setMessageSent] = useState(false); // New state for message sent

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        const avatars = {};
        response.data.forEach(user => {
          avatars[user.name] = `https://i.pravatar.cc/150?img=${user.id}`;
        });
        setUserAvatars(avatars);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [setUserAvatars]);

  const handleSend = () => {
    // Simulate sending the message
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 8000); // Hide message after 2 seconds
  };

  return (
    <div className={`user-list ${isFloatingModal ? 'user-list-modal' : ''}`}>
      {isFloatingModal && (
        <button className="close-button" onClick={onClose}>X</button>
      )}
      <div className="user-list-scrollable">
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`user ${currentUser === user.name ? 'user-selected' : ''}`}
            onClick={() => setCurrentUser(user.name)}
          >
            <img 
              src={`https://i.pravatar.cc/150?img=${user.id}`} 
              alt={`${user.name}'s avatar`} 
              className="user-avatar"
            />
            {user.name}
          </div>
        ))}
      </div>
      {isFloatingModal && (
        <>
          <Button 
            className="send-button" 
            onClick={handleSend}
          >
            Send
          </Button>
          {messageSent && (
            <div className="message-sent-box">
              <p>Message sent</p>
              <Button onClick={() => setMessageSent(false)}>OK</Button>
            </div>
          )}
-+        </>
      )}
    </div>
  );
};

export default UserList;
