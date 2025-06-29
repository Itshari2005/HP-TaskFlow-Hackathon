import { Link } from 'react-router-dom';
import '../styles/header.css';

const HeaderSimple = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo">HP TaskFlow</Link>
      </div>
    </header>
  );
};

export default HeaderSimple;
