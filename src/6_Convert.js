import {node, append, make, getValue, is} from '@hexlet/html-tags';
import {head, isEmpty, tail} from "@hexlet/pairs-data";

const html1 = append(make(), node('h1', 'header1'));
const html2 = append(html1, node('h1', 'header2'));
const html3 = append(html2, node('p', 'content'));

// reduce((element, acc) => {
//     return is('h1', element) ? acc + 1 : acc;
// }, 0, html3); // 2

export const reduce = (func, acc, coll) => {
    if (isEmpty(coll)) {
        return acc;
    }
    const headElement = head(coll);
    const tailElements = tail(coll);
    return reduce(func, func(headElement, acc), tailElements);
};

export const emptyTagsCount = (typeTag, coll) => {
    const mt = '';
    return reduce((el, acc) => ((is(typeTag, el) && (getValue(el) === mt)) ? acc + 1 : acc), 0, coll);
};

const emptyTagsCountT = (tagName, elements) => {
    const predicate = (element) => is(tagName, element) && getValue(element) === '';
    const func = (element, acc) => (predicate(element) ? acc + 1 : acc);
    return reduce(func, 0, elements);
};

// можно использовать для наглядного сопоставления частного варианта свёртки с обобщённой реализацией операции отображения
export const headersCount = (tagName, elements) => {
    const iter = (items, acc) => {
        if (isEmpty(items)) {
            return acc;
        }

        const item = head(items);
        const newAcc = is(tagName, item) ? acc + 1 : acc;
        return iter(tail(items), newAcc);
    };
    return iter(elements, 0);
};

const html10 = make();
const html20 = append(html10, node('h1', 'scheme'));
const html30 = append(html20, node('p', 'is a lisp'));
const html40 = append(html30, node('blockquote', ''));
const html50 = append(html40, node('blockquote', ''));
const html60 = append(html50, node('blockquote', 'quote'));

emptyTagsCount('blockquote', html60); // 2
