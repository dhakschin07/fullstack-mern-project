import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import EmojiPicker from 'emoji-picker-react';

const Messenger = () => {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userAvatars, setUserAvatars] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:5001/messages/${currentUser}`)
        .then(response => {
          setMessages(prevMessages => ({
            ...prevMessages,
            [currentUser]: response.data.messages || []
          }));
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    }
  }, [currentUser]);

  const sendMessage = async () => {
    if (input.trim() && currentUser) {
      const time = new Date().toLocaleTimeString();
      const newMessage = { text: input, sender: 'You', time, ticks: '✓✓' };

      // Update local state with the new message
      setMessages(prevMessages => ({
        ...prevMessages,
        [currentUser]: [
          ...(prevMessages[currentUser] || []),
          newMessage,
        ],
      }));

      try {
        // Send the message to the backend
        await axios.post('http://localhost:5001/messages', {
          user: currentUser,
          message: newMessage,
        });
        
        // Clear the input field
        setInput('');

        // Simulate API response
        const response = await simulateApiResponse();

        // Add the simulated API's reply
        const replyMessage = { text: response, sender: 'Bot', time: new Date().toLocaleTimeString(), ticks: '✓✓' };
        setMessages(prevMessages => ({
          ...prevMessages,
          [currentUser]: [
            ...(prevMessages[currentUser] || []),
            replyMessage,
          ],
        }));

        // Send the reply message to the backend
        await axios.post('http://localhost:5001/messages', {
          user: currentUser,
          message: replyMessage,
        });
      } catch (error) {
        console.error('Error sending or saving message:', error);
      }
    }
  };

  const simulateApiResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is just trash. Why are you even reading this? 😜");
      }, 2000);
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && currentUser) {
      const time = new Date().toLocaleTimeString();
      const fileURL = URL.createObjectURL(file);

      const newMessage = { text: fileURL, sender: 'You', time, ticks: '✓✓', type: 'image' };
      setMessages(prevMessages => ({
        ...prevMessages,
        [currentUser]: [
          ...(prevMessages[currentUser] || []),
          newMessage,
        ],
      }));

      try {
        await axios.post('http://localhost:5001/messages', {
          user: currentUser,
          message: newMessage,
        });
      } catch (error) {
        console.error('Error sending file message:', error);
      }
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput(prevInput => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false); // Hide the picker after selecting an emoji
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      backgroundImage: 'url(https://wallpaperaccess.com/full/4224720.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundAttachment: 'fixed',
      color: '#ffffff',
      position: 'relative',
    }}>
      <UserList 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        setUserAvatars={setUserAvatars} 
      />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '75%',
        height: '80%', 
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        borderRadius: '10px',
        margin: '20px', 
        color: '#ffffff', 
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}>
        {currentUser && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0b0c10', 
            padding: '10px',
            borderRadius: '10px 10px 0 0',
            marginBottom: '20px',
            position: 'relative'
          }}>
            <img 
              src={userAvatars[currentUser] || `https://randomuser.me/api/portraits/men/${currentUser % 10}.jpg`} 
              alt="Profile"
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
            />
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '10px', color: '#66fcf1' }}>
              {currentUser}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <div style={{ position: 'relative', marginRight: '10px' }}>
                <button 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#66fcf1', 
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-phone-alt"></i>
                </button>
                <span style={{
                  visibility: 'hidden',
                  opacity: 0,
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '5px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                }}>Voice Call</span>
              </div>
              <div style={{ position: 'relative' }}>
                <button 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#66fcf1', 
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-video"></i>
                </button>
                <span style={{
                  visibility: 'hidden',
                  opacity: 0,
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '5px',
                  borderRadius: '5px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                }}>Video Call</span>
              </div>
            </div>
          </div>
        )}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
        }}>
          {currentUser && (messages[currentUser] || []).map((msg, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: msg.sender === 'You' ? 'flex-end' : 'flex-start', 
                marginBottom: '10px',
              }}
            >
              <div style={{
                backgroundColor: '#333',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '60%',
                color: '#66fcf1',
              }}>
                {msg.type === 'image' ? (
                  <img src={msg.text} alt="Shared file" style={{ maxWidth: '150px', maxHeight: '150px', borderRadius: '10px' }} />
                ) : (
                  msg.text
                )}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#aaaaaa', 
                marginTop: '5px',
              }}>
                {msg.time}
                <span style={{
                  marginLeft: '5px',
                  fontSize: '14px',
                  color: '#66fcf1',
                }}>
                  {msg.ticks}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          borderTop: '1px solid #444',
          paddingTop: '10px',
        }}>
          <input 
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" style={{
            cursor: 'pointer',
            marginRight: '10px',
          }}>
            <i className="fas fa-paperclip"></i>
          </label>
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={{
              border: 'none',
              background: 'none',
              color: '#66fcf1',
              marginRight: '10px',
              cursor: 'pointer',
            }}
          >
            <i className="fas fa-smile"></i>
          </button>
          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={onEmojiClick} />
          )}
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message"
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '20px',
              border: 'none',
              outline: 'none',
            }}
          />
          <button 
            onClick={sendMessage}
            style={{
              backgroundColor: '#66fcf1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 20px',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
