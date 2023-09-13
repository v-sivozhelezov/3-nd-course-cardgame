// import { flipCard } from './flipCard.js';
import { START_GAME_PAGE, GAME_PAGE, LEVELS_PAGE } from './routes.js';

export let difficultyLevel;
const CARDS = {
    ranks: ['6', '7', '8', '9', '10', 'валет', 'дама', 'король', 'туз'],
    suits: ['бубны', 'черви', 'пики', 'крести'],
};
const deckCards = [];
let pairsOfCards;
let choice1;
let choice2;
document.body.innerHTML = `<div id="app" class="app"></div>`;

CARDS.ranks.reduce((item, rank) => {
    CARDS.suits.reduce((card, suit) => {
        card = rank + ` ` + suit;
        deckCards.push(card);
    }, CARDS.suits[0]);
}, CARDS.ranks[0]);

deckCards.sort(() => Math.random() - 0.5);

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

            renderPage(START_GAME_PAGE);
        });
        return;
    }

    if (page === START_GAME_PAGE) {
        getPairsOfCards();

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
            pairsOfCards
                .map((card, index) => {
                    return `<div class="card-field__card" data-card-id="${index}">
                    <img src="./static/cards/${card}.jpg" class="card-field__card" data-card-id="${index}" alt="${card}">
                    </div>`;
                })
                .join('');
        +`</div>`;
        setTimeout(renderPage, 5000, GAME_PAGE);
        return;
    }

    if (page === GAME_PAGE) {
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
            pairsOfCards
                .map((el, index) => {
                    return `<div class="card-field__card" data-card-id="${index}">
                    <img src="./static/cards/рубашка.jpg" id="card"  data-card-id="${index}" alt="рубашка">
                    </div>`;
                })
                .join('');
        +`</div>`;

        for (const cardEl of document.querySelectorAll('.card-field__card')) {
            cardEl.addEventListener(
                'click',
                () => {
                    flipCard({ cardEl });
                },
                { once: true },
            );
        }
        return;
    }
}

function getPairsOfCards() {
    if (difficultyLevel === `1`) {
        pairsOfCards = deckCards.slice(0, 3);
    }
    if (difficultyLevel === `2`) {
        pairsOfCards = deckCards.slice(0, 6);
    }
    if (difficultyLevel === `3`) {
        pairsOfCards = deckCards.slice(0, 9);
    }
    pairsOfCards.map((card) => {
        pairsOfCards.push(card);
    });

    return pairsOfCards.sort(() => Math.random() - 0.5);
}

function flipCard({ cardEl }) {
    console.log('clik');
    const cardId = cardEl.dataset.cardId;
    cardEl.innerHTML = `<img src="./static/cards/${pairsOfCards[cardId]}.jpg" alt="${pairsOfCards[cardId]}">`;
    if (choice1 === undefined) {
        choice1 = pairsOfCards[cardId];
    } else choice2 = pairsOfCards[cardId];
    console.log(choice1, choice2);

    if (choice1 !== undefined && choice2 !== undefined)
        if (choice1 === choice2) {
            alert('угадали');
            choice1 = choice2 = undefined;
        } else {
            alert('не угадали');
            choice1 = choice2 = undefined;
            renderPage(LEVELS_PAGE);
        }
}
