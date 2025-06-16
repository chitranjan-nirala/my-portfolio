import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedText from "../ui/AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
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
      ],
    },
    {
      category: "Design",
      skills: [
        { name: "Tailwind CSS", level: 90 },
        { name: "Figma", level: 80 },
        { name: "Adobe Photoshop", level: 85 },
        { name: "CorelDraw", level: 95 },
        { name: "Canva", level: 90 },
        { name: "Adobe InDesign", level: 50 },
      ],
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
        { name: "Matplotlib", level: 50 },
      ],
    },
    {
      category: "Animation",
      skills: [
        { name: "GSAP", level: 85 },
        { name: "Framer Motion", level: 90 },
        { name: "CSS Animations", level: 80 },
      ],
    },
  ];

  const categories = ["All", ...skillsData.map((item) => item.category)];

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
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [isInView, activeCategory]);

  const getFilteredSkills = () => {
    if (activeCategory === "All") return skillsData;
    return skillsData.filter((item) => item.category === activeCategory);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-gradient-to-br  via-zinc-800 to-zinc-900 text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedText
          text="My Skills"
          variant="h2"
          className="text-center text-4xl sm:text-5xl font-extrabold mb-14"
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium backdrop-blur-md bg-white/10 hover:bg-white/20 text-sm sm:text-base ${
                activeCategory === category
                  ? "bg-accent text-white border-accent"
                  : "border-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {getFilteredSkills().map((block) => (
              <motion.div
                key={block.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="bg-zinc-800 rounded-2xl p-6 border border-white/10 shadow-md shadow-black/20"
              >
                <h3 className="text-xl font-semibold mb-6 text-accent">
                  {block.category}
                </h3>

                <div className="space-y-4">
                  {block.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-bold text-accent">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full">
                        <div
                          className="skill-progress-bar h-full bg-gradient-to-r from-accent via-secondary to-accent rounded-full"
                          data-level={skill.level}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
