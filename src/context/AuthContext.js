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
    const checkAuth = async () => {
      try {
        const token = Cookies.get('token');
        if (token) {
          // Verify token with backend
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (data.isHost) {
            setHost(data.data);
          } else {
            setUser(data.data);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        Cookies.remove('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register user
  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/user`, userData);
      
      if (res.data.success) {
        setUser(jwt_decode(res.data.token));
        Cookies.set('token', res.data.token, { expires: 7 });
        setLoading(false);
        return res.data;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setLoading(false);
      throw err;
    }
  };

  // Register host
  const registerHost = async (hostData) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/host`, hostData);
      
      if (res.data.success) {
        setHost(jwt_decode(res.data.token));
        Cookies.set('token', res.data.token, { expires: 7 });
        setLoading(false);
        return res.data;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setLoading(false);
      throw err;
    }
  };

  // Login user
  const loginUser = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/user`, {
        email,
        password
      });
      
      if (res.data.success) {
        setUser(jwt_decode(res.data.token));
        Cookies.set('token', res.data.token, { expires: 7 });
        setLoading(false);
        return res.data;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
      setLoading(false);
      throw err;
    }
  };

  // Login host
  const loginHost = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/host`, {
        email,
        password
      });
      
      if (res.data.success) {
        setHost(jwt_decode(res.data.token));
        Cookies.set('token', res.data.token, { expires: 7 });
        setLoading(false);
        return res.data;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
      setLoading(false);
      throw err;
    }
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
    verifyOTP
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
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
