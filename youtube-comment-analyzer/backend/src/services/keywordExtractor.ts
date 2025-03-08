import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const stopwords = new Set(natural.stopwords);

export const extractKeywords = (comments: string[]) => {
  const wordFrequencies: Record<string, number> = {};

  comments.forEach((comment) => {
    tokenizer.tokenize(comment.toLowerCase()).forEach((word) => {
      const cleanWord = word.replace(/[^a-z]/g, "");

      if (cleanWord.length > 2 && !stopwords.has(cleanWord)) {
        wordFrequencies[cleanWord] = (wordFrequencies[cleanWord] || 0) + 1;
      }
    });
  });

  return Object.entries(wordFrequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(11, 50)
    .map(([word]) => word);
};
