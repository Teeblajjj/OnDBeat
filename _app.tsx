
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout'; // Import the new Layout
import '../styles/globals.css';
import { useRouter } from 'next/router';

const AppContent = ({ Component, pageProps }: AppProps) => {
  const { isAuthModalOpen, closeAuthModal, authMode } = useAuth();
  const router = useRouter();

  // Pages that should not have the main layout
  // We can add to this array as we build more pages like landing pages, etc.
  const pagesWithCustomLayout = [
    '/dashboard/negotiations',
    `/negotiations/${router.query.id}`,
    `/dashboard/negotiations/${router.query.id}`,
  ]

  const shouldUseLayout = !pagesWithCustomLayout.includes(router.pathname);

  return (
    <>
      {shouldUseLayout ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
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
      <AppContent Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
