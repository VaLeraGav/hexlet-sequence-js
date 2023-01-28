import {append, getValue, is, make, node, toString as htmlToString} from '@hexlet/html-tags';
import {cons, head, isEmpty, l, map, tail, toString as listToString} from '@hexlet/pairs-data';

export const removeHeaders = (elements) => {
    if (isEmpty(elements)) {
        return l();
    }

    const element = head(elements);
    const tailElements = tail(elements);
    if (is('h1', element)) {
        return removeHeaders(tailElements);
    }
    return cons(element, removeHeaders(tailElements));
};

/* Версия с рекурсивным подходом */
const filter = (func, coll) => {
    if (isEmpty(coll)) {
        return null;
    }
    const headElement = head(coll);
    const tailElements = tail(coll);
    if (func(headElement)) {
        return cons(headElement, filter(func, tailElements));
    }
    return filter(func, tailElements);
};

/* Версия с итеративным подходом */
const filterI = (func, coll) => {
    const iter = (coll1, acc) => {
        if (isEmpty(coll1)) {
            return null;
        }
        const headElement = head(coll1);
        const tailElements = tail(coll1);
        if (func(headElement)) {
            return cons(headElement, iter(tailElements, acc));
        }
        return iter(tailElements, acc);
    };
    return iter(coll, '');
};

const html1 = append(make(), node('h1', 'header1'));
const html2 = append(html1, node('h1', 'header2'));
const html3 = append(html2, node('p', 'content'));

const processedHtml = filter((element) => !is('h1', element), html3);

//<p>content</p>
htmlToString(processedHtml);

//----------------------

// которая извлекает из html тексты цитат и возвращает список цитат.
const quotes = (coll) => {
    const filteredQuotes = filter((el) => is('blockquote', el), coll);
    return map((el) => getValue(el), filteredQuotes);
};

export {filter, quotes}

const dom1 = make();
const dom2 = append(dom1, node('h1', 'scheme'));
const dom3 = append(dom2, node('p', 'is a lisp'));
const dom4 = append(dom3, node('blockquote', 'live is life'));
const dom5 = append(dom4, node('blockquote', 'i am sexy, and i know it'));

listToString(quotes(dom5)); // ('i am sexy, and i know it', 'live is life');
