import { scanNetworks } from "../../testWifiScan";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const networks = await scanNetworks();
      res.status(200).json({ success: true, networks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
