/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    .then((res) => res.json())
    .then((towns) => towns.sort((a, b) => a.name.localeCompare(b.name)));
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  if (full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0) return true;
  return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let arr;

retryButton.addEventListener('click', () => {
  loadPage();
});

filterInput.addEventListener('input', function () {
  while (filterResult.firstChild) {
    filterResult.removeChild(filterResult.firstChild);
  }
  if (filterInput.value === '') return;
  for (let i = 0; i < arr.length; i++) {
    if (isMatching(arr[i].name, this.value)) {
      const div = document.createElement('div');
      div.textContent = arr[i].name;
      filterResult.append(div);
    }
  }
});

function loadPage() {
  loadingBlock.style.display = 'block';
  loadingFailedBlock.style.display = 'none';
  filterBlock.style.display = 'none';
  loadTowns().then(
    (towns) => {
      arr = towns;
      loadingBlock.style.display = 'none';
      filterBlock.style.display = 'block';
      return towns;
    },
    (towns) => {
      arr = towns;
      loadingBlock.style.display = 'none';
      loadingFailedBlock.style.display = 'block';
      return towns;
    }
  );
}
loadPage();

export { loadTowns, isMatching };
