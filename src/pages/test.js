// Simple test page to verify basic Next.js functionality
import { useEffect } from 'react';

// Static export - no server-side rendering needed

export default function TestPage() {
  // Log when component mounts
  useEffect(() => {
    console.log('Test page mounted');
    return () => console.log('Test page unmounted');
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '1rem',
        color: '#333'
      }}>
        Test Page
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#666',
        maxWidth: '600px',
        lineHeight: '1.6',
        marginBottom: '2rem'
      }}>
        If you can see this message, Next.js is working correctly.
      </p>
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '600px',
        textAlign: 'left',
        marginTop: '2rem'
      }}>
        <h3 style={{
          marginTop: 0,
          color: '#333',
          borderBottom: '1px solid #ddd',
          paddingBottom: '0.5rem',
          marginBottom: '1rem'
        }}>
          Debug Information:
        </h3>
        <pre style={{
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          color: '#444'
        }}>
          {JSON.stringify({
            windowDefined: typeof window !== 'undefined',
            documentDefined: typeof document !== 'undefined',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'navigator not available',
            location: typeof window !== 'undefined' ? window.location.href : 'window not available'
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// This page is client-side only for testing purposes
