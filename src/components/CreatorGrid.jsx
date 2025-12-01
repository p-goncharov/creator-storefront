import React, { useState, useEffect } from 'react';
import CreatorCard from './CreatorCard';
import CreatorForm from './CreatorForm';
import './CreatorGrid.css';

const CreatorGrid = ({ apiService }) => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCreator, setEditingCreator] = useState(null);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getCreators();
      setCreators(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch creators');
      console.error('Error fetching creators:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [apiService]);

  const handleAddCreator = () => {
    setEditingCreator(null);
    setShowForm(true);
  };

  const handleEditCreator = (creator) => {
    setEditingCreator(creator);
    setShowForm(true);
  };

  const handleDeleteCreator = async (id) => {
    if (!window.confirm('Are you sure you want to delete this creator?')) {
      return;
    }

    try {
      await apiService.deleteCreator(id);
      await fetchCreators();
    } catch (err) {
      alert('Failed to delete creator: ' + err.message);
    }
  };

  const handleFormSubmit = async (creatorData) => {
    try {
      if (editingCreator) {
        await apiService.updateCreator(editingCreator.id, creatorData);
      } else {
        await apiService.createCreator(creatorData);
      }
      setShowForm(false);
      setEditingCreator(null);
      await fetchCreators();
    } catch (err) {
      alert('Failed to save creator: ' + err.message);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCreator(null);
  };

  if (loading) {
    return (
      <div className="creator-grid-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading creators...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="creator-grid-container">
        <div className="error-state">
          <h3>Error Loading Creators</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="creator-grid-container">
      <div className="grid-header">
        <button className="add-creator-btn" onClick={handleAddCreator}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add Creator
        </button>
      </div>

      {creators.length === 0 ? (
        <div className="empty-state">
          <p>No creators found. Add your first creator!</p>
        </div>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id || creator.handle}
              creator={creator}
              onEdit={handleEditCreator}
              onDelete={handleDeleteCreator}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CreatorForm
          creator={editingCreator}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default CreatorGrid;
