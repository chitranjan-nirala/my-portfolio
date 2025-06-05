import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/layout/PageLoader";

// Pages
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

// Utils
import { initPageAnimations } from "./utils/animations";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  // Initialize global animations
  useEffect(() => {
    const cleanup = initPageAnimations();
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: element,
                offsetY: 80
              },
              ease: "power3.inOut"
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cleanup();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-primary text-white flex flex-col">
        <PageLoader />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;