import BASE_URL from '../api';

const OAuthLogin = () => {
  const handleGoogle = () => {
    window.location.href = `${BASE_URL}/api/auth/google`;
  };

  const handleGitHub = () => {
    window.location.href = `${BASE_URL}/api/auth/github`;
  };

  return (
    <div>
      <button onClick={handleGoogle}>Login with Google</button>
      <button onClick={handleGitHub}>Login with GitHub</button>
    </div>
  );
};

export default OAuthLogin;
