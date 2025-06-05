import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import sections
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";

const Home = () => {
  // Setup GSAP animations
  useEffect(() => {
    // Create a smooth scrolling effect for the entire page
    gsap.to("body", { 
      scrollTrigger: {
        scrub: 0.3,
        ease: "power2.inOut",
        invalidateOnRefresh: true,
      }
    });
    
    // Clean up ScrollTrigger instances to prevent memory leaks
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-primary overflow-hidden">
      {/* Preloader (optional) */}
      {/* <div className="fixed inset-0 z-50 bg-primary flex items-center justify-center">
        <div className="text-4xl">Loading...</div>
      </div> */}
      
      {/* Main content */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;