import { motion } from 'framer-motion';

const Modal = ({ onClose, children }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg max-w-md mx-auto">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default Modal;
