import { uniq } from "@formatter";
export * as scroll from './scroll.js';

// todo: fix html tag error on double space
export const sublimeCharactersHTML = (prefix = '', term: string) => {
  let withTag = `${term}`;
  uniq(prefix.trim().split(' ')).forEach(p => {
    const matchedWords = term.match(new RegExp(`${p}`, 'gi'));
    if (matchedWords)
      withTag = withTag
        .replace(new RegExp(`${p}`, 'gi'), `<em>${p.trim()}</em>`)
        .replace('</em> <em>', ' ');
  });

  return withTag;
};