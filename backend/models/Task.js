const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  dueDate: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if per-user
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
