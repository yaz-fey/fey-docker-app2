import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../../actions/weathers';
import './Weather.css';

const Weather = () => {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather.weatherData);

  useEffect(() => {
    dispatch(fetchWeather()); // İlk yükleme için veri çekme
    const interval = setInterval(() => {
      dispatch(fetchWeather()); // Her 10 saniyede bir veri çekme
    }, 10000); // 10000 milisaniye = 10 saniye
  
    return () => clearInterval(interval); // Bileşen kaldırıldığında intervalı temizle
  }, [dispatch]);

  if (!weather) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="weather-card">
      <h3>Hava Durumu</h3>
      <p>Sıcaklık: {weather.temperature.toFixed(2)}°C</p>
            <p>Nem: {(weather.humidity * 100).toFixed(2)}%</p>
            <p>Basınç: {weather.pressure.toFixed(2)} hPa</p>
            <p>Yağış Olasılığı: {(weather.precipitation.probability * 100).toFixed(2)}%</p>
            <p>Yağmur: {weather.precipitation.rain ? 'Evet' : 'Hayır'}</p>
            <p>Kar: {weather.precipitation.snow ? 'Evet' : 'Hayır'}</p>
            <p>Sulu Kar: {weather.precipitation.sleet ? 'Evet' : 'Hayır'}</p>
            <p>Dolu: {weather.precipitation.hail ? 'Evet' : 'Hayır'}</p>
            <p>Rüzgar Yönü: {weather.wind.direction}</p>
            <p>Rüzgar Açısı: {weather.wind.angle.toFixed(2)} derece</p>
            <p>Rüzgar Hızı: {weather.wind.speed.toFixed(2)} km/s</p>
            <p>Zaman: {new Date(weather.time).toLocaleString()}</p>
    </div>
  );
}

export default Weather;
