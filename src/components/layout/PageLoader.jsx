import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          // Make body visible once loading is complete
          document.body.style.visibility = "visible";
        }
      });
      
      tl.to(".loader-text span", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      })
      .to(".loader-progress", {
        width: "100%",
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.3")
      .to(".loader-wrapper", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
      
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!loading) return null;
  
  return (
    <motion.div 
      className="loader-wrapper fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
    >
      <div className="loader-text text-4xl font-bold mb-6 overflow-hidden">
        {["P", "O", "R", "T", "F", "O", "L", "I", "O"].map((letter, index) => (
          <span 
            key={index}
            className="inline-block transform translate-y-full opacity-0" 
            style={{ display: 'inline-block' }}
          >
            {letter}
          </span>
        ))}
      </div>
      
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="loader-progress h-full w-0 bg-gradient-to-r from-secondary to-accent rounded-full" />
      </div>
    </motion.div>
  );
};

export default PageLoader;