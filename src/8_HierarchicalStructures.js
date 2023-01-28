import { /* eslint-disable */
    l, cons as consList, isList, isEmpty, head, tail, concat, toString as listToString, length
} from '@hexlet/pairs-data';

import {
    is, hasChildren, children, filter, reduce, toString as htmlToString,
    make, node, append, getName, getValue,
} from '@hexlet/html-tags'; /* eslint-enable */

const flat = (tag, treeList) => {
    if (isEmpty(treeList)) {
        return l();
    }
    const isLeaf = (elem, acc) => {
        if (!hasChildren(elem)) {
            return consList(elem, acc);
        }
        return concat(select(tag, children(elem)), consList(elem, acc));
    };
    return reduce(isLeaf, l(), treeList);
};

//принимает на вход имя тега и HTML список, а возвращает список всех нод, соответствующих имени.
const select = (tag, list) => {
    const linearList = flat(tag, list);
    return filter((elem) => is(tag, elem), linearList);
};

const selectT = (tagName, html) => reduce((element, acc) => {
    const acc2 = hasChildren(element) ? concat(select(tagName, children(element)), acc) : acc;
    return is(tagName, element) ? consList(element, acc2) : acc2;
}, l(), html);


// const select = (tagName, html) => reduce((element, acc) => {
//   const acc2 = hasChildren(element) ? concat(select(tagName, children(element)), acc) : acc;
//   return is(tagName, element) ? consList(element, acc2) : acc2;
// }, l(), html);

const dom1 = make(); // Список нод, то есть это лес, а не дерево
const dom2 = append(dom1, node('h1', 'scheme'));
const dom3 = append(dom2, node('p', 'is a lisp'));

const children1 = l(node('li', 'item 1'), node('li', 'item 2'));
const dom4 = append(dom3, node('ul', children1));
const children2 = l(node('li', 'item 1'), node('li', 'item 2'));
const dom5 = append(dom4, node('ol', children2));
const dom6 = append(dom5, node('p', 'is a functional language'));
const children3 = l(node('li', 'item'));
const dom7 = append(dom6, node('ul', children3));
const dom8 = append(dom7, node('div', l(node('p', 'text'))));
const dom9 = append(dom8, node('div', l(node('div', l(node('p', 'text'))))));

const dom10 = append(dom9, node('h1', 'prolog'));
const dom = append(dom10, node('p', 'is about logic'));

select('li', dom);
// [('li', 'item 1'), ('li', 'item 2'), ('li', 'item 1'), ('li', 'item 2'), ('li', 'item')]

//console.log(listToString(dom));

select('p', dom);
// [('p', 'is a lisp'), ('p', 'text'), ('p', 'text'), ('p', 'is about logic'), ('p', 'is a functional language')]

console.log(length(select('span', dom))); // toBe(2);
console.log(length(select('section', dom))); // toBe(0);

export default select;


const tree = l(l(1, 2), l(3, l(4, 5)), 6);

const countElements = (tree) => {
    if (!isList(tree)) {
        return 1;
    }
    if (isEmpty(tree)) {
        return 0;
    }
    return countElements(head(tree)) + countElements(tail(tree));
};

countElements(tree); // 6
