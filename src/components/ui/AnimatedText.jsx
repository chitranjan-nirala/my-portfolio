import { motion } from "framer-motion";

const AnimatedText = ({ text, className = "", variant = "h1" }) => {
  // Split text into words
  const words = text.split(" ");
  
  // Variants for container
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  
  // Variants for each word
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  // Component based on variant
  const Component = variant === "h1" 
    ? motion.h1 
    : variant === "h2" 
    ? motion.h2 
    : variant === "h3" 
    ? motion.h3 
    : motion.p;
  
  return (
    <Component
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};

export default AnimatedText;