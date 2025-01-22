// File: C:\Users\LULU\Desktop\aiscan\components\NetworkList.js

import Card from "./Card"; // Import Card component

export default function NetworkList({ networks }) {
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Available Networks
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center gap-6 P-400"
      >
        {networks.map((network, idx) => (
          <Card key={idx} network={network} />
        ))}
      </div>
    </div>
  );
}
