import { useState, useRef } from "react";
import { FaBars, FaTimes, FaWifi, FaChartLine, FaRobot, FaSearch } from "react-icons/fa";

export default function Mobile({ activeSection, setActiveSection }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div>
      {/* Floating Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className="fixed z-30 top-4 left-4 bg-purple-600 text-white p-3 rounded-full shadow-lg focus:outline-none md:hidden"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <nav
            ref={sidebarRef}
            className="fixed top-0 left-0 z-30 bg-gray-800 w-64 h-full p-6 shadow-lg"
          >
            <ul className="flex flex-col gap-4 pt-20">
              {["IP Scanner", "Wi-Fi Networks", "Graphs", "AI Insights"].map((section, index) => (
                <li key={section}>
                  <button
                    className={`w-full py-3 px-2 rounded-xl font-semibold text-left shadow-lg transition-all transform hover:scale-105 ${
                      activeSection === section
                        ? "bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white shadow-purple-500/50"
                        : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 hover:from-purple-500 hover:to-purple-600 hover:text-white shadow-md shadow-purple-500/20"
                    }`}
                    onClick={() => {
                      setActiveSection(section);
                      setIsSidebarOpen(false); // Close sidebar on selection
                    }}
                  >
                    <span className="inline-block mr-3 text-xl">
                      {index === 0 && <FaSearch />} {/* Icon for IP Scanner */}
                      {index === 1 && <FaWifi />}
                      {index === 2 && <FaChartLine />}
                      {index === 3 && <FaRobot />}
                    </span>
                    <span>{section}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
