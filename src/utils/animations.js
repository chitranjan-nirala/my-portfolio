import gsap from 'gsap';

/**
 * Animation utility functions for common animations
 */

// Animation presets for elements
export const animationPresets = {
  // Button hover effect
  buttonHover: (element) => {
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      });
    };
    
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    
    // Return cleanup function
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  },
  
  // Reveal text character by character
  textReveal: (element, delay = 0) => {
    const text = element.textContent;
    const characters = text.split("");
    
    // Clear the text content
    element.textContent = "";
    
    // Create span for each character
    characters.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // Use non-breaking space for spaces
      span.style.display = "inline-block";
      span.style.opacity = "0";
      element.appendChild(span);
    });
    
    // Animate each character
    const spans = element.querySelectorAll("span");
    gsap.to(spans, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.03,
      delay,
      ease: "none"
    });
    
    return () => {
      gsap.killTweensOf(spans);
    };
  },
  
  // Parallax scroll effect
  parallaxScroll: (element, speed = 0.5) => {
    const parallaxEffect = () => {
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * speed;
      
      gsap.set(element, {
        y: translateY
      });
    };
    
    window.addEventListener("scroll", parallaxEffect);
    
    // Initial call
    parallaxEffect();
    
    // Return cleanup function
    return () => {
      window.removeEventListener("scroll", parallaxEffect);
    };
  },
  
  // Floating animation for elements
  floatingAnimation: (element, options = {}) => {
    const {
      yAmount = 15,
      duration = 2,
      ease = "sine.inOut"
    } = options;
    
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true
    });
    
    tl.to(element, {
      y: yAmount,
      duration,
      ease
    });
    
    return () => {
      tl.kill();
    };
  },
  
  // Image reveal effect
  imageReveal: (container, image, options = {}) => {
    const {
      duration = 1,
      delay = 0,
      ease = "power2.inOut"
    } = options;
    
    // Create overlay element
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "#0f172a"; // Primary color
    overlay.style.transformOrigin = "left";
    
    // Add overlay to container
    container.style.position = "relative";
    container.style.overflow = "hidden";
    container.appendChild(overlay);
    
    // Set image initial state
    gsap.set(image, { opacity: 0 });
    
    // Create animation timeline
    const tl = gsap.timeline({ delay });
    
    tl.to(image, {
      opacity: 1,
      duration: duration * 0.5
    })
    .to(overlay, {
      scaleX: 0,
      duration,
      ease
    }, "-=0.3");
    
    return () => {
      tl.kill();
      if (container.contains(overlay)) {
        container.removeChild(overlay);
      }
    };
  },
  
  // Scroll-triggered fade in
  scrollFadeIn: (element, options = {}) => {
    const {
      y = 50,
      duration = 0.8,
      start = "top 80%",
      markers = false
    } = options;
    
    const animation = gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          markers,
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }
};

// Animation sequences for page sections
export const animationSequences = {
  // Hero section entrance animation
  heroEntrance: (elements) => {
    const { title, description, buttons, image } = elements;
    
    const tl = gsap.timeline();
    
    tl.from(title, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(description, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4")
    .from(buttons, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.3")
    .from(image, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5");
    
    return () => {
      tl.kill();
    };
  },
  
  // Page transition effect
  pageTransition: (enterElement, leaveElement) => {
    const tl = gsap.timeline();
    
    if (leaveElement) {
      tl.to(leaveElement, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in"
      });
    }
    
    tl.from(enterElement, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out"
    }, leaveElement ? ">" : 0);
    
    return () => {
      tl.kill();
    };
  }
};

// Initialize all page animations
export const initPageAnimations = () => {
  // Global page animations
  const setupGlobalAnimations = () => {
    // Smooth scroll animation
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 80
            },
            ease: "power3.inOut"
          });
        }
      });
    });
  };
  
  setupGlobalAnimations();
  
  // Return cleanup function
  return () => {
    // Clean up will happen in component unmounts
  };
};

export default {
  animationPresets,
  animationSequences,
  initPageAnimations
};