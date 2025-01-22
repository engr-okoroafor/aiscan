import { FaChartBar } from "react-icons/fa";

export default function LoadGraphs({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-blue-500/50 ${
        loading && "opacity-50 cursor-not-allowed"
      }`}
    >
      <FaChartBar className={`text-xl ${loading ? "animate-spin" : ""}`} />
      <span>{loading ? "Loading..." : "Load Graphs"}</span>
    </button>
  );
}
