import { useState, useEffect, useRef } from "react";
import { FaWifi, FaChartLine, FaRobot, FaSearch } from "react-icons/fa";
import Mobile from "../components/Mobile";
import NetworkList from "../components/NetworkList";
import Graphs from "../components/Graphs";
import AIInsights from "../components/AIInsights";
import IPScanner from "../components/IPScanner";


export default function Dashboard() {
  const [networks, setNetworks] = useState([]);
  const [analysis, setAnalysis] = useState("");
  const [activeSection, setActiveSection] = useState("IP Scanner"); // Default active section
  const sidebarRef = useRef(null);

  useEffect(() => {
    async function fetchNetworksAndAnalysis() {
      try {
        const res = await fetch("/api/analyze");
        const data = await res.json();
        if (data.success) {
          setNetworks(data.networks);
          setAnalysis(data.analysis);
        } else {
          console.error("Failed to fetch network analysis:", data.message);
        }
      } catch (error) {
        console.error("Error fetching network analysis:", error);
      }
    }
    fetchNetworksAndAnalysis();
  }, []);

  const sections = [
    { name: "IP Scanner", icon: <FaSearch /> },
    { name: "Wi-Fi Networks", icon: <FaWifi /> },
    { name: "Graphs", icon: <FaChartLine /> },
    { name: "AI Insights", icon: <FaRobot /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Mobile activeSection={activeSection} setActiveSection={setActiveSection} />

      <nav
        ref={sidebarRef}
        className="hidden md:block fixed md:static z-20 bg-gray-800 p-4 md:p-6 shadow-lg w-64"
      >
        <ul className="flex flex-col gap-4 pt-20">
          {sections.map((section, index) => (
            <li key={section.name}>
              <button
                className={`w-full py-3 px-2 rounded-xl font-semibold text-left shadow-lg transition-all transform hover:scale-105 ${
                  activeSection === section.name
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white shadow-purple-500/50"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-purple-500 hover:to-purple-600 hover:text-white shadow-md shadow-purple-500/20"
                }`}
                onClick={() => setActiveSection(section.name)}
              >
                <span className="inline-block mr-3 text-xl">{section.icon}</span>
                <span>{section.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-center items-center py-6 px-4 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 shadow-md">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-white text-center">
            Network Analysis Dashboard
          </h1>
        </header>

        <main className="flex-1 flex flex-col gap-6 p-4 md:p-6">
          {activeSection === "Wi-Fi Networks" && (
            <section className="flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Wi-Fi Networks
              </h2>
              <NetworkList networks={networks} />
            </section>
          )}

          {activeSection === "Graphs" && (
            <section className="flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-purple-400">
                Graphs
              </h2>
              <Graphs networks={networks} />
            </section>
          )}

          {activeSection === "AI Insights" && (
            <section className="flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-400">
                AI Insights
              </h2>
              <AIInsights analysis={analysis} />
            </section>
          )}

          {activeSection === "IP Scanner" && (
            <section className="flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md p-6">
              <IPScanner />
            </section>
          )}
        </main>

        <footer className="py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Network AI Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
