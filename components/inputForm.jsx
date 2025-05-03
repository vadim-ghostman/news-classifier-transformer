import { useState } from "react";

export default function InputForm({ onSubmit }) {
  const [text, setText] = useState("");

  return (
    <form
      className="w-full max-w-xl mx-auto p-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(text);
      }}
    >
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={6}
        placeholder="Paste article text or URL here…"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Analyze
      </button>
    </form>
  );
}

