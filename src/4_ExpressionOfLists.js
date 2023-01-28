import {make, append, node, getValue, is, toString as htmlToString, getName} from '@hexlet/html-tags';
import {cons, head, isEmpty, l, tail} from "@hexlet/pairs-data";

const dom1 = make();
const dom2 = append(dom1, node('h1', 'scheme'));
const dom3 = append(dom2, node('p', 'is a lisp'));

const map = (func, coll) => {
    if (isEmpty(coll)) {
        return null;
    }
    const element = head(coll);
    return cons(func(element), map(func, tail(coll)));
};

// Отображение в результате которого в html-списке заменяются теги h1 на теги h2
const processedDom = map((element) => {
    if (is('h1', element)) {
        return node('h2', getValue(element));
    }
    return element;
}, dom3);

export const identity = (str) => str;

export const reverseStr = (str) => str.split('').reverse().join('');

const b2p = (elements) => {
    if (isEmpty(elements)) {
        return l();
    }

    let newElement;
    const element = head(elements);
    if (is('blockquote', element)) {
        newElement = node('p', getValue(element));
    } else {
        newElement = element;
    }

    return cons(newElement, b2p(tail(elements)));
};

// переворачивает содержимое тегов, так чтобы читать его нужно было справа налево, а не слева направо
const mirror = (coll) => map((elems) => node(getName(elems), reverseStr(getValue(elems))), coll);

export {mirror, b2p, map};

const dom12 = make();
const dom22 = append(dom12, node('h1', 'scheme'));
const dom32 = append(dom22, node('p', 'is a lisp'));

// <h1>emehcs</h1>
// <p>psil a si</p>
htmlToString(mirror(dom32));