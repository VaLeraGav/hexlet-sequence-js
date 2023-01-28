import {
    cons, car, cdr, toString as pairToString,
} from '@hexlet/pairs';

import {
    l, isEmpty, head, tail, cons as consList, toString as listToString,
} from '@hexlet/pairs-data';

// конструктор. Не принимает параметров, и создает HTML-список.
const make = () => l();

// создает новый тег. Содержит два элемента, имя тега и его содержимое.
const node = (name, content) => cons(name, content);

const getName = (tag) => car(tag);

const getValue = (tag) => cdr(tag);

// добавляет элемент (тег), созданный с помощью node(), в HTML-список.
// Возвращает новый HTML-список. Новый элемент должен добавляться в начало ("голову") списка.
const append = (dom, tag) => consList(tag, dom);

// возвращает текстовое представление HTML на основании HTML-списка.
const toString = (currentDom) => {
    const iter = (dom, acc) => {
        if (isEmpty(dom)) {
            return acc;
        }
        const element = head(dom);
        const tag = getName(element);
        const tagContent = getValue(element);
        return iter(tail(dom), `<${tag}>${tagContent}</${tag}>${acc}`);
    }
    return iter((currentDom), '');

    // if (isEmpty(html)) {
    //   return '';
    // }
    // const element = head(html);
    // const tag = getName(element);
    // const value = getValue(element);
    // const restOfHtml = toString(tail(html));
    // return `${restOfHtml}<${tag}>${value}</${tag}>`;

    // const iter = (dom, acc) => (
    //   isEmpty(dom) ? acc : iter(
    //     tail(dom),
    //     `<${getName(head(dom))}>${getValue(head(dom))}</${getName(head(dom))}>${acc}`,
    //   )
    // );
}

export {toString, append, getValue, getName, node, make};

const tag1 = node('div', 'what is love?');
// console.log(getName(tag1)); // div
// console.log(getValue(tag1)); // what is love?

// Создаем новый html-список
const dom1 = make();

// Создаем тег и сразу добавляем его в html
const dom2 = append(dom1, node('h1', 'hello, world'));
// Еще раз
const dom3 = append(dom2, node('h2', 'header2'));

// Создаем новый тег
const tag2 = node('h3', 'header3');
// Добавляем созданный тег в html-список
const dom = append(dom3, tag2);

// Преобразуем html-список в строчку
//console.log(toString(dom));
// <h1>hello, world</h1><h2>header2</h2><h3>header3</h3>

// Пример без создания промежуточных переменных
//toString(append(make(), node('p', 'this is Sparta!')));
// <p>this is Sparta!</p>