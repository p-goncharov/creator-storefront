import React from 'react';
import SocialLinks from './SocialLinks';
import './CreatorCard.css';

const CreatorCard = ({ creator, onEdit, onDelete }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="creator-card">
      <div className="creator-card-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(creator)}
          title="Edit creator"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(creator.id)}
          title="Delete creator"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="creator-card-header">
        <img
          src={creator.avatar || 'https://via.placeholder.com/80'}
          alt={creator.name}
          className="creator-avatar"
        />
        <div className="creator-info">
          <h3 className="creator-name">{creator.name}</h3>
          <p className="creator-handle">@{creator.handle}</p>
        </div>
      </div>

      <div className="creator-stats">
        <div className="stat-item">
          <span className="stat-label">Followers</span>
          <span className="stat-value">{formatNumber(creator.followers)}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Avg Views</span>
          <span className="stat-value">{formatNumber(creator.avgViews)}</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Engagement</span>
          <span className="stat-value">{creator.engagement ? creator.engagement + '%' : 'N/A'}</span>
        </div>

        <div className="stat-item highlight">
          <span className="stat-label">Revenue</span>
          <span className="stat-value">{formatCurrency(creator.revenue)}</span>
        </div>
      </div>

      <SocialLinks socials={creator.socials} />
    </div>
  );
};

export default CreatorCard;
