import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function Error({ statusCode }) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    if (statusCode >= 500) {
      console.error(`Server error ${statusCode} on ${router.asPath}`);
    }
  }, [statusCode, router.asPath]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{statusCode ? `${statusCode} Error` : 'An error occurred'}</title>
      </Head>
      
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            {statusCode || 'Error'}
          </h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {statusCode === 404
              ? 'Page not found'
              : statusCode === 500
              ? 'Server error'
              : 'An error occurred'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {statusCode === 404
              ? 'The page you are looking for does not exist.'
              : 'Sorry, something went wrong. Please try again later.'}
          </p>
        </div>
        
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
