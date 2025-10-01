
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { PlayerProvider } from '../context/PlayerContext';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import '../styles/globals.css';

const AppContent = ({ Component, pageProps }: AppProps) => {
  const { isAuthModalOpen, closeAuthModal, authMode } = useAuth();

  return (
    <>
      <Component {...pageProps} />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialMode={authMode} 
      />
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <PlayerProvider>
          <AppContent Component={Component} pageProps={pageProps} />
        </PlayerProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
