import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import thumbnail1 from "../../assets/Thumbnail (1).png"; 
import thumbnail2 from "../../assets/snakeEase.png"; 
import thumbnail3 from "../../assets/Dashboard-Nist Alma.gif"; 
import thumbnail4 from "../../assets/NEXT_zen.png"; 
import thumbnail5 from "../../assets/pulse.png"; 
import thumbnail6 from "../../assets/foodie.png"; 
import thumbnail7 from "../../assets/chit-chat.png"; 
import thumbnail8 from "../../assets/landingpage.png"; 
import thumbnail9 from "../../assets/admission.png"; 
import thumbnail10 from "../../assets/yogifoundation.png"; 
import thumbnail11 from "../../assets/logo (1).png"; 
import thumbnail12 from "../../assets/placementpage.png"; 
import thumbnail13 from "../../assets/resturant.png"; 
import thumbnail14 from "../../assets/thumbnAail.png"; 
import thumbnail15 from "../../assets/NC-Dec-2024w.png"; 
gsap.registerPlugin(ScrollTrigger);

const ProjectsPortfolio = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Adjust inView detection based on device
  const isInView = useInView(sectionRef, { 
    once: false, 
    amount: isMobile ? 0.1 : 0.2,
    margin: "0px 0px -100px 0px"
  });

  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);

  // Check if the device is mobile and handle loading
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Changed to 768 for better tablet handling
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Simulate loading (replace with actual asset loading if needed)
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(loadTimer);
    };
  }, []);

  const allProjects = [
     {
      id: 7,
      title: "Chit-chat:  real-time messaging App",
      description: "Connect Seamlessly, Chat Effortlessly: Elevate Your Conversations with Our Intuitive Chat Application!",
      categories: ["Web Development", "Landing Page"],
      image: thumbnail7 ,
      link: "https://github.com/chitranjan-nirala/chatApp",
      accentColor: "#FDA4AF"
    },
    {
      id: 1,
      title: "FreshPress: Laundry Service App",
      description: "Discover FreshPress, your ultimate laundry solution!",
      categories: ["Case Study", "UX/UI"],
      image: thumbnail1,
      link: "https://www.behance.net/gallery/202083345/Case-Study-FreshPress-Laundry-and-Ironing-Service-App",
      accentColor: "#86EFAC"
    },
    {
      id: 2,
      title: "SnackEase-Mobile App",
      description: "Enhancing the Movie-Going Experience",
      categories: ["Case Study", "UX/UI"],
      image: thumbnail2,
      link: "https://www.behance.net/gallery/200392337/SnackEase",
      accentColor: "#93C5FD"
    },
    {
      id: 3,
      title: "Dashboard:Alumni Platform",
      description: "NIST ALMA is a digital platform for students and alumni of NIST University.",
      categories: ["Case Study", "UX/UI"],
      image: thumbnail3,
      link: "https://www.behance.net/gallery/224335061/Dashboard-Design-for-Alumni-Platform",
      accentColor: "#FCA5A5"
    },
    {
      id: 4,
      title: "Next Gen Virtual Reality Experience Landing page.",
      description: "Explore In The Metaverse One Pixel At A Time",
      categories: ["Landing Page", "UX/UI"],
      image: thumbnail4,
      link: "https://www.behance.net/gallery/200570315/Next-Gen-Virtual-Reality-Experience",
      accentColor: "#FCD34D"
    },
    {
      id: 5,
      title: "Pulse Music Streaming Platform",
      description: "Music Without Limits",
      categories: ["UX/UI", "Landing Page"],
      image: thumbnail5,
      link: "https://www.behance.net/gallery/201339765/Pulse-Music-Streaming-Platform-Landing-Page",
      accentColor: "#C4B5FD"
    },
    {
      id: 6,
      title: "Foodie",
      description: "Social media campaign with interactive AR filters",
      categories: ["UX/UI", "landing Page"],
      image: thumbnail6 ,
      link: "https://www.behance.net/gallery/200571875/Foodie-Resturant-Website-Design",
      accentColor: "#FDA4AF"
    },
    
     {
      id: 8,
      title: "Convocation Landing page :NIST University",
      description: "Celebrating academic excellence and achievements",
      categories: ["Web Development", "Landing Page"],
      image: thumbnail8 ,
      link: "https://nist.edu/convocation/",
      accentColor: "#FDA4AF"
    },
    {
      id: 9,
      title: "Admission Landing page :NIST University",
      description: "Build your Dream Carrer",
      categories: ["Web Development", "Landing Page"],
      image: thumbnail9 ,
      link: "https://admission.nist.edu/",
      accentColor: "#FDA4AF"
    },
     {
      id: 10,
      title: "Yogi Foundation Landing Page",
      description: "Awakening Consciousness, Serving Humanity",
      categories: ["Web Development", "Landing Page"],
      image: thumbnail10 ,
      link: "https://github.com/chitranjan-nirala/yogi-foundation",
      accentColor: "#FDA4AF"
    },
     {
      id: 11,
      title: "Netflix Movies and TV Shows Data Analysis using SQL",
      description: "This project involves a comprehensive analysis of Netflix's movies and TV shows data using SQL. The goal is to extract valuable insights and answer various business questions based on the dataset.",
      categories: ["Web Development", "Landing Page"],
      image: thumbnail11 ,
      link: "https://github.com/chitranjan-nirala/Netflix_SQL_Project",
      accentColor: "#FDA4AF"
    },
     {
      id: 12,
      title: "Placement_cell-Website",
      description: "Introducing our cutting-edge 'Placement Management System,' a web-based application revolutionizing campus placements.",
      categories: ["Web Development", "Landing Page"],
      image: thumbnail12 ,
      link: "https://palcement-cell-website.web.app/",
      accentColor: "#FDA4AF"
    },
     {
      id: 13,
      title: "resturant-website",
      description: "🍋 Welcome to My Little Lemon Indian Restaurant! 🍋 Indulge in the vibrant flavors of India.",
      categories: ["Landing Page", "UX/UI"],
      image: thumbnail13 ,
      link: "https://github.com/chitranjan-nirala/resturant-app",
      accentColor: "#FDA4AF"
    },
    {
      id: 14,
      title: "NIST Entrance Examination Result Landing Page",
      description: "Check your NIST entrance examination results by entering your application number and date of birth below.",
      categories: ["Landing Page", "UX/UI"],
      image: thumbnail14 ,
      link: "https://aiot4s2024.nist.edu/",
      accentColor: "#FDA4AF"
    },
    {
      id: 15,
      title: "NIST Chronicle",
      // description: "Check your NIST entrance examination results by entering your application number and date of birth below.",
      categories: ["Annual Report", "Graphi Design"],
      image: thumbnail15 ,
      link: "https://www.nist.edu/downloads/eNews/NIST%20Chronicle%20December%202024.pdf",
      accentColor: "#FDA4AF"
    }
  ];

  // Shortened the descriptions for better mobile display
  const categories = ["All", "Apps", "Graphi Design", "Landing Page", "UX/UI"];
  
  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(project => project.categories.includes(activeCategory));
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      gsap.fromTo(
        ".project-card",
        { 
          y: 60, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isInView, activeCategory]);
  
  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-8 md:py-24 bg-gray-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-900/20 to-transparent rounded-full animate-[pulse_15s_infinite]" />
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-blue-900/20 to-transparent rounded-full animate-[pulse_20s_infinite]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-xs sm:text-sm font-medium text-purple-400 mb-1 sm:mb-2 inline-block">
            SELECTED WORK
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Case Studies
            </span> & Projects
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Explore my portfolio of digital experiences, where design meets functionality.
          </p>
        </motion.div>
        
        {/* Category Filter - Scroll horizontally on mobile */}
        <motion.div 
          className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 sm:gap-3 mb-8 md:mb-16 px-2 sm:px-4 no-scrollbar"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative flex-shrink-0 px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20'
                  : 'text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
              {activeCategory === category && (
                <motion.span 
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full border border-white/20"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>
        
        <AnimatePresence>
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="project-card group"
                onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                onMouseLeave={() => !isMobile && setHoveredProject(null)}
                onTouchStart={() => isMobile && setHoveredProject(project.id === hoveredProject ? null : project.id)}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} case study`}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-950 rounded-xl sm:rounded-2xl"
                >
                  <div className="relative h-full bg-gradient-to-b from-gray-900/50 to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 group-hover:-translate-y-1">
                    <div className="relative h-40 sm:h-56 md:h-64 overflow-hidden">
                      <div 
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transition-opacity duration-500 ${
                          hoveredProject === project.id ? 'opacity-100' : 'opacity-80'
                        }`}
                      />
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        animate={{
                          scale: hoveredProject === project.id ? 1.05 : 1
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex gap-1 sm:gap-2 flex-wrap max-w-[90%]">
                        {project.categories.map((category) => (
                          <span 
                            key={category} 
                            className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-xs font-medium rounded-full backdrop-blur-md bg-white/10 text-white"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredProject === project.id || isMobile ? 1 : 0,
                          y: hoveredProject === project.id || isMobile ? 0 : 10
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-1.5 sm:p-3 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-colors">
                          <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="p-3 sm:p-6">
                      <motion.h3 
                        className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-2"
                        initial={{ color: "#fff" }}
                        animate={{
                          color: hoveredProject === project.id ? project.accentColor : "#fff"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-xs sm:text-base text-gray-400 mb-2 sm:mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500">
                          VIEW CASE STUDY
                        </span>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: hoveredProject === project.id ? '100%' : 0
                          }}
                          transition={{ duration: 0.4 }}
                          className="h-px bg-gray-700 absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-20"
          >
            <div className="mx-auto w-12 h-12 sm:w-24 sm:h-24 bg-gray-800 rounded-full flex items-center justify-center mb-3 sm:mb-6">
              <svg className="w-6 h-6 sm:w-10 sm:h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-xl font-medium text-white mb-2">No projects found</h3>
            <p className="text-xs sm:text-base text-gray-400 max-w-md mx-auto px-4">
              We couldn't find any projects in the "{activeCategory}" category. Try another filter or check back later.
            </p>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 md:mt-20"
        >
          <p className="text-sm text-gray-400 mb-3 sm:mb-6">Want to see more of my work?</p>
          <button className="px-5 py-2 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-xs sm:text-base">
            View Full Portfolio
            <span className="ml-1 sm:ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </div>

      {/* Add custom CSS for horizontal scrollbar */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  );
};

export default ProjectsPortfolio;