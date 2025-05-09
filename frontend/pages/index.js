import { useState } from 'react';
import InputForm from '../components/inputForm';
import ResultCard from '../components/resultCard';

export default function Home() {
  const [result, setResult] = useState(null);
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-3xl font-bold mb-4">News Category Classifier</h1>
      <InputForm onResult={setResult} />
      <ResultCard result={result} />
    </main>
  );
}

