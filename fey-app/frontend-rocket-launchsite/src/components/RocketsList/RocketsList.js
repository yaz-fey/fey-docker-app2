import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRockets } from '../../actions/rockets';
import './RocketsList.css';
import { useNavigate } from 'react-router-dom';



function RocketsList() {
  const dispatch = useDispatch();
  const { rockets, loading, error } = useSelector(state => state.rockets);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(fetchRockets());
    }
  }, [dispatch, navigate, token]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error.message}</p>;

  const goToRocketDetails = (rocket) => {
    navigate(`/rocketDetails/${rocket.id}`, { state: { telemetry: rocket.telemetry } });
  };

  return (
    <div>
      <h2>Roket Listesi</h2>
      <div>
        {rockets.map(rocket => (
          <div key={rocket.id} className="rocket-card">
            <h3>{rocket.model}</h3>
            <p>Kütle: {rocket.mass}</p>
            <p>Yük Açıklaması: {rocket.payload.description}</p>
            <p>Yük Ağırlığı: {rocket.payload.weight}</p>
            <p>Telemetri Host: {rocket.telemetry.host}</p>
            <p>Telemetri Port: {rocket.telemetry.port}</p>
            <p>Durum: {rocket.status}</p>
            <p>Yükseklik: {rocket.altitude}</p>
            <p>Hız: {rocket.speed}</p>
            <p>İvme: {rocket.acceleration}</p>
            <p>İtme Kuvveti: {rocket.thrust}</p>
            <p>Sıcaklık: {rocket.temperature}</p>

            <button onClick={() => goToRocketDetails(rocket)}>Roket Detayı</button>
        
          </div>
        ))}
      </div>
    </div>
  );
}

export default RocketsList;
