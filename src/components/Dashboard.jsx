import React, { useEffect, useState } from 'react';
import '../styles/login.css';
import '../styles/dashboard.css';
import '../styles/createTaskModal.css';
import {
  MdNotificationsNone,
  MdAccountCircle,
  MdCheckCircleOutline,
  MdPlayCircleOutline,
  MdRadioButtonUnchecked,
  MdOutlineCalendarToday,
  MdCheckCircle,
  MdAccessTime,
  MdErrorOutline,
} from 'react-icons/md';
import EditTaskModal from './EditTaskModal';
import { FiMoreVertical, FiEdit, FiTrash, FiShare2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { LuCalendarDays } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import CreateTaskModal from './CreateTaskModal';
import ShareTaskModal from './ShareTaskModal';
import axios from 'axios';
import BASE_URL from '../api';

const Dashboard = () => {
  const [sortBy, setSortBy] = useState('createdAt');
const [order, setOrder] = useState('desc');
const [searchQuery, setSearchQuery] = useState('');
const [statusFilter, setStatusFilter] = useState('');
const [priorityFilter, setPriorityFilter] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showShareModal, setShowShareModal] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/tasks`, {
          params: {
            page: currentPage,
            limit: 8,
            sortBy,
            order,
            search: searchQuery,
            status: statusFilter,
            priority: priorityFilter,
          },
        });
        if (res.data && Array.isArray(res.data.tasks)) {
        setTasks(res.data.tasks);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setTasks([]); // fallback
        setTotalPages(1);
      }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, [currentPage, sortBy, order, searchQuery, statusFilter, priorityFilter]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  const toggleTaskStatus = async (taskId, currentStatus) => {
    const statusFlow = ['To Do', 'In Progress', 'Completed'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length];

    try {
      await axios.put(`${BASE_URL}/api/tasks/${taskId}`, { status: nextStatus });
      setTasks(prev => prev.map(task => task._id === taskId ? { ...task, status: nextStatus } : task));
      const updatedTask = tasks.find(task => task._id === taskId);
      toast.info(`📝 "${updatedTask?.title}" marked as ${nextStatus}`, {
        toastId: `status-${taskId}`,
      });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await axios.put(`${BASE_URL}/api/tasks/${taskId}`, { status });
      setTasks(prev => prev.map(t => (t._id === taskId ? { ...t, status } : t)));
      const updatedTask = tasks.find(t => t._id === taskId);
      toast.success(`✅ "${updatedTask?.title}" marked as ${status}`);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update status');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.info('🗑️ Task deleted');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/tasks/${updatedTask._id}`, updatedTask);
      setTasks(prev => prev.map(t => (t._id === updatedTask._id ? res.data : t)));
      setEditingTask(null);
      toast.success(`✏️ "${updatedTask.title}" updated successfully`);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to update task');
    }
  };

  const handleCreateTask = (task) => {
    console.log('Task created:', task);
  };

  return (
    <div className="full-dashboard">
      <header className="main-header">
        <div className="header-left">
          <span className="logo" onClick={() => navigate('/')}>HP TaskFlow</span>
        </div>
        <div className="dashboard-icons">
          <MdNotificationsNone size={24} />
          <MdAccountCircle size={24} />
        </div>
      </header>

      <section className="welcome-section">
        <h2>Welcome, {user?.name || 'User'} 🎉</h2>
        <p>Your dashboard will show tasks, stats, and more soon!</p>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-header-row">
          <div className="dashboard-title">TaskFlow</div>
        </div>

        {/* Cards */}
        <div className="dashboard-cards">
          <div className="dash-card total">
            <div className="card-content">
              <div>Total Tasks<br /><strong>{tasks.length}</strong></div>
              <MdOutlineCalendarToday className="card-icon blue" />
            </div>
          </div>
          <div className="dash-card completed">
            <div className="card-content">
              <div>Completed<br /><strong>{completedTasks}</strong><div className="card-sub">{completionRate}% completion rate</div></div>
              <MdCheckCircle className="card-icon green" />
            </div>
          </div>
          <div className="dash-card inprogress">
            <div className="card-content">
              <div>In Progress<br /><strong>{inProgressTasks}</strong></div>
              <MdAccessTime className="card-icon yellow" />
            </div>
          </div>
          <div className="dash-card overdue">
            <div className="card-content">
              <div>Overdue<br /><strong>{overdueTasks}</strong></div>
              <MdErrorOutline className="card-icon red" />
            </div>
          </div>
        </div>

        {/* Filters & Create Button */}
<div className="dashboard-filters">
  <input
    type="text"
    placeholder="Search tasks..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />

  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
    <option value="">All Status</option>
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

  <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
    <option value="">All Priority</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
    <option value="createdAt">Sort by Created</option>
    <option value="dueDate">Sort by Due Date</option>
    <option value="priority">Sort by Priority</option>
  </select>

  <select value={order} onChange={(e) => setOrder(e.target.value)}>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>

  <button className="create-task-btn" onClick={() => setShowModal(true)}>
    + Create Task
  </button>
</div>




        {/* Task Cards */}
        <div className="dashboard-tasks">
          <div className="task-cards-container">
            {tasks.map(task => (
              <div className="task-card" key={task._id}>
                <div className="task-card-header">
                  <button className="status-toggle-btn" onClick={() => toggleTaskStatus(task._id, task.status)} title="Toggle Status">
                    {task.status === 'Completed' ? <MdCheckCircleOutline className="status-icon completed" /> :
                     task.status === 'In Progress' ? <MdPlayCircleOutline className="status-icon" /> :
                     <MdRadioButtonUnchecked className="status-icon" />}
                  </button>
                  <h4 className={task.status === 'Completed' ? 'completed-title' : ''}>{task.title}</h4>
                  <div className="task-menu">
                    <button className="task-menu-btn" onClick={() => toggleMenu(task._id)}><FiMoreVertical /></button>
                    {openMenuId === task._id && (
                      <div className="task-menu-dropdown">
                        <div onClick={() => handleEditTask(task)}><FiEdit /> Edit Task</div>
                        <div onClick={() => updateStatus(task._id, 'To Do')}><MdRadioButtonUnchecked /> Mark as To Do</div>
                        <div onClick={() => updateStatus(task._id, 'In Progress')}><MdPlayCircleOutline /> Mark as In Progress</div>
                        <div onClick={() => updateStatus(task._id, 'Completed')}><MdCheckCircleOutline /> Mark as Completed</div>
                        <div onClick={() => setShowShareModal(task)}><FiShare2 /> Share Task</div>
                        <div onClick={() => deleteTask(task._id)}><FiTrash /> Delete Task</div>
                      </div>
                    )}
                  </div>
                </div>
                <p className={task.status === 'Completed' ? 'completed-desc' : ''}>{task.description}</p>
                <div className="task-badges">
                  <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</span>
                  <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                </div>
                <div className="task-date">
                  <LuCalendarDays /> Due {new Date(task.dueDate).toDateString().slice(4)}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination-controls">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>← Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next →</button>
          </div>
        </div>
      </section>

      {showModal && <CreateTaskModal onClose={() => setShowModal(false)} onCreate={handleCreateTask} />}
      {editingTask && <EditTaskModal task={editingTask} onClose={() => setEditingTask(null)} onUpdate={handleUpdateTask} />}
      {showShareModal && <ShareTaskModal task={showShareModal} onClose={() => setShowShareModal(null)} />}
    </div>
  );
};

export default Dashboard;
