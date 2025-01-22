// utils/nmap.js
import { exec } from "child_process";

export function NmapScan(ipRange) {
  return new Promise((resolve, reject) => {
    const nmapCommand = `nmap -sn ${ipRange}`;

    exec(nmapCommand, (error, stdout) => {
      if (error) {
        console.error("Nmap Scan Error:", error);
        return reject(new Error("Failed to execute Nmap scan"));
      }

      // Parse Nmap output to extract connected devices
      const devices = [];
      const lines = stdout.split("\n");
      lines.forEach((line) => {
        if (line.startsWith("Nmap scan report for")) {
          const device = line.replace("Nmap scan report for ", "").trim();
          devices.push(device);
        }
      });

      resolve(devices);
    });
  });
}
