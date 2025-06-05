import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import AnimatedText from "../ui/AnimatedText";
import Button from "../ui/Button";
import { FaEnvelope, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaDribbble } from "react-icons/fa";

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });

        // Animate success message
        gsap.fromTo(
          ".success-message",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // Hide success after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error("Error submitting form:", await response.text());
        alert("There was an error. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0.6 + index * 0.1
      }
    }),
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const contactItems = [
    {
      icon: <FaEnvelope className="text-xl text-accent" />,
      label: "Email",
      value: "krchitranjannirala@gmail.com",
      link: "mailto:krchitranjannirala@gmail.com"
    },
    {
      icon: <FaLinkedin className="text-xl text-accent" />,
      label: "LinkedIn",
      value: "chitranjan-kumar-nirala",
      link: "https://www.linkedin.com/in/chitranjan-kumar-nirala-a82600202/"
    },
    {
      icon: <FaGithub className="text-xl text-accent" />,
      label: "GitHub",
      value: "chitranjan-nirala",
      link: "https://github.com/chitranjan-nirala"
    }
  ];


  return (
    <section ref={sectionRef} id="contact" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <AnimatedText
          text="Get In Touch"
          variant="h2"
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-16"
        >
          I'm always open to new opportunities and collaborations. Feel free to reach out if you have a project in mind or just want to say hello!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              {isSubmitted ? (
                <div className="success-message py-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="text-4xl mb-4">✅</span>
                    <h4 className="text-xl font-bold text-accent mb-2">Message Sent!</h4>
                    <p className="text-gray-300">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              ) : (
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-6"
                >
                  <motion.div variants={inputVariants}>
                    <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="Your Name"
                    />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                    <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                    <label className="block text-gray-300 mb-2" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                      placeholder="Your message here..."
                    />
                  </motion.div>

                  <motion.div variants={inputVariants}>
                    <Button
                      type="submit"
                      primary
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 h-full">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

              <div className="space-y-8">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    className="flex items-start"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-accent font-medium mb-1">{item.label}</h4>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-accent transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12">
                <h4 className="text-lg font-bold mb-4">Let's Connect</h4>
                <div className="flex space-x-4">
                  {[
                    {
                      icon: <FaTwitter />,
                      link: "https://twitter.com/your_username"
                    },
                    {
                      icon: <FaInstagram />,
                      link: "https://instagram.com/your_username"
                    },
                    {
                      icon: <FaDribbble />,
                      link: "https://dribbble.com/your_username"
                    }
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      custom={index}
                      variants={socialIconVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      whileHover="hover"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors duration-300 text-xl text-white"
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
