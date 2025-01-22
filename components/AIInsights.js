"use client";

import { useState } from "react";
import GenerateInsights from "../components/GenerateInsights";

export default function AIInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze");
      const data = await res.json();
      if (data.success) {
        setInsights(data.analysis);
      } else {
        console.error("Failed to generate insights:", data.message);
      }
    } catch (error) {
      console.error("Error generating insights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-white mb-6">AI Insights</h1>
      <GenerateInsights onClick={generateInsights} />
      {loading ? (
        <p className="mt-4 text-yellow-400 font-semibold">Loading insights...</p>
      ) : (
        <div
          className="mt-6 p-4 bg-gray-700 text-white rounded-lg font-mono whitespace-pre-wrap leading-relaxed"
        >
          {insights || "No insights generated yet."}
        </div>
      )}
    </div>
  );
}
