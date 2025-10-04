import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { PlayerProvider } from '../context/PlayerContext';
import { ModalProvider, useModal } from '../context/ModalContext';
import PageLoader from '../components/PageLoader';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

import ShareModal from '../components/ShareModal';
import BeatModal from '../components/BeatModal';
import NegotiationModal from '../components/NegotiationModal';
import PlaylistModal from '../components/PlaylistModal';
import UploadModal from '../components/UploadModal';
import AuthModal from '../components/AuthModal';
import WelcomeModal from '../components/WelcomeModal';

const ModalRenderer = () => {
  const { modal, closeModal } = useModal();
  if (!modal.type) return null;

  switch (modal.type) {
    case 'share':
      return <ShareModal item={modal.props.item} isVisible={true} onClose={closeModal} />;
    case 'beat':
      return <BeatModal beat={modal.props.beat} isOpen={true} onClose={closeModal} />;
    case 'negotiation':
      return <NegotiationModal beat={modal.props.beat} isOpen={true} onClose={closeModal} />;
    case 'playlist':
      return <PlaylistModal track={modal.props.track} isOpen={true} onClose={closeModal} />;
    case 'upload':
      return <UploadModal isOpen={true} onClose={closeModal} />;
    case 'auth':
      return <AuthModal isOpen={true} onClose={closeModal} initialMode={modal.props.initialMode} />;
    case 'welcome':
      return <WelcomeModal isOpen={true} onClose={closeModal} />;
    default:
      return null;
  }
};

const AppContent = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PageLoader />
      <Component {...pageProps} />
      <ModalRenderer />
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
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
    </ModalProvider>
  );
}

export default MyApp;
