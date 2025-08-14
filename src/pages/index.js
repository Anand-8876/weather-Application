import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Title, Loader, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import WeatherChart from '../components/WeatherChart';
import styles from '../styles/Home.module.css';

const API_KEY = '42a2fdaaa9a847f9b7290636252704'; // Your WeatherAPI key

export default function Home() {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeatherData = async (searchCity) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: API_KEY,
          q: searchCity,
          days: 5,
          aqi: 'no',
          alerts: 'no',
        }
      });

      const data = response.data;

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        icon: data.current.condition.icon,
      });

      setForecast(data.forecast.forecastday.map(day => ({
        date: day.date,
        temp: day.day.avgtemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
        humidity: day.day.avghumidity,
      })));

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('City not found or API error.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Search */}
            <SearchBar onSearch={handleSearch} />

            {/* Error Message */}
            {error && (
              <Text color="red" align="center" mt="md">
                {error}
              </Text>
            )}

            {/* Loading Spinner */}
            {loading ? (
              <div className={styles.loaderContainer}>
                <Loader variant="dots" size="xl" />
              </div>
            ) : (
              <>
                {/* Weather Card */}
                {weather && <WeatherCard weather={weather} />}

                {/* Forecast Cards */}
                <Title order={3} align="center" mt={40} mb={20}>
                  5-Day Forecast
                </Title>

                <div className={styles.forecastGrid}>
                  {forecast.map((day, idx) => (
                    <ForecastCard key={idx} forecast={day} />
                  ))}
                </div>

                {/* Weather Graphs */}
                {forecast.length > 0 && (
                  <WeatherChart forecast={forecast} />
                )}
              </>
            )}
          </motion.div>
        </Container>
      </main>
    </div>
  );
}
