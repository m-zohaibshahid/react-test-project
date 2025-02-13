'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token); // Set state based on the token

      if (token) {
        // If there's a token, we shouldn't be able to access login/register routes
        const currentPath = window.location.pathname;
        if (currentPath === '/login' || currentPath === '/register') {
          router.push('/'); // Or any other page you want to redirect to
        }
      } else {
        // If there's no token, we shouldn't be able to access protected routes
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register') {
          router.push('/login'); // Redirect to login if trying to access protected routes
        }
      }
    }
  }, [router]);

  // Wait until authentication status is determined
  if (isAuthenticated === null) {
    return null; // Return nothing or a loading spinner while the state is being determined
  }

  return (
    <html lang="en">
      <head>
        {/* Add your metadata here, such as title, meta tags, etc. */}
      </head>
      <body >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {isAuthenticated && <Header />}
            {children}
            {isAuthenticated && <Footer />}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
