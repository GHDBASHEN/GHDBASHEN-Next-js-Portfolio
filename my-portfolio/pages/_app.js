import Layout from '../components/Layout';
import LoadingAnimation from '../components/LoadingAnimation'; 
import '../styles/globals.css';
import { useState, useEffect } from 'react';
// IMPORT THE PROVIDER
import { ThemeProvider } from '../context/ThemeContext'; 

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  
  return (
    // WRAP EVERYTHING HERE
    <ThemeProvider>
      <LoadingAnimation isLoading={loading} />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;