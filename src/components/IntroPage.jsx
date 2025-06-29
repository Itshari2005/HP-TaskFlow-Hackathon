import '../styles/intro.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const IntroPage = () => {
  return (
    <>
      <Header />
      <div className="intro-container">
        <div className="intro-content">
          <h1>Welcome to TaskFlow</h1>
          <p>Your smart task manager to keep things organized and collaborative.</p>
          <Link to="/login" className="btn-primary">Get Started</Link>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Task Management</h3>
            <p>Create, organize, and track your tasks with ease</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🕒</div>
            <h3>Due Dates & Priorities</h3>
            <p>Set deadlines and prioritize your work effectively</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Share tasks and collaborate with your team members</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>Get instant updates on task changes and progress</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IntroPage;
