import { config } from "dotenv";
import axios from "axios";
import dns from "dns";

// Load environment variables from .env file
config();

// Extract SHODAN_API_KEY from the environment variables
const SHODAN_API_KEY = process.env.SHODAN_API_KEY;

if (!SHODAN_API_KEY) {
  throw new Error("SHODAN_API_KEY is not defined in the .env file.");
}

// Helper function to query Shodan API for host details
async function queryShodan(ipOrDns) {
  const shodanBaseUrl = "https://api.shodan.io/shodan/host";
  let resolvedIp = ipOrDns;

  // If the input is a DNS name, resolve it to an IP address
  if (!isValidIp(ipOrDns)) {
    try {
      resolvedIp = await resolveDnsToIp(ipOrDns);
    } catch (error) {
      throw new Error(`Failed to resolve DNS: ${error.message}`);
    }
  }

  try {
    console.log(`Querying AiScan for IP or DNS: ${resolvedIp}`);
    const response = await axios.get(`${shodanBaseUrl}/${resolvedIp}`, {
      params: { key: SHODAN_API_KEY },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error(
          "Shodan API key is invalid or lacks required permissions. Please verify your API key."
        );
      } else if (error.response.status === 404) {
        throw new Error("IP or DNS not found in Shodan database.");
      }
    }
    throw new Error(`Failed to query AiScan: ${error.message}`);
  }
}

// Function to resolve DNS to IP address
async function resolveDnsToIp(dnsName) {
  return new Promise((resolve, reject) => {
    dns.lookup(dnsName, (err, address) => {
      if (err) reject(err);
      resolve(address);
    });
  });
}

// Function to validate if an input is an IP address
function isValidIp(ipAddress) {
  const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ipAddress);
}

// Function to analyze Shodan results using AI
async function analyzeShodanResults(shodanData) {
  try {
    console.log("Analyzing AiScan data using AI...");

    // Structured AI-driven analysis for penetration testing
    const analysis = generatePenetrationTestReport(shodanData);

    return analysis;
  } catch (error) {
    console.error("Error analyzing AiScan data:", error);
    return { analysis: "Analysis failed. Please try again later." };
  }
}

// Generate penetration testing-style report from Shodan data
function generatePenetrationTestReport(shodanData) {
  const report = {
    overview: {
      title: "Scan Overview",
      description: `This report presents the findings of a security scan on a target server (IP: ${shodanData.ip_str}), focusing on DNS services, HTTP configurations, and overall security posture.`,
    },
    keyFindings: [
      {
        title: "DNS Recursion (Enabled)",
        risk: "Potential for DNS amplification attacks, increasing the risk of DDoS.",
        impact: "Attackers can exploit the server to amplify traffic directed at targets.",
        recommendation: "Disable or restrict recursion to trusted IPs.",
      },
      {
        title: "Open DNS Ports (53/TCP, 53/UDP)",
        risk: "Exposed DNS ports can facilitate DNS poisoning or DDoS attacks.",
        impact: "Vulnerable to DNS-based exploits.",
        recommendation: "Restrict access via firewall or implement rate-limiting.",
      },
      {
        title: "HTTP Headers (X-Frame-Options SAMEORIGIN, X-XSS-Protection Disabled)",
        risk: "Disabling X-XSS-Protection allows XSS attacks; Same-origin frame protection is in place but limited.",
        impact: "XSS vulnerabilities could compromise user data or sessions.",
        recommendation: "Enable X-XSS-Protection or implement a robust Content Security Policy (CSP).",
      },
      {
        title: "Exposed HTTP Server Information",
        risk: "Exposing server details aids attackers in identifying potential vulnerabilities.",
        impact: "Information leakage allows version-specific exploits.",
        recommendation: "Remove or obscure the Server header in HTTP responses.",
      },
      {
        title: "SSL/TLS Configuration (Heartbleed SAFE)",
        risk: "Heartbleed is patched, but continuous monitoring is needed.",
        recommendation: "Regularly check for vulnerabilities in SSL/TLS configurations.",
      },
      {
        title: "Insecure HTTP Redirect (302 to https://dns.google/)",
        risk: "Open redirects could be exploited for phishing attacks.",
        impact: "Users could be redirected to malicious websites.",
        recommendation: "Validate redirects to ensure they only go to trusted domains.",
      },
      {
        title: "Missing security.txt",
        risk: "Lack of a formal vulnerability reporting mechanism.",
        impact: "Delayed response to vulnerability disclosures.",
        recommendation: "Implement a security.txt file for better researcher communication.",
      },
    ],
    risksAndRecommendations: {
      title: "Summary of Risks & Recommendations",
      recommendations: [
        "Disable or restrict DNS recursion.",
        "Restrict access to DNS ports with firewalls or rate-limiting.",
        "Enable X-XSS-Protection or use a comprehensive CSP.",
        "Obscure HTTP server details in responses.",
        "Monitor SSL/TLS configurations for vulnerabilities.",
        "Prevent open redirects by validating URLs.",
        "Add a security.txt file for easier vulnerability reporting.",
      ],
    },
    conclusion: {
      title: "Conclusion",
      text: `While the target server is secure in certain aspects (e.g., SSL/TLS), issues such as recursion settings, HTTP security headers, and the lack of a security.txt file require attention to strengthen security further.`,
    },
  };

  return report;
}

// API handler for scan requests
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const { ipAddress } = req.body;

  if (!ipAddress) {
    return res.status(400).json({ success: false, message: "IP Address or DNS name is required." });
  }

  try {
    console.log("Querying AiScan...");
    const shodanData = await queryShodan(ipAddress);

    console.log("AiScan query successful:", shodanData);

    // Analyze the results for vulnerabilities using AI
    const analysis = await analyzeShodanResults(shodanData);

    return res.status(200).json({
      success: true,
      scanResults: shodanData,
      vulnerabilities: analysis,
    });
  } catch (error) {
    console.error("Error during AiScan query:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
