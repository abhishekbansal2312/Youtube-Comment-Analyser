import natural from "natural";

const stopwords = new Set(natural.stopwords); // Load built-in stopwords

export const extractKeywords = (comments: string[]) => {
  const tokenizer = new natural.WordTokenizer();
  const wordFrequencies: Record<string, number> = {};

  comments.forEach((comment) => {
    const words = tokenizer.tokenize(comment);

    words.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, ""); // Remove non-alphabetic characters

      if (cleanWord && !stopwords.has(cleanWord)) {
        wordFrequencies[cleanWord] = (wordFrequencies[cleanWord] || 0) + 1;
      }
    });
  });

  return Object.entries(wordFrequencies)
    .sort((a, b) => b[1] - a[1]) // Sort by frequency
    .slice(0, 10) // Get top 10 keywords
    .map(([word]) => word);
};
