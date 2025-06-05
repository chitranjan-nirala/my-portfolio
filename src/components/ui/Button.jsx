import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const Button = ({ children, primary = true, onClick, className = "" }) => {
  const buttonRef = useRef(null);
  
  // GSAP hover effect
  useEffect(() => {
    const button = buttonRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    };
    
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium relative overflow-hidden ${
        primary 
          ? "bg-secondary text-white" 
          : "bg-transparent border-2 border-secondary text-secondary"
      } ${className}`}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-accent"
        initial={{ scale: 0, borderRadius: "100%" }}
        whileHover={{ scale: 1.5, borderRadius: "0%" }}
        transition={{ duration: 0.5 }}
        style={{ originX: 0.5, originY: 0.5, opacity: 0.3 }}
      />
    </motion.button>
  );
};

export default Button;