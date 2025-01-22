// Card.js

export default function Card({ network }) {
    return (
      <div
        className={`${
          network.ssid === "HostNetwork"
            ? "bg-gradient-to-r from-green-500 to-black"
            : "bg-gradient-to-r from-blue-500 to-teal-500"
        } 
          p-6 rounded-2xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50 
          relative flex flex-col justify-between overflow-hidden
          min-w-[300px] max-w-[350px] h-full`}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-500 opacity-30 rounded-lg"></div>
        
        {/* Card Content */}
        <div className="relative z-10">
          <div className="text-white font-semibold text-2xl mb-4">{network.ssid}</div>
          <ul className="text-gray-100 space-y-2">
            <li><strong>Signal Strength:</strong> {network.signal_level} dBm</li>
            <li><strong>Channel:</strong> {network.channel}</li>
            <li><strong>Frequency:</strong> {network.frequency} MHz</li>
            <li><strong>Security Protocol:</strong> {network.security || "None"}</li>
            <li><strong>Signal Quality:</strong> {network.signal_quality || "N/A"}</li>
            <li><strong>Connected Clients:</strong> {Array.isArray(network.connectedClients) ? network.connectedClients.length : 0}</li>
            <li><strong>MAC Address:</strong> {network.mac}</li>
          </ul>
        </div>
      </div>
    );
  }
  