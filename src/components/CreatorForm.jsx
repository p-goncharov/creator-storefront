import React, { useState, useEffect } from 'react';
import './CreatorForm.css';

const CreatorForm = ({ creator, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    avatar: '',
    followers: '',
    avgViews: '',
    engagement: '',
    revenue: '',
    socials: {
      instagram: '',
      youtube: '',
      tiktok: ''
    }
  });

  useEffect(() => {
    if (creator) {
      setFormData({
        name: creator.name || '',
        handle: creator.handle || '',
        avatar: creator.avatar || '',
        followers: creator.followers || '',
        avgViews: creator.avgViews || '',
        engagement: creator.engagement || '',
        revenue: creator.revenue || '',
        socials: {
          instagram: creator.socials?.instagram || '',
          youtube: creator.socials?.youtube || '',
          tiktok: creator.socials?.tiktok || ''
        }
      });
    }
  }, [creator]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('socials.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socials: {
          ...prev.socials,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      followers: Number(formData.followers),
      avgViews: Number(formData.avgViews),
      engagement: Number(formData.engagement),
      revenue: Number(formData.revenue)
    };

    onSubmit(submissionData);
  };

  return (
    <div className="creator-form-overlay">
      <div className="creator-form-modal">
        <div className="creator-form-header">
          <h2>{creator ? 'Edit Creator' : 'Add New Creator'}</h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="creator-form">
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="handle">Handle *</label>
              <input
                type="text"
                id="handle"
                name="handle"
                value={formData.handle}
                onChange={handleChange}
                required
                placeholder="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar URL *</label>
              <input
                type="url"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                required
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Statistics</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="followers">Followers *</label>
                <input
                  type="number"
                  id="followers"
                  name="followers"
                  value={formData.followers}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="avgViews">Avg Views *</label>
                <input
                  type="number"
                  id="avgViews"
                  name="avgViews"
                  value={formData.avgViews}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="engagement">Engagement (%) *</label>
                <input
                  type="number"
                  id="engagement"
                  name="engagement"
                  value={formData.engagement}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="revenue">Revenue ($) *</label>
                <input
                  type="number"
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Social Media Links</h3>

            <div className="form-group">
              <label htmlFor="instagram">Instagram URL</label>
              <input
                type="url"
                id="instagram"
                name="socials.instagram"
                value={formData.socials.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="youtube">YouTube URL</label>
              <input
                type="url"
                id="youtube"
                name="socials.youtube"
                value={formData.socials.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/@username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tiktok">TikTok URL</label>
              <input
                type="url"
                id="tiktok"
                name="socials.tiktok"
                value={formData.socials.tiktok}
                onChange={handleChange}
                placeholder="https://tiktok.com/@username"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {creator ? 'Update Creator' : 'Add Creator'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatorForm;
