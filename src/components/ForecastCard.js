import { Paper, Text, Center } from '@mantine/core';
import { motion } from 'framer-motion';
import styles from '../styles/ForecastCard.module.css';

export default function ForecastCard({ forecast }) {
  const formatDate = (dateString) => {
    const options = { weekday: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={styles.forecastCard}
    >
      <Paper
        shadow="md"
        radius="xl"
        p="md"
        withBorder
      >
        <Center className={styles.forecastIcon}>
          <img src={forecast.icon} alt="Weather Icon" width={50} height={50} />
        </Center>

        <Text align="center" weight={700} size="lg" mt="sm">
          {forecast.temp}°C
        </Text>

        <Text align="center" size="sm" color="dimmed" mt="xs">
          {formatDate(forecast.date)}
        </Text>
      </Paper>
    </motion.div>
  );
}
