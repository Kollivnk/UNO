
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FinalComponent: React.FC = () => {
  return (
    <div className="w-full relative">
      {/* <h2 className="text-center text-3xl font-bold text-gray-800 my-8">
        Final Birthday Message
      </h2> */}
      
      <motion.div
        className="w-full flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl w-full p-8">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            {/* UNO Logo Accent */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-700 rounded-full w-16 h-16 flex items-center justify-center">
                <span className="text-white font-bold text-xl">❤️</span>
              </div>
            </div>
            {/* Animated Headline */}
            <motion.h3
              className="text-3xl font-bold text-gray-800 text-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
               To One of My All-Time Favorite People 💛
            </motion.h3>
            {/* Animated Main Message */}
            <motion.p
              className="text-xl text-gray-700 text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
               You're one of those rare people who just make everything better — with your calm nature, thoughtful words, and just being you.
            </motion.p>
            {/* Animated Secondary Message */}
            <motion.p
              className="text-lg text-gray-600 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
            </motion.p>
            {/* Animated Heart Icon */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Heart className="text-red-700" size={32} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalComponent;
