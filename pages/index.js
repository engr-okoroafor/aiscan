import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [textIndex, setTextIndex] = useState(0);
  const futuristicText = [
    "AI-Powered Wi-Fi Scanning",
    "Real-Time Network Analysis",
    "Cutting-Edge AI Insights",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % futuristicText.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-md animate-pulse">
        AI Wi-Fi Scanner
      </h1>
      <p className="mt-4 text-xl text-center text-gray-300 drop-shadow-lg">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600 animate-fade">
          {futuristicText[textIndex]}
        </span>
      </p>
      <div className="mt-6 flex flex-col items-center space-y-4">
        <p className="text-lg text-gray-400">
          Explore the dashboard to unlock these features:
        </p>
        <ul className="list-disc space-y-2 text-left text-gray-300 pl-6">
          <li>Advanced Wi-Fi Scanning</li>
          <li>Network Vulnerability Analysis</li>
          <li>Real-Time AI-Driven Insights</li>
          <li>Interactive Graphical Reports</li>
        </ul>
        <Link href="/dashboard">
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-semibold rounded-lg text-white hover:shadow-[0px_0px_15px_3px_rgba(59,130,246,0.6)] transform hover:scale-105 transition-all duration-300">
            <span className="animate-glow">Go to Dashboard</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
