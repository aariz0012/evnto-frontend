import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Simple test component to check if React is working
  const TestComponent = () => (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Test Component</h1>
      <p>If you can see this, React is working!</p>
    </div>
  );

  return (
    <AuthProvider>
      {/* Temporarily replace with TestComponent */}
      <TestComponent />
      {/* <Component {...pageProps} /> */}
    </AuthProvider>
  );
}

export default MyApp;
