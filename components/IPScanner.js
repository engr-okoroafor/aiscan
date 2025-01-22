import { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

export default function IPScanner() {
  const [ipAddress, setIpAddress] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/scanIp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipAddress }),
      });

      const data = await response.json();

      if (data.success) {
        setScanResult(data);
      } else {
        alert(data.message || "Scan failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while scanning the IP address.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-full sm:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto items-center">
      <h2 className="text-xl font-semibold text-gray-200">
        Scan IP Address or Domain Name
      </h2>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="p-2 flex-grow min-w-[200px] sm:min-w-[400px] lg:min-w-[700px] rounded-lg bg-gray-600 text-white placeholder-gray-300"
          placeholder="Enter IP (e.g., 192.168.1.1) or DNS (e.g., example.com)"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <button
          className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg"
          onClick={handleScan}
          disabled={isLoading}
        >
          {isLoading ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            <>
              <FaSearch className="mr-2" />
              Scan
            </>
          )}
        </button>
      </div>

      {scanResult && (
        <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto">
          <h3 className="text-lg font-semibold text-white">Scan Results</h3>
          <div className="mt-2 text-gray-300">
            <pre className="whitespace-pre-wrap break-words">{JSON.stringify(scanResult, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
