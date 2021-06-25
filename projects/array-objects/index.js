/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
//function forEach(array, fn) {}
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    const curVal = array[i];
    fn(curVal, i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
//function map(array, fn) {}
function map(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const curVal = array[i];
    const resultVal = fn(curVal, i, array);
    result.push(resultVal);
  }

  return result;
}
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
//function reduce(array, fn, initial) {}
function reduce(array, fn, initial) {
  let currentVal = 0;
  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      if (initial === undefined) {
        i++;
      }
      currentVal = fn(initial || array[0], array[i], i, array);
      continue;
    }
    currentVal = fn(currentVal, array[i], i, array);
  }
  return currentVal;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
//function upperProps(obj) {}
function upperProps(obj) {
  const arr = [];
  let i = 0;
  for (const cur in obj) {
    arr[i++] = cur.toUpperCase();
  }
  return arr;
}
/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
//function createProxy(obj) {}
function createProxy(obj) {
  obj = new Proxy(obj, {
    get(target, prop) {
      return target[prop] * target[prop];
    },
  });
  return obj;
}

export { forEach, map, reduce, upperProps, createProxy };
