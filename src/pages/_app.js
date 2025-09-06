import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      color: '#721c24',
      backgroundColor: '#f8d7da',
      border: '1px solid #f5c6cb',
      borderRadius: '4px',
      marginTop: '2rem'
    }}>
      <h2>Something went wrong</h2>
      <pre style={{
        whiteSpace: 'pre-wrap',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '4px',
        overflowX: 'auto'
      }}>
        {error.message}\n\n{error.stack}
      </pre>
      <button 
        onClick={resetErrorBoundary}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  // Error boundary effect
  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('Uncaught error:', error, errorInfo);
      setError(error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Reset error state on route change
  useEffect(() => {
    const handleRouteChange = () => {
      if (hasError) {
        setHasError(false);
        setError(null);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [hasError, router.events]);

  if (hasError) {
    return (
      <ErrorFallback 
        error={error} 
        resetErrorBoundary={() => {
          setHasError(false);
          setError(null);
        }} 
      />
    );
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default MyApp;
