import { useEffect, useState } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
import LoadingPage from '../components/LoadingPage';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the initial animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Venuity - Your venue booking platform" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/logo192.png" />
        
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        <title>Venuity</title>
      </Head>
      <AuthProvider>
        {loading ? <LoadingPage /> : <Component {...pageProps} />}
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </>
  );
}
