import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstTimeOpen: boolean;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, isFirstTimeOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-300">How to Play</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>Welcome to the Word Memory Game! Here's how to play:</p>
              
              <ol className="list-decimal list-inside space-y-2">
                <li>You'll see 5 words for few seconds</li>
                <li>Memorize these words carefully</li>
                <li>The words will disappear briefly</li>
                <li>When they reappear, one word will be different</li>
                <li>Your task is to identify the changed word</li>
              </ol>
              
              <p className="text-purple-300 font-semibold mt-4">
                Ready to test your memory?
              </p>
              <div className='justify-center w-full flex'>
              {
                isFirstTimeOpen && (
                <button
                  onClick={onClose}
                  className='m-4 bg-purple-500 text-white h-12 p-2 items-center justify-center rounded-full flex'
                  >
                    Start Playing
                </button>
              )}
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};