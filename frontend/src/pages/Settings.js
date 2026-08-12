import React, { useState } from 'react';
import { useAuth, useLocalStorage } from '../hooks';

const Settings = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleSave = () => {
    // Save settings to backend if needed
    alert('Settings saved (mock)');
  };

  return (
    <div>
      <h1>Settings</h1>
      <div className="settings-form">
        <div>
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label>Notifications</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </div>
        <div>
          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <button onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;