import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import IntroPage from './components/IntroPage';
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';
import OAuthSuccess from './components/OAuthSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </Router>
  )
}

export default App
