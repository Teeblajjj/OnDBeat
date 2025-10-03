import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { PlayerProvider } from '../context/PlayerContext';
import { ModalProvider } from '../context/ModalContext'; // Import the ModalProvider
import AuthModal from '../components/AuthModal';
import PageLoader from '../components/PageLoader';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const AppContent = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PageLoader />
      <Component {...pageProps} />
      <AuthModal />
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <PlayerProvider>
          <ModalProvider> {/* Add the ModalProvider here */}
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
          </ModalProvider>
        </PlayerProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
