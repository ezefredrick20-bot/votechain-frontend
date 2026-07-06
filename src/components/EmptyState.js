import { motion } from "framer-motion";

export default function EmptyState({
  icon = "📭",
  title = "Nothing Here Yet",
  message = "There is currently no data available.",
  buttonText,
  onButtonClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="
      flex
      flex-col
      items-center
      justify-center
      text-center
      py-12
      px-6
      rounded-2xl
      border
      border-white/10
      bg-white/5
      "
    >
      <div className="text-7xl mb-5">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <p className="text-gray-400 mt-3 max-w-md">
        {message}
      </p>

      {buttonText && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onButtonClick}
          className="
          mt-8
          bg-green-600
          hover:bg-green-700
          px-6
          py-3
          rounded-xl
          font-semibold
          "
        >
          {buttonText}
        </motion.button>
      )}
    </motion.div>
  );
}