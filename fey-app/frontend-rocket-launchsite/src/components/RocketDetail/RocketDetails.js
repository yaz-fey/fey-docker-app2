import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RocketApp = () => {
  const [rockets, setRockets] = useState([]);
  const [selectedRocket, setSelectedRocket] = useState(null);
  const [telemetry, setTelemetry] = useState(null);

  // Roketlerin listesini almak için API isteği
  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/rockets', {
          headers: {
            'x-api-key': 'API_KEY_1' // API anahtarını header'a ekleyin
          }
        });
        setRockets(response.data);
      } catch (error) {
        console.error('Roketler yüklenirken hata oluştu:', error);
      }
    };

    fetchRockets();
  }, []);

  // Seçili roketin telemetrisini almak için WebSocket bağlantısı
  useEffect(() => {
    if (selectedRocket) {
      const ws = new WebSocket(`ws://${selectedRocket.telemetry.host}:${selectedRocket.telemetry.port}`);

      ws.onmessage = event => {
        setTelemetry(JSON.parse(event.data));
      };

      ws.onerror = error => {
        console.error('WebSocket hatası:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket bağlantısı kapandı');
      };

      return () => {
        ws.close();
      };
    }
  }, [selectedRocket]);

  return (
    <div>
      <h1>Roketler</h1>
      <ul>
        {rockets.map(rocket => (
          <li key={rocket.id} onClick={() => setSelectedRocket(rocket)}>
            {rocket.model}
          </li>
        ))}
      </ul>
      {selectedRocket && (
        <div>
          <h2>Seçili Roket: {selectedRocket.model}</h2>
          {/* Seçili roketin detaylarını burada gösterebilirsiniz */}
        </div>
      )}
      {telemetry && (
        <div>
          <h3>Telemetri Bilgileri</h3>
          <p>Yükseklik: {telemetry.altitude}</p>
          <p>Hız: {telemetry.speed}</p>
          {/* Diğer telemetri verilerini burada gösterebilirsiniz */}
        </div>
      )}
    </div>
  );
};

export default RocketApp;
