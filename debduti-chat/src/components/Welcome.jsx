// src/components/Welcome.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import './Welcome.css';

const Welcome = ({ onNavigate }) => {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", stiffness: 70, damping: 15,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Generate random glowing floating hearts for the background
  const floatingHearts = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 35 + 10,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15, // Slower for a cosmic feel
  }));

  return (
    <div className="welcome-container">
      {/* Animated Floating Background - Glowing Hearts */}
      <div className="floating-background">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "100vh", x: 0, opacity: 0 }}
            animate={{ 
              y: "-20vh", 
              x: Math.sin(heart.id) * 80, // More pronounced swaying
              opacity: [0, 0.6, 0] // Brighter background hearts
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              left: heart.left,
              /* Neon Blue/Purple glow effect */
              filter: `drop-shadow(0 0 5px rgba(59, 130, 246, 0.4))`
            }}
          >
            {/* Background hearts colored teal/blue */}
            <Heart size={heart.size} fill="#3b82f6" color="#3b82f6" opacity={0.4} />
          </motion.div>
        ))}
      </div>

      {/* Main Glass Card with Framer Motion */}
      <motion.div 
        className="glass-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        // Subtle 3D hover effect
        whileHover={{ scale: 1.01, rotateY: 1, rotateX: -1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      >
        <motion.div variants={itemVariants} className="title-container">
          <motion.div
            className="heart-pop"
            animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            {/* The main name heart is a vibrant Luminous Pink */}
            <Heart fill="#ec4899" color="#ec4899" size={36} style={{ filter: 'drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))' }} />
          </motion.div>
          <h1 className="title">Hi, DEBDUTI</h1>
        </motion.div>
        
        <motion.p className="quote" variants={itemVariants}>
          "Because the best love stories are the ones that never really end."
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.button 
            className="chat-button"
            onClick={onNavigate}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            Chat with Sirshendu
            <motion.div
               animate={{ x: [0, 7, 0] }}
               transition={{ repeat: Infinity, duration: 1.2 }}
            >
               {/* Button heart remains bright white */}
               <Heart size={22} fill="white" />
            </motion.div>
          </motion.button>
        </motion.div>
        
        <motion.p className="availability" variants={itemVariants}>
          Available 24x7 • Just for you
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Welcome;