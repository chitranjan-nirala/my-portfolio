import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedText from "../ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState("All");
  
  const skillsData = [
    {
      category: "Programming",
      skills: [
        { name: "JAVA", level: 90 },
        { name: "C++", level: 85 },
        { name: "Python", level: 75 },
        { name: "JavaScript", level: 80 },
        { name: "HTML/CSS", level: 95 },
        { name: "SQL", level: 85 },
      ]
    },
    {
      category: "Design",
      skills: [
        { name: "Tailwind CSS", level: 90 },
        { name: "Figma", level: 80 },
        { name: "Adobe Photoshop", level: 85 },
        { name: "CorelDraw", level: 95 },
        { name: "Canva", level: 90 },
        { name: "Adobe InDesign", level: 50 }
      ]
    },
    {
      category: "Frameworks",
      skills: [
        { name: "React", level: 80 },
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 95 },
        { name: "Bootstrap", level: 90 },
        { name: "pandas", level: 50 },
        { name: "NumPy", level: 50 },
        { name: "Matplotlib", level: 50 }
      ]
    },
    {
      category: "Animation",
      skills: [
        { name: "GSAP", level: 85 },
        { name: "Framer Motion", level: 90 },
        { name: "CSS Animations", level: 80 },
        { name: "Three.js", level: 70 },
      ]
    }
  ];

  const categories = ["All", ...skillsData.map(item => item.category)];
  
  useEffect(() => {
    if (isInView) {
      const skillBars = document.querySelectorAll(".skill-progress-bar");
      
      skillBars.forEach((bar) => {
        const level = bar.getAttribute("data-level");
        
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isInView, activeCategory]);
  
  // Get filtered skills based on active category
  const getFilteredSkills = () => {
    if (activeCategory === "All") {
      return skillsData;
    }
    return skillsData.filter(item => item.category === activeCategory);
  };

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-12 sm:py-20 bg-gradient-to-br from-primary/40 to-primary/60 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/10 blur-3xl rounded-full" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <AnimatedText 
          text="Skills & Expertise" 
          variant="h2"
          className="text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-16" 
        />
        
        {/* Category Filter Tabs - Scrollable on mobile */}
        <div className="flex justify-start sm:justify-center overflow-x-auto pb-4 sm:pb-0 mb-8 sm:mb-12 -mx-4 px-4 sm:px-0 sm:flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCategory === category
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : "bg-white/10 backdrop-blur-sm hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Skills Cards - 1 column on mobile, 2-3 on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <AnimatePresence mode="wait">
            {getFilteredSkills().map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-white/10 hover:border-accent/30 transition-all duration-300 shadow-xl shadow-black/5"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8 text-accent flex items-center">
                  <span className="inline-block w-2 h-6 sm:h-8 bg-accent mr-3 rounded-full"></span>
                  {category.category}
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="font-medium sm:text-lg">{skill.name}</span>
                        <span className="text-accent font-bold">{skill.level}%</span>
                      </div>
                      
                      <div className="h-2 sm:h-2.5 w-full bg-white/10 rounded-full overflow-hidden relative">
                        <div 
                          className="skill-progress-bar h-full bg-gradient-to-r from-secondary via-accent to-secondary/80 rounded-full relative"
                          data-level={skill.level}
                        >
                          {/* Animated glow effect */}
                          <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Tech Stack - Better wrap on mobile */}
        <div className="mt-16 sm:mt-24">
          <AnimatedText 
            text="Technical Stack" 
            variant="h3"
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12" 
          />
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              "React", "JavaScript", "Tailwind CSS", "GSAP", "Framer Motion", 
              "Git", "Node.js", "Figma", "Responsive Design", "C++", 
              "SQL", "Java", "Python", "Excel"
            ].map((tech, index) => (
              <motion.div
                key={tech}
                className="px-3 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-accent transition-all duration-300 group text-sm sm:text-base"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5, 
                  backgroundColor: "rgba(255,255,255,0.1)",
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)"
                }}
              >
                <span className="font-medium relative">
                  {tech}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Level Indicator - Stacked on mobile */}
        <motion.div 
          className="mt-16 sm:mt-24 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">Experience Level</h3>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="w-full sm:w-1/3 text-center">
              <div className="relative inline-block">
                <svg className="w-24 h-24 sm:w-32 sm:h-32">
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="45%" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="8" 
                  />
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="45%" 
                    fill="none" 
                    stroke="url(#gradientFrontend)" 
                    strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={isInView ? "71" : "283"} // 75% filled
                    strokeLinecap="round"
                    style={{ 
                      transition: "stroke-dashoffset 1.5s ease-in-out",
                    }}
                  />
                  <defs>
                    <linearGradient id="gradientFrontend" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg sm:text-2xl font-bold">75%</div>
              </div>
              <h4 className="mt-3 sm:mt-4 text-lg sm:text-xl font-medium">Frontend</h4>
            </div>
            
            <div className="w-full sm:w-1/3 text-center">
              <div className="relative inline-block">
                <svg className="w-24 h-24 sm:w-32 sm:h-32">
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="45%" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="8" 
                  />
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="45%" 
                    fill="none" 
                    stroke="url(#gradientBackend)" 
                    strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={isInView ? "113" : "283"} // 60% filled
                    strokeLinecap="round"
                    style={{ 
                      transition: "stroke-dashoffset 1.5s ease-in-out",
                    }}
                  />
                  <defs>
                    <linearGradient id="gradientBackend" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg sm:text-2xl font-bold">60%</div>
              </div>
              <h4 className="mt-3 sm:mt-4 text-lg sm:text-xl font-medium">Backend</h4>
            </div>
            
            <div className="w-full sm:w-1/3 text-center">
              <div className="relative inline-block">
                <svg className="w-24 h-24 sm:w-32 sm:h-32">
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="45%" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="8" 
                  />
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="45%" 
                    fill="none" 
                    stroke="url(#gradientDesign)" 
                    strokeWidth="8" 
                    strokeDasharray="283" 
                    strokeDashoffset={isInView ? "85" : "283"} // 70% filled
                    strokeLinecap="round"
                    style={{ 
                      transition: "stroke-dashoffset 1.5s ease-in-out",
                    }}
                  />
                  <defs>
                    <linearGradient id="gradientDesign" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg sm:text-2xl font-bold">70%</div>
              </div>
              <h4 className="mt-3 sm:mt-4 text-lg sm:text-xl font-medium">Design</h4>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;