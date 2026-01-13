import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#060b1d] to-[#02030a] text-white flex flex-col items-center justify-center px-8 text-center">

      {/* LOGO */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative mb-12"
      >
        {/* Rotating halo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute inset-[-12px] rounded-full border border-cyan-400/40"
        />

        {/* Glow */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-cyan-400 opacity-60"></div>

        {/* Single clean glowing emblem */}
        <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_70px_rgba(34,211,238,0.9)]">
          <img
            src="/gvop.jpg.jpeg"
            alt="GVOP Logo"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-6"
      >
        Global Voice of the{" "}
        <span className="text-cyan-400">People</span>
      </motion.h1>

      {/* TAGLINE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg max-w-2xl text-gray-300 mb-14 leading-relaxed"
      >
        A platform that analyzes how news stories are framed and compares media
        narratives with real public voices across regions and languages.
        <br />
        Built to improve media literacy by showing how stories are told, not what to believe.
      </motion.p>

      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 40px #22d3ee" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/dashboard")}
        className="px-12 py-4 rounded-full text-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_30px_#22d3ee]"
      >
        Enter Dashboard
      </motion.button>

    </div>
  );
};

export default Home;