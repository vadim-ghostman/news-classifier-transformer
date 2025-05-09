import * as tf from '@tensorflow/tfjs-node';
import { textToSeq } from '../../lib/tokenizer';
import labels from '../../lib/labels';

let model;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  if (!model) {
    model = await tf.loadLayersModel(
      'file://' + process.cwd() + '/public/models/model/model.json'
    );
  }

  const { text } = req.body;
  const seq = await textToSeq(text);
  const logits = model.predict(tf.tensor([seq]));
  const idx = logits.argMax(-1).dataSync()[0];
  res.json({ category: labels[idx] });
}

