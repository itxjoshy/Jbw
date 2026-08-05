import { useNavigate } from 'react-router-dom';

const profiles = [
  { name: 'You', avatar: 'A' },
  { name: 'Family', avatar: 'B' },
  { name: 'Kids', avatar: 'C' },
  { name: 'Guest', avatar: 'D' },
];

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="page profile-page">
      <header className="auth-navbar">
        <div className="logo">NETFLIX</div>
      </header>
      <main className="center-panel profile-selection">
        <h1>Who is watching?</h1>
        <div className="profile-grid">
          {profiles.map((profile) => (
            <button key={profile.name} className="profile-card" onClick={() => navigate('/home')}>
              <div className="profile-avatar">{profile.avatar}</div>
              <span>{profile.name}</span>
            </button>
          ))}
        </div>
        <button className="button button--ghost manage-button">Manage Profiles</button>
      </main>
    </div>
  );
}

export default ProfilePage;
