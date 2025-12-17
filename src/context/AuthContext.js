import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check if user is authenticated on initial load
 useEffect(() => {
  const initAuth = async () => {
    const token = Cookies.get('token');
    console.log('Initial auth check - Token exists:', !!token); // Debug log
    if (token) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Auth check response:', response.data); // Debug log
        if (response.data.isHost) {
          setHost(response.data.data);
        } else {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        Cookies.remove('token');
        setUser(null);
        setHost(null);
      }
    }
    setLoading(false);
  };
  initAuth();
}, []);

  // Register user
  const registerUser = async (userData) => {
     try {
       setLoading(true);
       setError(null);
       
       console.log('Sending user registration data:', JSON.stringify(userData, null, 2));
       
       const res = await axios.post(
         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/user`, 
         userData,
         {
           headers: {
             'Content-Type': 'application/json',
           },
           validateStatus: (status) => status < 500 // This will prevent axios from throwing errors on 500
         }
       );

       console.log('Registration response status:', res.status);
       console.log('Registration response data:', res.data);

       if (res.data?.success) {
         const token = res.data.token;
         if (token) {
           const decoded = jwt_decode(token);
           setUser(decoded);
           Cookies.set('token', token, { 
             expires: 7,
             secure: process.env.NODE_ENV === 'production',
             sameSite: 'strict'
           });
         }
         return { success: true, data: res.data };
       } else {
         const errorMessage = res.data?.error || 'Registration failed. Please try again.';
         throw new Error(errorMessage);
       }
     } catch (err) {
       console.error('Registration error:', err);
       setError(err.message || 'Registration failed. Please try again.');
       throw err;
     } finally {
       setLoading(false);
     }
   };

  // Register host
  const registerHost = async (hostData) => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('Sending host registration data:', JSON.stringify(hostData, null, 2));
    
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/host`, 
      hostData,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log('Registration response status:', res.status);
    console.log('Registration response data:', res.data);

    if (res.status >= 200 && res.status < 300 && res.data?.success) {
      const token = res.data.token;
      if (token) {
        const decoded = jwt_decode(token);
        setHost(decoded);
        Cookies.set('token', token, { 
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
      return { success: true, data: res.data };
    } else {
      // Handle non-success responses
      const errorMessage = res.data?.message || res.data?.error || 'Registration failed. Please try again.';
      console.error('Registration failed:', errorMessage);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  } catch (err) {
    let errorMessage = 'Registration failed. Please try again.';
    
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with error status:', err.response.status);
      console.error('Error response data:', err.response.data);
      
      // Handle different types of validation errors
      if (err.response.status === 400) {
        const backendError = err.response.data?.error || err.response.data?.message || '';
        if (backendError.toLowerCase().includes('email')) {
          errorMessage = 'Email is already in use. Please use a different email.';
        } else if (backendError.toLowerCase().includes('mobile')) {
          errorMessage = 'Mobile number is already in use. Please use a different number.';
        } else if (backendError.toLowerCase().includes('required') || backendError.toLowerCase().includes('missing')) {
          errorMessage = 'Please fill in all required fields.';
        } else {
          errorMessage = backendError || 'Invalid registration data. Please check your input.';
        }
      } else if (err.response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else {
        errorMessage = err.response.data?.error || err.response.data?.message || 'Registration failed. Please try again.';
      }
    } else if (err.request) {
      // The request was made but no response was received
      console.error('No response received:', err.request);
      errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', err.message);
      errorMessage = err.message || 'An unexpected error occurred.';
    }

    // More detailed error logging
    console.error('Registration error details:', {
      message: err.message,
      name: err.name,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      config: {
        url: err.config?.url,
        method: err.config?.method,
        data: err.config?.data
      },
      response: err.response?.data
    });

    setError(errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
};

  // Login user
   const loginUser = async (email, password) => {
     try {
       setLoading(true);
       setError(null);
       
       console.log('Attempting login with:', { email });

       const res = await axios.post(
         `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/user`,
         { email, password },
         {
           headers: { 'Content-Type': 'application/json' },
           validateStatus: (status) => status < 500 // Prevent Axios from throwing on 4xx errors
         }
       );

       console.log('Login response:', res.data);

       if (res.data.success) {
         const token = res.data.token;
         const decoded = jwt_decode(token);
         setUser(decoded);
         Cookies.set('token', token, { 
           expires: 7,
           secure: process.env.NODE_ENV === 'production',
           sameSite: 'strict'
         });
         return { success: true };
       } else {
         throw new Error(res.data.error || 'Login failed');
       }
     } catch (err) {
       const errorMessage = err.response?.data?.error || err.message || 'Login failed. Please try again.';
       console.error('Login error:', errorMessage);
       setError(errorMessage);
       throw new Error(errorMessage);
     } finally {
       setLoading(false);
     }
   };

  // Login host
  const loginHost = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const { email, password } = credentials;
      
      console.log('Attempting host login with:', { email });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/host`,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          validateStatus: (status) => status < 500 // Prevent Axios from throwing on 4xx errors
        }
      );

      console.log('Host login response:', res.data);

      if (res.status >= 200 && res.status < 300 && res.data.success) {
        const token = res.data.token;
        if (token) {
          const decoded = jwt_decode(token);
          setHost(decoded);
          Cookies.set('token', token, { 
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
        return { success: true };
      } else {
        const errorMessage = res.data?.error || res.data?.message || 'Login failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', err.response.status);
        console.error('Error response data:', err.response.data);
        errorMessage = err.response.data?.error || err.response.data?.message || 'Invalid credentials';
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received:', err.request);
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', err.message);
        errorMessage = err.message || 'An unexpected error occurred.';
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
//UpadteUserProfile
const updateUserProfile = (updatedUser) => {
  setUser(prevUser => ({
    ...prevUser,
    ...updatedUser
  }));
};

  // Logout
  const logout = () => {
    setUser(null);
    setHost(null);
    Cookies.remove('token');
    router.push('/');
  };

  // Verify OTP
  const verifyOTP = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
      setLoading(false);
      throw err;
    }
  };

  const value = {
    isAuthenticated: !!user || !!host,
    user,
    host,
    loading,
    error,
    registerUser,
    registerHost,
    loginUser,
    loginHost,
    logout,
    verifyOTP,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Server-side auth helper
export const getServerSidePropsWrapper = (getServerSidePropsFunc) => {
  return async (context) => {
    const { req, res } = context;
    const token = req.cookies.token;

    if (!token) {
      return {
        props: { user: null, host: null },
      };
    }

    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.isHost) {
        return {
          props: { host: data.data },
        };
      } else {
        return {
          props: { user: data.data },
        };
      }
    } catch (error) {
      return {
        props: { user: null, host: null },
      };
    }
  };
};
