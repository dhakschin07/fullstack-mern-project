import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div className="logout">
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
