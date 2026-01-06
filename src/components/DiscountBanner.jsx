import React from "react";
import { FaGift } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

const DiscountBanner = () => {
  return (
    <motion.section
      className="relative w-full h-60 md:h-72 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white flex flex-col items-center justify-center shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      ></motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-extrabold mb-4 flex items-center gap-4 justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaGift className="text-yellow-300" />
          </motion.span>
          Big Holiday Offer
        </motion.h2>

        <motion.p
          className="text-lg md:text-2xl mb-6 text-white/90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Enjoy up to{" "}
          <span className="font-bold text-yellow-300">10% OFF</span> on any Service this weekend only!
        </motion.p>

=        <motion.div
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/services"
            className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-300 inline-block"
          >
            Our Services
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DiscountBanner;
