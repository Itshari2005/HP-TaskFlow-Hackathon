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
          <h1>
            Organize Your Work, <span className="highlight">Achieve Your Goals</span>
          </h1>
          <p>
            TaskFlow helps you manage your tasks efficiently, collaborate with your team, and stay
            on top of your deadlines with our intuitive task management platform.
          </p>
          <div className="btn-group">
            <Link to="/signup" className="btn-primary">Get Started Free</Link>
            <Link to="/login" className="btn-secondary">Sign In</Link>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Task Management</h3>
            <p>Create, organize, and track your tasks with ease.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🕒</div>
            <h3>Due Dates & Priorities</h3>
            <p>Set deadlines and prioritize your work effectively.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Share tasks and collaborate with your team members.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>Get instant updates on task changes and progress.</p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who trust TaskFlow to manage their tasks</p>
          <Link to="/signup" className="btn-secondary">Start Your Free Trial</Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IntroPage;
