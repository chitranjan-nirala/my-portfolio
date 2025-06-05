import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedText from "../ui/AnimatedText";
import AboutImage from '../../assets/_DAP2434-Photoroom.png'; // Import your image

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const skills = [
    "React", "JavaScript", "Tailwind CSS","SQL", "Python","java","Microsoft Azure (Fundamentals Certified)",
    "GSAP", "Framer Motion", "Responsive Design", "UI/UX Design","Git & GitHub"
  ];

  useEffect(() => {
    const section = sectionRef.current;

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(
      ".about-image",
      {
        x: -50,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <AnimatedText
          text="About Me"
          variant="h2"
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="about-image relative">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-secondary/80 to-accent/80 absolute -bottom-2 -right-2 rounded-2xl" />
              <div className="w-full h-full bg-gradient-to-tl from-gray-700 to-gray-900 absolute top-0 left-0 rounded-2xl border-2 border-white/10 overflow-hidden">
                {/* Your actual image */}
                <img
                  src={AboutImage}
                  alt="About me"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Content side */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-4"
            >
              Frontend Developer & UI Designer
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-6"
            >
              I am a passionate and results-driven Fronted Developer and UI/UX Designer with a solid foundation in Computer Science and Artificial Intelligence, earned from Techno India University. My expertise lies in seamlessly blending design and functionality to create user-centric digital solutions. With hands-on experience in both frontend and backend development, I have built and optimized real-time web applications, dashboards, and portals using technologies such as React, Node.js, and WebSockets.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-8"
            >
              In my current role at NIST University, I’ve led the redesign of the university’s landing page and developed key web applications including admission and alumni portals. My design work spans from digital brochures to high-fidelity prototypes created using Figma, Photoshop, and CorelDraw. I also bring practical training experience from RevaturePro, where I sharpened my full stack development skills through rigorous coding exercises and real-world projects.

Beyond development, I have a keen interest in solving real-world problems through technology, as showcased by my work on a Fake News Detection System using machine learning models. I’m continually motivated to learn, grow, and contribute to projects that make a meaningful impact.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <h4 className="text-lg font-medium mb-3 text-accent">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;