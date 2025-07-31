import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getServerSidePropsWrapper } from '../context/AuthContext';

export function withAuth(WrappedComponent, options = {}) {
  const { requireAuth = true, redirectTo = '/login' } = options;

  const Wrapper = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (requireAuth && !isAuthenticated) {
          router.push(redirectTo);
        } else if (!requireAuth && isAuthenticated) {
          router.push(redirectTo || '/dashboard');
        }
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (requireAuth && !isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (WrappedComponent.getInitialProps) {
    Wrapper.getInitialProps = WrappedComponent.getInitialProps;
  }

  // Add getServerSideProps for SSR
  Wrapper.getServerSideProps = getServerSidePropsWrapper(
    WrappedComponent.getServerSideProps
  );

  return Wrapper;
}

export function withAuthServerSideProps(getServerSidePropsFunc) {
  return getServerSidePropsWrapper(getServerSidePropsFunc);
}
