import { Paper, Grid, Text, Group, Title, Box, Space } from '@mantine/core';
import { motion } from 'framer-motion';
import { FiDroplet, FiWind } from 'react-icons/fi';
import styles from '../styles/WeatherCard.module.css';

export default function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.cardWrapper}
    >
      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        className={styles.weatherCard}
      >
        <div className={styles.cardContent}>
          <div className={styles.locationSection}>
            <Title order={1} className={styles.cityName}>
              {weather.city}
            </Title>
            <Text className={styles.countryName}>
              {weather.country}
            </Text>
          </div>

          <div className={styles.mainWeatherSection}>
            <div className={styles.temperatureDisplay}>
              <div className={styles.weatherIconWrapper}>
                <img 
                  src={weather.icon} 
                  alt={weather.condition} 
                  width={120} 
                  height={120} 
                  className={styles.weatherIcon}
                />
              </div>
              
              <div className={styles.tempAndCondition}>
                <Text className={styles.temperature}>
                  {weather.temp}°
                </Text>
                <Text className={styles.condition}>
                  {weather.condition}
                </Text>
              </div>
            </div>

            <div className={styles.weatherDetailsGrid}>
              <div className={styles.weatherDetail}>
                <FiDroplet size={28} className={styles.detailIcon} />
                <div className={styles.detailTextWrapper}>
                  <Text className={styles.detailLabel}>Humidity</Text>
                  <Text className={styles.detailValue}>{weather.humidity}%</Text>
                </div>
              </div>
              
              <div className={styles.weatherDetail}>
                <FiWind size={28} className={styles.detailIcon} />
                <div className={styles.detailTextWrapper}>
                  <Text className={styles.detailLabel}>Wind Speed</Text>
                  <Text className={styles.detailValue}>{weather.wind} km/h</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </motion.div>
  );
}