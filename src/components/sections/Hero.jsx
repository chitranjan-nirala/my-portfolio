import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import resume from '../../assets/Chitranjan_Resume.pdf';
import heroImage from '../../assets/_DAP2434-Photoroom.png'

const Hero = () => {
  const heroRef = useRef(null);
  const backgroundShapeRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Animation effect for background elements
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (backgroundShapeRef.current) {
        const currentY = parseFloat(backgroundShapeRef.current.style.transform?.split(',')[1] || '0');
        const newY = currentY === 0 ? '20px' : '0px';
        backgroundShapeRef.current.style.transform = `translateY(${newY})`;
        backgroundShapeRef.current.style.transition = 'transform 2s ease-in-out';
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 text-white pt-16"
      id="home"
    >
      {/* Background elements */}
      <div 
        ref={backgroundShapeRef}
        className="absolute top-1/3 -right-64 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
      />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
      
      <div className="container mx-auto pl-8 pr-2 md:pl-24 md:pr-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Name - Always first */}
            <div className="order-1 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-2"
              >
                <span className="text-white-600 font-bold text-xl md:text-2xl" style={{ fontSize: "35px"  }}>I am Chitranjan Nirala</span>
              </motion.div>
            </div>

            {/* Hero image - Second on mobile, after name but before titles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:hidden flex justify-center relative order-2 my-8"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative w-72 h-72 cursor-pointer group"> 
                {/* Background shine effect - Rotates on hover with container */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/0 to-blue-500/20 rounded-3xl 
                    transition-all duration-700 ease-in-out ${isHovering ? 'opacity-100 rotate-12' : 'opacity-50 rotate-6'}`}
                />
                
                {/* Profile picture container with hover effects */}
                <div 
                  className={`absolute inset-0 rounded-3xl overflow-hidden border-2 border-purple-500/30 
                    transition-all duration-500 ${isHovering ? 'rotate-0' : 'rotate-6'}`}
                >
                  {/* Image with hover zoom effect */}
                  <img 
                    src={heroImage} 
                    alt="Chitranjan Nirala - Web Developer and UI/UX Designer" 
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out
                      ${isHovering ? 'scale-110 filter saturate-110' : 'scale-100'}`}
                  />
                  
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent 
                    transition-opacity duration-500 ${isHovering ? 'opacity-10' : 'opacity-0'}`}>
                  </div>
                </div>         
              </div>
            </motion.div>

            {/* Professional titles - Third on mobile */}
             <div className="order-3 mb-4">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-bold mb-0 text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
                style={{ 
                  fontSize: "clamp(2.875rem, 5vw, 4rem)", 
                  marginBottom: "15px" 
                }}
              >
                <span className="bg-gradient-to-r from-purple-400 to-white text-transparent bg-clip-text">Web Developer +</span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-bold mb-6 text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
                style={{ 
                  fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)", 
                  marginBottom: "10px" 
                }}
              >
                <span className="bg-gradient-to-r from-purple-400 to-white text-transparent bg-clip-text">UI/UX Designer</span>
              </motion.h2>
            </div>

            {/* Description and buttons - Last on mobile */}
            <div className="order-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-300 text-lg mb-8 max-w-lg"
              >
                I break down complex user experience problems to
                create integrity focussed solutions that connect
                billions of people
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={resume}
                  download="Chitranjan_Resume.pdf"
                  className="px-6 py-3 border border-purple-500 rounded-full text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  Download CV
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                
                <div className="flex gap-4 items-center">
                  {/* Social icons */}
                  {[
                    {
                      icon: "facebook",
                      url: "https://www.facebook.com/your-profile", // replace with your actual profile
                      path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                    },
                    {
                      icon: "linkedin",
                      url: "https://www.linkedin.com/in/chitranjan-kumar-nirala-a82600202/",
                      path: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                    },
                    {
                      icon: "behance",
                      url: "https://www.behance.net/chitranjankumar28",
                      path: "M8.184 10.186c.872 0 1.584-.706 1.584-1.577 0-.872-.712-1.577-1.584-1.577h-3.184v3.154h3.184zm13.815.296c-.537-1.645-2.054-2.045-3.676-2.045-1.235 0-2.257.186-2.94.438v9.222h2.33v-3.344c.272.073.635.134 1.065.134 2.184 0 3.537-1.39 3.221-4.405zm-5.286 1.21v-2.008c.226-.067.526-.118.919-.118 1.246 0 1.869.635 1.869 1.38 0 .77-.555 1.43-1.869 1.43-.38 0-.703-.033-.919-.084zm-5.497-1.18c0-2.164-1.49-3.373-3.521-3.373h-5.695v11.808h5.553c2.098 0 3.664-1.238 3.664-3.42 0-1.471-.59-2.383-1.591-2.936 1.109-.454 1.59-1.407 1.59-2.58zm-5.434 5.354h-2.257v-2.362h2.234c.941 0 1.615.437 1.615 1.2 0 .822-.6 1.162-1.592 1.162zm7.218-9.566h5.6v1.325h-5.6v-1.325z"
                    },                    
                    {
                      icon: "dribbble",
                      url: "https://dribbble.com/Chitra_123",
                      path: "M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"
                    },
                    {
                      icon: "github",
                      url: "https://github.com/chitranjan-nirala",
                      path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-purple-500 flex items-center justify-center text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>

              </motion.div>
            </div>
          </div>
          
          {/* Hero image - Only visible on large screens (lg and above) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex w-full lg:w-1/2 justify-center relative my-8 lg:my-0"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 cursor-pointer group"> 
              {/* Background shine effect - Rotates on hover with container */}
              <div 
                className={`absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-blue-500/0 to-blue-500/20 rounded-3xl 
                  transition-all duration-700 ease-in-out ${isHovering ? 'opacity-100 rotate-12' : 'opacity-50 rotate-6'}`}
              />
              
              {/* Profile picture container with hover effects */}
              <div 
                className={`absolute inset-0 rounded-3xl overflow-hidden border-2 border-purple-500/30 
                  transition-all duration-500 ${isHovering ? 'rotate-0' : 'rotate-6'}`}
              >
                {/* Image with hover zoom effect */}
                <img 
                  src={heroImage} 
                  alt="Chitranjan Nirala - Web Developer and UI/UX Designer" 
                  className={`w-full h-full object-cover transition-all duration-700 ease-in-out
                    ${isHovering ? 'scale-110 filter saturate-110' : 'scale-100'}`}
                />
                
                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent 
                  transition-opacity duration-500 ${isHovering ? 'opacity-10' : 'opacity-0'}`}>
                </div>
              </div>         
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;