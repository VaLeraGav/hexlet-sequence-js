import { l, toString as listToString } from '@hexlet/pairs-data';

import {
  make, append, node, is, toString as htmlToString,
} from '@hexlet/html-tags';

import { filter, quotes, removeHeaders } from '../src/5_FiltrationOfLists.js';

describe('Filtration of lists', () => {
  let dom;

  beforeEach(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));

    const dom4 = append(dom3, node('h1', 'haskell'));
    const dom5 = append(dom4, node('p', 'is a functional language'));

    const dom6 = append(dom5, node('h1', 'prolog'));
    dom = append(dom6, node('p', 'is about logic'));
  });

  it('#removeHeaders', () => {
    const processedDom = removeHeaders(dom);

    const result = '<p>is a lisp</p><p>is a functional language</p><p>is about logic</p>';
    expect(htmlToString(processedDom)).toBe(result);
  });

  it('#filter', () => {
    const processedDom = filter((element) => is('h1', element), dom);

    const result = '<h1>scheme</h1><h1>haskell</h1><h1>prolog</h1>';
    expect(htmlToString(processedDom)).toBe(result);

    const processedDom2 = filter((element) => is('p', element), dom);
    const result2 = '<p>is a lisp</p><p>is a functional language</p><p>is about logic</p>';
    expect(htmlToString(processedDom2)).toBe(result2);

    expect(htmlToString(make())).toBe('');
  });

  it('#quotes', () => {
    const dom0 = make();
    const dom1 = append(dom0, node('h1', 'scheme'));
    const dom2 = append(dom1, node('blockquote', 'live is life'));
    const dom3 = append(dom2, node('p', 'is a lisp'));
    const dom4 = append(dom3, node('blockquote', 'i am sexy, and i know it'));
    const result = l('i am sexy, and i know it', 'live is life');
    expect(listToString(quotes(dom4))).toBe(listToString(result));
  });
});
