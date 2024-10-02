import { defaultWordsPerMinute, getReadingTime } from '../text/index.js';

const text = nbMin =>
  Array.from(
    new Array(defaultWordsPerMinute * nbMin),
    () => 'words'
  ).join(' ');

describe('Text', () => {
  describe('getReadingTime', () => {
    it('should return 1 minute', () => {
      expect(getReadingTime({ text: text(1) })).toBe(1);
    });
    it('should return 2 minutes', () => {
      expect(getReadingTime({ text: text(2) })).toBe(2);
    });
  });
});
