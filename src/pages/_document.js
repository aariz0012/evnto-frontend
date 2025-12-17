import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Venuity - Book your favorite venues and experiences" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        

        {/* ✅ Favicon + PWA Icons (match your /public/favicon_io folder) */}
        <link rel="icon" href="/favicon_io/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon_io/favicon-16x16.png" sizes="16x16" />
        <link
          rel="apple-touch-icon"
          href="/favicon_io/android-chrome-192x192.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ iOS PWA meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
      <body>
        <noscript>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              textAlign: 'center',
              zIndex: 9999,
            }}
          >
            <div>
              <h2>JavaScript is required</h2>
              <p>Please enable JavaScript to run this application.</p>
            </div>
          </div>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
