import { useState } from 'react';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '../styles/global.css'; // Import your global styles

export default function App({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState('dark'); // Keep dark mode

  return (
    <>
      <Head>
        <title>Weather Forecast</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Poppins Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark', // dark background, white glass cards
          fontFamily: 'Poppins, sans-serif',
          primaryColor: 'cyan', // accent color if needed
          components: {
            Container: {
              defaultProps: {
                size: 'lg',
              },
            },
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
