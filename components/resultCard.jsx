export default function ResultCard({ category, score, summary }) {
  const pct = Math.round(score * 100);
  return (
    <div className="max-w-xl mx-auto p-4 mt-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Prediction</h2>
      <div className="flex items-center">
        <span className="font-medium mr-2">{category}</span>
        <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="ml-2 text-sm text-gray-600">{pct}%</span>
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-1">Summary</h3>
      <p className="text-gray-800">{summary}</p>
    </div>
  );
}

