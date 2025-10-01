import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { PlayerProvider } from '../context/PlayerContext';
import AuthModal from '../components/AuthModal';
import PageLoader from '../components/PageLoader';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

// AppContent no longer needs to pass props to AuthModal
const AppContent = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PageLoader />
      <Component {...pageProps} />
      {/* AuthModal now gets its state directly from the AuthContext */}
      <AuthModal />
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <PlayerProvider>
          <Toaster
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                border: '1px solid #555',
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
          <AppContent Component={Component} pageProps={pageProps} />
        </PlayerProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
