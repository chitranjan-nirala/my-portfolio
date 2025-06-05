import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Contact", path: "/#contact" },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com/chitranjan-nirala" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/ck_official_143/" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/chitranjan-kumar-nirala-a82600202/" },
    { icon: <FaGithub />, url: "https://github.com/chitranjan-nirala" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/80 backdrop-blur-md py-12 border-t border-white/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full h-full opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Brief */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent inline-block mb-4"
            >
              Dev<span className="text-white">Portfolio</span>
            </Link>
            <p className="text-gray-400 mb-6">
              A creative developer focused on building beautiful and functional web experiences
              with modern technologies and stunning animations.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors duration-300 text-xl text-white"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-accent transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-accent" />
                <a
                  href="mailto:krchitranjannirala@gmail.com"
                  className="hover:text-accent transition-colors duration-300"
                >
                  krchitranjannirala@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2 text-accent" />
                <span>8252800085</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-accent" />
                <span>Bihar, Gaya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} CKPortfolio. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Designed & Built with ❤️ by Chitranjan Kumar Nirala
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;