export default function InputForm({ onResult }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const text = e.target.elements.text.value;
    const r = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    onResult((await r.json()).category);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea name="text" rows={6} className="border p-3 rounded" />
      <button className="self-end px-4 py-2 bg-indigo-600 text-white rounded">Predict</button>
    </form>
  );
}

