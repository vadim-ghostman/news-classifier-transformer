export default function ResultCard({ result }) {
  if (!result) return null;
  return (
    <p className="mt-6 text-xl">
      Predicted category: <span className="font-semibold">{result}</span>
    </p>
  );
}

