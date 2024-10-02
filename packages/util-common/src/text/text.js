  export const ucFirst = (string, onlyFirstWord = false) =>
  string
    .split(' ')
    .map((word, i) =>
      !onlyFirstWord || i === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(' ');

export const defaultWordsPerMinute = 70;

export const getReadingTime = ({
  text,
  wordsPerMinute = defaultWordsPerMinute,
}) => {
  const words = getNumberOfWords(text);
  const readingTimeInMinute = Math.round(words / wordsPerMinute);

  return readingTimeInMinute;
};

const getNumberOfWords = (string = '') =>
  string.trim().split(/\s+/).length;
