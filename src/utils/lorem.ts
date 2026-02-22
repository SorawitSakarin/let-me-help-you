const words = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
  "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
  "est", "laborum"
];

export type LoremUnit = 'paragraphs' | 'sentences' | 'words';

export function generateLoremIpsum(count: number, unit: LoremUnit): string {
  if (count < 1) return "";

  if (unit === 'words') {
    return generateWords(count);
  } else if (unit === 'sentences') {
    return generateSentences(count);
  } else {
    return generateParagraphs(count);
  }
}

function generateWords(count: number): string {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result.join(" ");
}

function generateSentences(count: number): string {
  const sentences = [];
  for (let i = 0; i < count; i++) {
    const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words
    let sentence = generateWords(wordCount);
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
    sentences.push(sentence);
  }
  return sentences.join(" ");
}

function generateParagraphs(count: number): string {
  const paragraphs = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-7 sentences
    paragraphs.push(generateSentences(sentenceCount));
  }
  return paragraphs.join("\n\n");
}
