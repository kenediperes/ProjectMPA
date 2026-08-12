import React, { useState, useEffect } from 'react';
import { useAuth, useApi } from '../hooks';

const Profile = () => {
  const { user } = useAuth();
  const { loading, error, request } = useApi();
  const [profile, setProfile] = useState(user || {});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) setProfile(user);
  }, [user]);

  const handleSave = async () => {
    const res = await request({
      url: '/users/profile',
      method: 'PUT',
      data: profile,
    });
    if (res.success) {
      setEditing(false);
      alert('Profile updated');
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="profile-card">
        {!editing ? (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <button onClick={() => setEditing(true)}>Edit</button>
          </div>
        ) : (
          <div>
            <div>
              <label>Name</label>
              <input
                value={profile.name || ''}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                value={profile.email || ''}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;