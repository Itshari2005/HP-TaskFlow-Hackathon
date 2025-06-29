import React, { useState } from 'react';
import '../styles/createTaskModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../api';

const CreateTaskModal = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newTask = { title, description, status, priority, dueDate };

  try {
    await axios.post(`${BASE_URL}/api/tasks/create`, newTask);
    alert('Task created!');
    onCreate(newTask); // Optional: update local state
    toast.success(`🆕 New task "${title}" added successfully`, {
  toastId: `create-${title}` // optional
});

    onClose();
  } catch (err) {
  if (err.response?.data?.errors) {
    err.response.data.errors.forEach((e) => {
      toast.error(`❌ ${e.msg}`);
    });
  } else {
    toast.error('❌ Failed to create task');
  }
  console.error(err);
}

};

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Create New Task</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Title *</label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Enter task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="row">
            <div>
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="create-btn">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
