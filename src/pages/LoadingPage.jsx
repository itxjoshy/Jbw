import { motion } from 'framer-motion';

function LoadingPage() {
  return (
    <div className="page loading-page">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p>Loading Netflix experience...</p>
    </div>
  );
}

export default LoadingPage;
