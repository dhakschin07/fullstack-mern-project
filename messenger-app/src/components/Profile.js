import React, { useState } from 'react';

function Profile() {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    // Handle save profile logic here
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <input type="file" onChange={handleProfilePicChange} />
      {profilePic && <img src={profilePic} alt="Profile" />}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Profile;
