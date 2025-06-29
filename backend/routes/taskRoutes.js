const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const sendEmail = require('../utils/sendEmail');
const Task = require('../models/Task');
const authenticateJWT = require('../middleware/authenticateJWT');
const {
  createTask,
  getTasks,
  updateTaskStatus,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// ✅ Create Task with validation
router.post(
  '/create',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('priority')
      .isIn(['High', 'Medium', 'Low'])
      .withMessage('Priority must be High, Medium, or Low'),
    body('dueDate')
      .notEmpty()
      .withMessage('Due date is required')
      .isISO8601()
      .toDate()
      .custom((value) => {
        if (value < new Date()) {
          throw new Error('Due date must be in the future');
        }
        return true;
      }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createTask
);

// ✅ Get All Tasks
router.get('/', getTasks);

// ✅ Update Task Status
router.patch('/:id/status', updateTaskStatus);

// ✅ Update Full Task
router.put('/:id', updateTask);

// ✅ Delete Task
router.delete('/:id', deleteTask);

// ✅ Protected Route Example
router.get('/protected-route', authenticateJWT, (req, res) => {
  res.send('This is a protected route.');
});

// ✅ Share Task via Email
router.post('/share/:id', async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  console.log('📩 Sharing Task...');
  console.log('Task ID:', id);
  console.log('Recipient Email:', email);
  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const htmlContent = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p><strong>Status:</strong> ${task.status}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
    `;

    await sendEmail(email, `Shared Task: ${task.title}`, htmlContent);
    console.log('✅ Email sent successfully to', email);
    res.status(200).json({ message: 'Task shared successfully!' });
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
    res.status(500).json({ message: 'Failed to share task', error: err.message });
  }
});

module.exports = router;
