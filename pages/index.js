import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import InputForm from "../components/inputForm";
import ResultCard from "../components/resultCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {
  const [classifier, setClassifier] = useState(null);
  const [summarizer, setSummarizer] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { pipeline } = await import("@xenova/transformers");
      const cls = await pipeline(
        "text-classification",
        "/models/news-classifier/"
      );
      const sum = await pipeline(
        "summarization",
        "Xenova/distilbart-cnn-12-6"
      );
      setClassifier(() => cls);
      setSummarizer(() => sum);
    })();
  }, []);

  const handleAnalyze = async (text) => {
    if (!classifier || !summarizer) return;
    setLoading(true);
    const clsOut = await classifier(text);
    const { label, score } = clsOut[0];
    const sumOut = await summarizer(text, { max_length: 60, min_length: 20 });
    const summary = sumOut[0].summary_text;

    setResult({ category: label, score, summary });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="bg-white shadow">
        <div className="max-w-xl mx-auto p-4">
          <h1 className="text-2xl font-bold">News Auto-Tagger</h1>
        </div>
      </header>

      <main className="py-8">
        <InputForm onSubmit={handleAnalyze} />

        {loading && (
          <p className="text-center mt-4 text-gray-600">Analyzing…</p>
        )}

        {result && !loading && (
          <ResultCard
            category={result.category}
            score={result.score}
            summary={result.summary}
          />
        )}
      </main>
    </div>
  );
}

