import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to handle animations with GSAP
 * @param {React.RefObject} ref - The reference to the element to animate
 * @param {Object} options - Animation options
 * @returns {boolean} - Whether the element is in view
 */
export const useAnimations = (ref, options = {}) => {
  const {
    type = 'fade', // 'fade', 'slideUp', 'slideIn', 'scale', 'stagger'
    duration = 0.8,
    delay = 0,
    from = {}, // Custom from properties
    trigger = null, // Custom trigger element
    start = 'top 80%',
    markers = false,
    staggerChildren = 0.1,
    staggerFrom = 'start', // 'start', 'end', 'center', 'edges'
    scrub = false,
    once = true,
    threshold = 0.3,
  } = options;

  // Use framer-motion's useInView for tracking visibility
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });

  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const triggerElement = trigger ? document.querySelector(trigger) : element;
    
    // Base animation properties
    let fromProps = {
      duration,
      ease: 'power3.out',
    };
    
    // Define animation types
    switch (type) {
      case 'fade':
        fromProps = {
          ...fromProps,
          opacity: 0,
          ...from,
        };
        break;
      case 'slideUp':
        fromProps = {
          ...fromProps,
          opacity: 0,
          y: 50,
          ...from,
        };
        break;
      case 'slideIn':
        fromProps = {
          ...fromProps,
          opacity: 0,
          x: from.fromLeft ? -50 : 50,
          ...from,
        };
        break;
      case 'scale':
        fromProps = {
          ...fromProps,
          opacity: 0,
          scale: 0.8,
          ...from,
        };
        break;
      case 'stagger':
        // For stagger animations, we need to set up differently
        break;
      default:
        fromProps = {
          ...fromProps,
          opacity: 0,
          ...from,
        };
    }
    
    let animation;
    
    // Create animation
    if (type === 'stagger') {
      // For staggered children elements
      const children = element.querySelectorAll('.stagger-item');
      if (children.length) {
        animation = gsap.fromTo(
          children,
          { opacity: 0, y: 20, ...from },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger: {
              amount: staggerChildren,
              from: staggerFrom,
            },
            scrollTrigger: {
              trigger: triggerElement,
              start,
              markers,
              scrub,
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    } else {
      // For simple animations
      animation = gsap.fromTo(
        element,
        fromProps,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          delay,
          scrollTrigger: {
            trigger: triggerElement,
            start,
            markers,
            scrub,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    
    // Clean up
    return () => {
      if (animation && animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (animation) {
        animation.kill();
      }
    };
  }, [isInView, ref, type, duration, delay, from, trigger, start, markers, scrub, staggerChildren, staggerFrom]);
  
  return isInView;
};

export default useAnimations;