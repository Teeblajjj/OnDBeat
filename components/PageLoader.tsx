import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import FuturisticVisualizer from './FuturisticVisualizer';

const PageLoader = () => {
  const router = useRouter();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTopLoader, setIsTopLoader] = useState(false);
  const [progress, setProgress] = useState(0);

  const topLoaderRoutes = ['/', '/explore'];

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const startProgress = () => {
      setProgress(0);
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            if (timer) clearInterval(timer);
            return 95;
          }
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 95);
        });
      }, 800);
    };

    const handleStart = (url: string) => {
      const newPath = url.split('?')[0];
      if (newPath !== router.asPath) {
        if (topLoaderRoutes.includes(newPath)) {
          setIsTopLoader(true);
        } else {
          setIsFullScreen(true);
        }
        startProgress();
      }
    };

    const handleComplete = () => {
      if (timer) clearInterval(timer);
      setProgress(100);
      setTimeout(() => {
        setIsFullScreen(false);
        setIsTopLoader(false);
      }, 400);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
      if (timer) clearInterval(timer);
    };
  }, [router]);

  return (
    <>
      <AnimatePresence>
        {isTopLoader && (
          <div className="fixed top-0 left-0 right-0 z-[9999]">
            <motion.div
              className="h-1 bg-green-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-[9998] backdrop-blur-md"
          >
            <FuturisticVisualizer size={32} />
            <div className="w-48 mt-6">
              <div className="w-full bg-neutral-700 rounded-full h-1.5">
                <motion.div
                  className="bg-green-500 h-1.5 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
              <motion.p 
                className="text-center text-green-400 text-sm font-mono mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageLoader;
