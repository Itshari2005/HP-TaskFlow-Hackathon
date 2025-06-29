import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo">HP TaskFlow</Link>
      </div>
      <div className="header-right">
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/signup" className="nav-btn">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;
