const OAuthLogin = () => {
  const handleGoogle = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleGitHub = () => {
    window.location.href = 'http://localhost:5000/api/auth/github';
  };

  return (
    <div>
      <button onClick={handleGoogle}>Login with Google</button>
      <button onClick={handleGitHub}>Login with GitHub</button>
    </div>
  );
};

export default OAuthLogin;
