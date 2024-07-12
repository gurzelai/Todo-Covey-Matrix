import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css';

const UserProfile = ({ user, onSignOut }) => {
  const googleCalendarUrl = 'https://calendar.google.com/';

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
      <img src={user.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <p style={{ marginLeft: '10px' }}>{user.displayName}</p>
      <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', textDecoration: 'none' }}>
        <button className="calendar-button" style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faCalendarAlt} /> <span style={{ marginLeft: '5px' }}>Calendario</span>
        </button>
      </a>
      <button className="logout-button" onClick={onSignOut} style={{ marginLeft: '10px', display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faSignOutAlt} /> <span style={{ marginLeft: '5px' }}>Cerrar sesión</span>
      </button>
    </div>
  );
};

export default UserProfile;
