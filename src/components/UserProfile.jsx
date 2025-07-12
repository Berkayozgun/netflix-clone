import React, { useState } from 'react';

function UserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [favorites] = useState([
    { id: 1, title: 'Stranger Things', type: 'TV Show' },
    { id: 2, title: 'The Witcher', type: 'TV Show' },
    { id: 3, title: 'Money Heist', type: 'TV Show' }
  ]);
  const [watchHistory] = useState([
    { id: 1, title: 'Breaking Bad', progress: 85 },
    { id: 2, title: 'Game of Thrones', progress: 100 },
    { id: 3, title: 'The Crown', progress: 45 }
  ]);

  return (
    <div className="userProfile">
      <div className="profile__header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="Profile"
          className="profile__avatar"
        />
        <div className="profile__info">
          <h2>John Doe</h2>
          <p>Premium Member</p>
        </div>
      </div>

      <div className="profile__tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          My List
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Watch History
        </button>
      </div>

      <div className="profile__content">
        {activeTab === 'profile' && (
          <div className="profile__details">
            <h3>Account Details</h3>
            <div className="detail__item">
              <span>Email:</span>
              <span>john.doe@example.com</span>
            </div>
            <div className="detail__item">
              <span>Plan:</span>
              <span>Premium</span>
            </div>
            <div className="detail__item">
              <span>Member Since:</span>
              <span>January 2023</span>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites__list">
            <h3>My List</h3>
            {favorites.map(item => (
              <div key={item.id} className="favorite__item">
                <span>{item.title}</span>
                <span className="item__type">{item.type}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history__list">
            <h3>Watch History</h3>
            {watchHistory.map(item => (
              <div key={item.id} className="history__item">
                <span>{item.title}</span>
                <div className="progress__bar">
                  <div 
                    className="progress__fill" 
                    style={{width: `${item.progress}%`}}
                  ></div>
                </div>
                <span>{item.progress}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile; 