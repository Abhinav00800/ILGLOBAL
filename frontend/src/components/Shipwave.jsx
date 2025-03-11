import { motion } from "framer-motion";

const ShipOnWaves = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-blue-500 overflow-hidden">
      {/* Waves */}
      <div className="absolute bottom-0 left-0 w-full flex space-x-2">
        <motion.div
          className="w-full h-16 bg-blue-400 rounded-t-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.div
          className="w-full h-16 bg-blue-300 rounded-t-full"
          animate={{ y: [10, 0, 10] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Ship */}
      <motion.div
        className="absolute bottom-20 flex flex-col items-center"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <div className="w-24 h-16 bg-gray-700 rounded-t-lg flex justify-center items-center shadow-lg">
          🚢
        </div>
      </motion.div>
    </div>
  );
};

export default ShipOnWaves;
