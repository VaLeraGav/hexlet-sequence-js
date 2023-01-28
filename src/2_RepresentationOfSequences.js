import {
  l, cons as consList, head, tail, isEmpty, toString as listToString,
} from '@hexlet/pairs-data';

// проверяет, является ли переданное значение элементом списка
const has = (list, elem) => {
  if (isEmpty(list)) {
    return false;
  }
  if (head(list) === elem) {
    return true;
  }
  return has(tail(list), elem);
};

// переворачивает список, используя итеративный процесс.
const reverse = (list) => {
  const iter = (items, acc) => (
      isEmpty(items) ? acc : iter(tail(items), consList(head(items), acc))
  );
  return iter(list, l());
};

// которая соединяет два списка, используя рекурсивный процесс
export const concat = (list1, list2) => {
  if (isEmpty(list1)) {
    return list2;
  }
  return consList(head(list1), concat(tail(list1), list2));
};

export { has, reverse, concat };

const numbers1 = l(3, 4, 5, 8);
has(numbers1, 8); // true
has(numbers1, 0); // false

const numbers2 = l(3, 4, 5);
reverse(numbers2); // (5, 4, 3)

const numbers3 = l(3, 4, 5, 8);
const numbers4 = l(3, 2, 9);
concat(numbers3, numbers4); // (3, 4, 5, 8, 3, 2, 9)
