import { Paper, Title } from '@mantine/core';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import styles from '../styles/WeatherChart.module.css';

export default function WeatherChart({ forecast }) {
  // Return early if forecast is undefined, null, not an array or empty
  if (!forecast) {
    return null;
  }
  
  // Ensure forecast is an array before attempting to map
  const forecastArray = Array.isArray(forecast) ? forecast : [];
  
  if (forecastArray.length === 0) {
    return null;
  }

  // Now we can safely map over forecastArray
  const tempData = forecastArray.map((day) => {
    if (!day) return null;
    
    return {
      date: day.date ? new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }) : 'Unknown',
      temp: typeof day.temp === 'number' ? day.temp : 0,
      humidity: typeof day.humidity === 'number' ? day.humidity : 0,
    };
  }).filter(Boolean);

  if (tempData.length === 0) {
    return null;
  }

  return (
    <div className={styles.chartContainer}>
      <Paper
        shadow="md"
        radius="xl"
        p="xl"
        withBorder
        className={styles.weatherChart}
      >
        <Title order={4} mb="md" align="center">
          Temperature & Humidity Trends
        </Title>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={tempData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="date" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#4dabf7"
              strokeWidth={2}
              name="Temp (°C)"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#74c0fc"
              strokeWidth={2}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </div>
  );
}