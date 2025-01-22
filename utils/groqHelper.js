require('dotenv').config();
const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeWithGroq(networks) {
  if (!networks || networks.length === 0) {
    return "No networks found to analyze.";
  }
  try {
    const prompt = `Analyze the following Wi-Fi network scan data for vulnerabilities:\n${JSON.stringify(networks, null, 2)}`;
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      max_tokens: 700,
    });
    return chatCompletion.choices[0]?.message?.content || "No analysis available.";
  } catch (error) {
    console.error("Error analyzing with Groq:", error);
    return "Error analyzing Wi-Fi data.";
  }
}
