import React, { useState } from 'react';
import axios from 'axios';
import '../styles/modal.css';

const ShareTaskModal = ({ task, onClose }) => {
  const [email, setEmail] = useState('');

  const handleShare = async () => {
    try {
      await axios.post(`http://localhost:5000/api/tasks/share/${task._id}`, { email });
      alert('✅ Task shared successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to share task.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Share Task</h3>
        <input
          type="email"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleShare}>Send</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ShareTaskModal;
