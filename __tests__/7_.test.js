// @ts-check
import {
  make, append, node, toString as htmlToString,
} from '@hexlet/html-tags';
import { extractHeaders, wordsCount } from '../src/7_StandardInterfaces.js';

const dom1 = make();
const dom2 = append(dom1, node('h1', 'scheme'));
const dom3 = append(dom2, node('p', 'is a lisp'));

const dom4 = append(dom3, node('h2', 'haskell'));
const dom5 = append(dom4, node('p', 'is a functional language'));

const dom6 = append(dom5, node('h2', 'prolog'));
const dom7 = append(dom6, node('p', 'sicp'));
const dom8 = append(dom7, node('blockquote', 'haskell haskell'));
const dom9 = append(dom8, node('blockquote', 'quote'));
const dom10 = append(dom9, node('h2', 'haskell'));
const dom = append(dom10, node('p', 'is about logic haskell'));

describe('Standard interfaces', () => {
  it('#extractHeaders', () => {
    const headersAsP = extractHeaders(dom);
    const result = '<p>haskell</p><p>prolog</p><p>haskell</p>';
    expect(htmlToString(headersAsP)).toBe(result);
  });

  it('#wordsCount', () => {
    expect(wordsCount('i', 'scheme', dom)).toBe(0);
    expect(wordsCount('h1', 'undefined', dom)).toBe(0);
    expect(wordsCount('h1', 'scheme', dom)).toBe(1);
    expect(wordsCount('blockquote', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'h2', dom)).toBe(0);
  });
});
