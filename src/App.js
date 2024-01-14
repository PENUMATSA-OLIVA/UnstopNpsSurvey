import React, { useState } from 'react';
import SurveyForm from './SurveyForm';

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/authenticate', {
        username: 'your_admin_username',
        password: 'your_admin_password',
      });
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!token ? (
        <div>
          <h1>Admin Login</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <SurveyForm token={token} />
      )}
    </div>
  );
};

export default App;