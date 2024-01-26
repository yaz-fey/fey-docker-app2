import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
 
    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
      navigate('/register'); // Kayıt sayfasına yönlendir
    };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/users/login', { username, password });
          localStorage.setItem('token', response.data.token);
          onLoginSuccess({ token: response.data.token });
          navigate('/rockets');
        } catch (error) {
          console.error('Giriş başarısız', error);
        }
      };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Kullanıcı Adı:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Şifre:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Giriş Yap</button>
        <button type="button" onClick={handleRegisterRedirect}  className="register-button">Üye Ol</button>
      </form>
    </div>
  );
}

export default Login;
