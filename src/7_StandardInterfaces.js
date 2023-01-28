import {filter, getValue, is, map, node, reduce,} from '@hexlet/html-tags';

export const identity = (word) => word;

export const wc = (word, text) => {
    const re = new RegExp(word, 'g');
    return (text.match(re) || []).length;
};

const extractHeaders = (html) => {
    const html2 = filter((item) => is('h2', item), html);
    return map((item) => node('p', getValue(item)), html2);
};

// читает вхождения слова в определенный тег.
const wordsCount = (tag, word, html) => (
    reduce((item, acc) => (
        is(tag, item) ? acc + wc(word, getValue(item)) : acc
    ), 0, html)
);

// Teacher solution
// export const wordsCount = (tagName, word, elements) => {
//   const filtered = filter((element) => is(tagName, element), elements);
//   const values = map(getValue, filtered);
//   return reduce((text, acc) => wc(word, text) + acc, 0, values);
// };

export { extractHeaders, wordsCount };