import React, { useEffect, useState } from 'react';
import HeaderSimple from './HeaderSimple';
import '../styles/login.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [publicAccount, setPublicAccount] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div>
      <HeaderSimple />
      <div className="login-container">
        <div className="login-form">
          <h2>Profile Settings</h2>

          {user && (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </>
          )}

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={publicAccount}
                onChange={() => setPublicAccount(!publicAccount)}
              />
              Public Account
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              Email Notifications
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
              />
              Push Notifications
            </label>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              Dark Mode
            </label>
          </div>

          <button onClick={handleLogout} className="login-btn" style={{ backgroundColor: '#ef4444' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
