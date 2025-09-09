import Layout from '../components/Layout';
import LoadingAnimation from '../components/LoadingAnimation'; // Import the new component
import '../styles/globals.css';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  // This effect runs once when the app loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the loading screen after 3 seconds
    }, 4000); // 3000 milliseconds = 3 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);


  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  
  return (
    <>
      <LoadingAnimation isLoading={loading} />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;