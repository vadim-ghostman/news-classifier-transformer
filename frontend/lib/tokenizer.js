import fs from 'node:fs/promises';
import path from 'node:path';

let wordIndex;

export async function textToSeq(text, maxLen = 60) {
  if (!wordIndex) {
    const tok = await fs.readFile(
      path.join(process.cwd(), 'public/models/model/tokenizer.json'),
      'utf8'
    );
    wordIndex = JSON.parse(tok).config.word_index;
  }
  const seq = text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(/\s+/)
    .map(w => wordIndex[w] ?? 0);
  return seq.length > maxLen
    ? seq.slice(0, maxLen)
    : [...seq, ...Array(maxLen - seq.length).fill(0)];
}

