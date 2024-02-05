import React from 'react';

const Login = () => {
  const handleLogin = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    window.location.href = `${backendUrl}/auth/discord`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Discord</button>
    </div>
  );
};

export default Login;
