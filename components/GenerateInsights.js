import { FaLightbulb } from "react-icons/fa";

export default function GenerateInsights({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-purple-500/50"
    >
      <FaLightbulb className="text-xl animate-pulse" />
      <span>Generate Insights</span>
    </button>
  );
}
