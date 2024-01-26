// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/User/Login';
import Register from './components/User/Register';
import RocketsList from './components/RocketsList/RocketsList';
import Weather from './components/Weather/Weather';
import RocketDetails from './components/RocketDetail/RocketDetails';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <>
    {user && (
      <div className="top-bar">
        <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
        <Weather />
      </div>
    )}
    
           
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={(token) => setUser({ token })} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rockets" element={user ? <RocketsList onLogout={handleLogout} /> : <Login onLoginSuccess={(token) => setUser({ token })} />} />
        <Route path="/rocketDetails/:rocketId" element={user ? <RocketDetails />: <Login onLoginSuccess={(token) => setUser({ token })} />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
