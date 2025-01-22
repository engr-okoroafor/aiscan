require("dotenv").config(); // Load environment variables from .env
const wifi = require("node-wifi");
const { Groq } = require("groq-sdk");

// Initialize Wi-Fi scanning
wifi.init({ iface: null }); // Use the current active Wi-Fi interface

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Analyze network data with Groq AI.
 * @param {Array} networks - List of scanned networks with details.
 * @returns {Promise<string>} - Analysis results or an error message.
 */
async function analyzeWithGroq(networks) {
  if (!networks || networks.length === 0) {
    return "No networks found to analyze.";
  }

  try {
    const prompt = `For each Wi-Fi network scan data, summarize the network details and perform a detailed vulnerability analysis. Evaluate encryption protocols (e.g., WEP, WPA2) for outdated or weak implementations, assess signal strength for risks of unauthorized access or signal leakage, and identify visible or default SSIDs that may be susceptible to attacks. Detect open networks lacking encryption, channel overlaps leading to interference, and signs of rogue access points or spoofing attempts. Clearly outline each identified vulnerability, explain its security implications, and provide actionable recommendations to mitigate risks and strengthen overall network security. Ensure insights are concise, clear, and practical for implementation.
:\n${JSON.stringify(networks, null, 2)}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.2-3b-preview",
      temperature: 0.2,
      max_tokens: 1200,
    });

    const rawResult =
      chatCompletion.choices[0]?.message?.content || "No analysis available.";

    // Format the analysis result for better readability
    const formattedResult = rawResult
      .split("\n")
      .map((line, index) => {
        if (line.trim().startsWith("-")) {
          return `• ${line.trim().substring(1).trim()}`;
        }
        return line.trim();
      })
      .join("\n");

    return `### Analysis Report\n${formattedResult}`;
  } catch (error) {
    if (error.code === "ENOTFOUND") {
      console.error("Error analyzing with Groq: Unable to connect to API.");
      return "Error: Unable to connect to Groq API. Please check your internet connection.";
    }
    console.error("Error analyzing with Groq:", error);
    return "Network analysis failed. Please check your internet connection, reconnect, and refresh the browser to try again.";
  }
}

/**
 * Fetch connected clients for a given network.
 * @param {Object} network - Network object from scan results.
 * @returns {Promise<Array>} - List of connected clients.
 */
async function getConnectedClients(network) {
  return new Promise((resolve) => {
    wifi.getCurrentConnections((err, currentConnections) => {
      if (err) {
        console.error("Error getting current connections:", err);
        resolve([]); // Resolve with empty array on error
        return;
      }
      const clients = currentConnections.filter(
        (conn) => conn.ssid === network.ssid
      );
      resolve(clients);
    });
  });
}

/**
 * API handler for analyzing Wi-Fi networks.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const scanNetworks = () =>
      new Promise((resolve, reject) => {
        wifi.scan((err, networks) => {
          if (err) {
            return reject(err);
          }
          resolve(networks);
        });
      });

    const networks = await scanNetworks();

    const networksWithClients = await Promise.all(
      networks.map(async (network) => {
        const clients = await getConnectedClients(network);
        return { ...network, connectedClients: clients };
      })
    );

    const analysisResult = await analyzeWithGroq(networksWithClients);

    return res.status(200).json({
      success: true,
      networks: networksWithClients,
      analysis: analysisResult,
    });
  } catch (error) {
    if (error.code === "ENOTFOUND") {
      console.error("Error: Unable to connect to the internet.");
      return res.status(500).json({
        success: false,
        message: "Error: Unable to connect to the internet. Please check your connection.",
      });
    }
    console.error("Error in analyze API:", error);
    return res.status(500).json({
      success: false,
      message: "Error scanning or analyzing networks.",
    });
  }
}
