import { useState } from 'react';
import { TextInput, Button, Group, ActionIcon, Box } from '@mantine/core';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const loc = `${latitude},${longitude}`;
          onSearch(loc);
        },
        () => {
          alert('Unable to access location.');
        }
      );
    } else {
      alert('Geolocation not supported.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.fullWidth}
    >
      <Box className={styles.searchContainer}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <Group position="apart" className={styles.inputGroup}>
            <TextInput
              placeholder="Search for a city..."
              icon={<FiSearch size={24} />}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              radius="md"
              size="lg"
              className={styles.searchInput}
              styles={{
                input: { 
                  backgroundColor: 'rgba(30, 30, 30, 0.8)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '18px',
                  height: '60px',
                  '&:focus': {
                    border: 'none',
                    boxShadow: '0 0 0 2px rgba(100, 100, 100, 0.5)'
                  },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.6)'
                  }
                },
                icon: { color: 'white' }
              }}
            />
            
            <ActionIcon
              size="xl"
              radius="md"
              variant="filled"
              onClick={handleLocation}
              className={styles.locationButton}
              styles={{
                root: {
                  backgroundColor: '#333333',
                  height: '60px',
                  width: '60px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#444444',
                    transform: 'translateY(-2px)'
                  }
                }
              }}
            >
              <FiMapPin size={24} />
            </ActionIcon>

            <Button
              type="submit"
              radius="md"
              size="lg"
              className={styles.searchButton}
              styles={{
                root: {
                  backgroundColor: '#222222',
                  height: '60px',
                  padding: '0 40px',
                  fontSize: '18px',
                  color: '#ffffff',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#333333',
                    transform: 'translateY(-2px)'
                  }
                },
                label: {
                  color: '#ffffff'
                }
              }}
            >
              Search
            </Button>
          </Group>
        </form>
      </Box>
    </motion.div>
  );
}