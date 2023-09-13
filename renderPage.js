import { GAME_OVER_PAGE, GAME_PAGE, LEVELS_PAGE } from './routes.js';

export let difficultyLevel;
const CARDS = {
    ranks: ['6', '7', '8', '9', '10', 'валет', 'дама', 'король', 'туз'],
    suits: ['бубны', 'черви', 'пики', 'крести'],
};
const deckCards = [];

CARDS.ranks.reduce((item, rank) => {
    CARDS.suits.reduce((card, suit) => {
        card = rank + ` ` + suit;
        deckCards.push(card);
    }, CARDS.suits[0]);
}, CARDS.ranks[0]);

console.log(deckCards);

export function renderPage(page) {
    let appEl = document.getElementById('app');

    if (page === LEVELS_PAGE) {
        appEl.innerHTML = `
          <form class="difficulty-box" id="start-form">
          <h3 class="difficulty-box__header">Выберите <br> сложность</h3>
          <div class="difficulty-box__menu">
              <div class="difficulty-box__level">
                  <input type="radio" id="level1" name="level" value="1" checked />
                  <label for="level1">1</label>
              </div>
              <div class="difficulty-box__level">
                  <input type="radio" id="level2" name="level" value="2" />
                  <label for="level2">2</label>
              </div>
              <div class="difficulty-box__level">
                  <input type="radio" id="level3" name="level" value="3" />
                  <label for="level3">3</label>
              </div>
          </div>
          <button type="submit" id="start-button" class="difficulty-box__button">Старт</button>
      </form>`;
        const startForm = document.getElementById('start-form');
        startForm.addEventListener('submit', (event) => {
            const data = new FormData(startForm);

            for (const entry of data) {
                difficultyLevel = entry[1];
            }
            window.localStorage.setItem(
                'level',
                JSON.stringify(difficultyLevel),
            );
            event.preventDefault();

            renderPage(GAME_PAGE);
        });
        return;
    }

    if (page === GAME_PAGE) {
        console.log(page);

        appEl.innerHTML =
            `<div class="header">
            <div class="timer">
            <div class="timer__header">
        <h4 class="timer__min">min</h4>
        <h4 class="timer__min">sek</h4>
        </div>
        <p class="timer__clock-face">00:00</p>
      </div>
      <button class="difficulty-box__button restart-button">Начать заново</button>
      </div>` +
            `<div class="card-field">` +
            deckCards
                .map(() => {
                    return `<img src="./image/cards/рубашка.jpg" class="card-field__card" alt="рубашка">`;
                })
                .join('');
        +`</div>`;
        for (const cardEl of document.querySelectorAll('.card-field__card')) {
            cardEl.addEventListener('click', () => {
                renderPage(GAME_OVER_PAGE);
            });
        }
        return;
    }

    if (page === GAME_OVER_PAGE) {
        console.log(page);

        appEl.innerHTML =
            `<div class="header">
            <div class="timer">
            <div class="timer__header">
        <h4 class="timer__min">min</h4>
        <h4 class="timer__min">sek</h4>
        </div>
        <p class="timer__clock-face">00:00</p>
      </div>
      <button class="difficulty-box__button restart-button">Начать заново</button>
      </div>` +
            `<div class="card-field">` +
            deckCards
                .map((card) => {
                    return `<img src="./image/cards/${card}.jpg" class="card-field__card" alt="${card}">`;
                })
                .join('');
        +`</div>`;
    }
}
