import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import Button from "../components/ui/Button";

const ProjectDetail = () => {
  const { id } = useParams();
  const mainRef = useRef(null);
  
  // Mock project data - in a real app, you would fetch this based on the ID
  const project = {
    id: parseInt(id),
    title: "E-commerce Dashboard",
    description: "A comprehensive dashboard solution for e-commerce businesses with advanced analytics, real-time updates, and intuitive user interface.",
    longDescription: `This e-commerce dashboard provides business owners with powerful tools to analyze sales data, track customer behavior, and optimize their online store performance. Built with modern frontend technologies, it offers a seamless user experience with stunning visualizations and interactive elements.

The dashboard features real-time updates, allowing users to monitor sales and customer activity as they happen. The intuitive interface makes it easy to navigate between different sections and find important information quickly.

Key features include:
- Sales analytics with customizable date ranges
- Customer behavior tracking
- Inventory management
- Order processing system
- Real-time notifications
- Mobile-responsive design`,
    tags: ["React", "Tailwind CSS", "Chart.js", "Firebase", "Framer Motion"],
    image: "/api/placeholder/1200/600", // Replace with your project image
    gallery: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    technologies: [
      { name: "React", description: "Frontend framework for building the user interface" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for styling" },
      { name: "Chart.js", description: "JavaScript library for creating interactive charts" },
      { name: "Firebase", description: "Backend services for authentication and database" },
      { name: "Framer Motion", description: "Animation library for React" }
    ],
    link: "https://example.com",
    github: "https://github.com/yourusername/project",
    year: "2024"
  };
  
  // GSAP animations
  useEffect(() => {
    if (!mainRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.from(".project-header", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".project-image", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(".project-content", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.2
    }, "-=0.3");
    
    return () => {
      tl.kill();
    };
  }, [id]);
  
  return (
    <div ref={mainRef} className="pt-24 pb-20">
      <div className="container-custom">
        {/* Back button */}
        <Link to="/#projects" className="inline-flex items-center text-gray-300 hover:text-accent mb-8 transition-colors duration-300">
          <span className="mr-2">←</span>
          Back to Projects
        </Link>
        
        {/* Project header */}
        <div className="project-header mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 text-sm bg-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">{project.description}</p>
        </div>
        
        {/* Main project image */}
        <div className="project-image mb-12">
          <div className="relative rounded-xl overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-60" />
          </div>
        </div>
        
        {/* Project content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main content - 2/3 width */}
          <div className="md:col-span-2">
            <div className="project-content mb-10">
              <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
              <div className="text-gray-300 space-y-4">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* Project gallery */}
            <div className="project-content mb-10">
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-lg overflow-hidden"
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Technologies used */}
            <div className="project-content">
              <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
              <div className="space-y-4">
                {project.technologies.map((tech) => (
                  <div key={tech.name} className="bg-white/5 rounded-lg p-4">
                    <h3 className="font-bold text-accent mb-2">{tech.name}</h3>
                    <p className="text-gray-300">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Project sidebar - 1/3 width */}
          <div className="project-content">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Project Details</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Year</h3>
                  <p>{project.year}</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Role</h3>
                  <p>Frontend Developer</p>
                </div>
                
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs bg-white/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block mb-3"
                  >
                    <Button primary className="w-full">
                      View Live Demo
                    </Button>
                  </a>
                  
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button primary={false} className="w-full">
                      View Source Code
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;