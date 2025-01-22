import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function analyzeWithGroq(data) {
  const prompt = `
    Perform a security analysis of the following Bluetooth devices.
    Assess risks such as unauthorized access, default pairing codes, and signal leakage.
    Devices: ${JSON.stringify(data, null, 2)}
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.2-3b-preview",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
  });

  return response.choices[0]?.message?.content || "No analysis available.";
}
