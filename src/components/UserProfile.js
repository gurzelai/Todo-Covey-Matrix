import React from 'react';

const UserProfile = ({ user, onSignOut }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
      <img src={user.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <p style={{ marginLeft: '10px' }}>{user.displayName}</p>
      <button className="logout-button" onClick={onSignOut}>Cerrar sesión</button>
    </div>
  );
};

export default UserProfile;
