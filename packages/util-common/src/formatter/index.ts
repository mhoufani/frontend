import escapeStringRegexp from 'escape-string-regexp';
import sha1 from 'sha1';
import { isNumber } from '@checker';

export const uniq = <T>(arr: T[]):T[] => [...new Set(arr)];

export const toBoolean = (value: string): boolean =>
  Boolean(value) && value.toString().toLowerCase() === 'true';

const defaultSlug = {
  replacement: '+',
};

export const toSlug = (
  str?: string,
  { lower = true, replacement = '+' } = {}
) => {
  const r = `${str || ''}`
    .toString()
    .trim()
    .replace(/-/g, '_')
    .split(' ')
    .filter(str => !!str.trim())
    .map(encodeURIComponent)
    .map(s => s.replace(/'/g, '%27'))
    .join(replacement);

  return lower ? r.toLowerCase() : r;
};

export const fromSlug = (str?:string, options = { replacement: "+" }) => {
  try {
    return (
      str &&
      decodeURI(str)
        .replace(
          new RegExp(
            `${escapeStringRegexp(
              options.replacement || defaultSlug.replacement
            )}`,
            'g'
          ),
          ' '
        )
        .replace(/-/g, ' ')
        .replace(/_/g, '-')
    );
  } catch (e) {
    if(e instanceof Error) console.warn(e.message);
    return '';
  }
};

export const sha1Encrypt = string => string && sha1(string);

export const ucfirst = (string, onlyFirstWord = false) =>
  string &&
  string
    .split(' ')
    .map((word, i) =>
      !onlyFirstWord || i === 0
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    )
    .join(' ');

export const toTitle = string => string && ucfirst(fromSlug(string));

// Accepts a number and returns a string with spaces every 3 digits.
export const nbSpacingFormatter = string => {
  if (!isNumber(string)) return string;
  // Casting the string to a number to use the native toLocaleString() method.
  return (
    Number(string)
      .toLocaleString('fr', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
      // Replacing the decimal comma separator with a dot.
      .replace(',', '.')
  );
};

export const formatIndex = index =>
  index < 10 ? `0${index}` : `${index}`;

export const nl2br = (str, isXhtml) => {
  const breakTag =
    isXhtml || typeof isXhtml === 'undefined' ? '<br />' : '<br>';
  return str.replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    `$1 ${breakTag} $2`
  );
};

export const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const stripHTMLTag = html => {
  if (typeof document !== 'undefined') {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
  return html;
};

export const escapeQuotes = str =>
  str.replace("'", "\\'").replace('"', '\\"');

export const ellipsis = (string, maxChars) => {
  if (!string || string.length <= maxChars) {
    return string;
  }

  const tokens = string.split(' ');
  const ellipsis = ' ...';

  let ret = '';
  for (const tok of tokens) {
    if (ret.length + tok.length <= maxChars + ellipsis.length) {
      ret += ` ${tok}`;
    } else {
      ret += ellipsis;
      break;
    }
  }

  return ret.trim();
};

export const mapToObj = map =>
  map.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

export const trim = (text, target = ' ') =>
  [trimStart, trimEnd].reduce((txt, fct) => fct(txt, target), text);

export const trimStart = (text, target = ' ') => {
  const chars = String(text || '').split('');

  return chars[0] === target
    ? chars.shift() && trimStart(chars.join(''), target)
    : chars.join('');
};

export const trimEnd = (str, target = ' ') =>
  String(str || '').replace(
    new RegExp(`^(.*?)([${escapeStringRegexp(target)}]*)$`),
    '$1'
  );

export const formatNbSpacing = number => {
  if (!isNumber(number)) return number;
  const [num, dec] = number.toString().split('.');
  const numFormatted = num.replace(/(\d{1,2}?)((\d{3})+)$/, '$1 $2');
  return dec ? `${numFormatted}.${dec}` : numFormatted;
};

// TODO: Make it agnostic
export const PhoneNumberPrefixLocationFRWithSpace = phone =>
  phone
    ? `+33 (${phone.slice(0, 1)})${phone.slice(1, 2)} ${phone.slice(
        2,
        4
      )} ${phone.slice(4, 6)} ${phone.slice(6, 8)} ${phone.slice(
        8,
        10
      )}`
    : 'N.C';

export const wordToNumber = (word = '') =>
  ({
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
  })[word];

// todo: fix html tag error on double space
export const sublimeCharactersHTML = (prefix = '', term) => {
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
