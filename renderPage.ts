import { myTimer, renderTimer, getMinutes, getSeconds } from './helpers';
import {
    START_GAME_PAGE,
    GAME_PAGE,
    LEVELS_PAGE,
    RESULTS_PAGE,
} from './routes';

export let difficultyLevel: File | string;
const CARDS = {
    ranks: ['6', '7', '8', '9', '10', 'валет', 'дама', 'король', 'туз'],
    suits: ['бубны', 'черви', 'пики', 'крести'],
};
const deckCards: string[] = [];
let pairsOfCards: string[];
let choice1: string | undefined;
let choice2: string | undefined;
let timerHTML: HTMLDivElement;
let timerRender: NodeJS.Timeout;
let pairsCounter = 0;
let victory = false;

document.body.innerHTML = `<div id="app" class="app"></div>`;

CARDS.ranks.map((rank) => {
    CARDS.suits.map((suit) => {
        const card = rank + ` ` + suit;
        deckCards.push(card);
    }, CARDS.suits[0]);
}, CARDS.ranks[0]);

deckCards.sort(() => Math.random() - 0.5);

export function renderPage(page: string) {
    const appEl = document.getElementById('app') as HTMLDivElement;

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
        clearTimeout(timerRender);
        myTimer.reset();
        myTimer.stop();

        const startForm = document.getElementById(
            'start-form',
        ) as HTMLFormElement;
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
            pairsCounter = 0;
            choice1 = undefined;
            choice2 = undefined;
        });
        return;
    }

    if (page === START_GAME_PAGE) {
        getPairsOfCards();

        appEl.innerHTML =
            `<div class="header">
            <div class="timer" id="timer">
            <div class="timer__header">
        <h4 class="timer__min">min</h4>
        <h4 class="timer__min">sek</h4>
        </div>
        <p class="timer__clock-face">00:00</p>
      </div>
      <button class="difficulty-box__button restart-button" id="restart-button">Начать заново</button>
      </div>` +
            `<div class="card-field" id="card-field">` +
            pairsOfCards
                .map((card, index) => {
                    return `<div class="card-field__card" data-card-id="${index}">
                    <img src="./static/img/cards/${card}.jpg" class="card-field__card" data-card-id="${index}" alt="${card}">
                    </div>`;
                })
                .join('');
        +`</div>`;

        const restartButtonEl = document.getElementById(
            'restart-button',
        ) as HTMLButtonElement;

        restartButtonEl.addEventListener('click', () => {
            renderPage(LEVELS_PAGE);
        });

        timerHTML = document.getElementById('timer') as HTMLDivElement;
        myTimer.start({ countdown: true, startValues: { seconds: 6 } });
        myTimer.addEventListener('secondsUpdated', () => {
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            renderTimer({ timerHTML } as any);
        });
        timerRender = setTimeout(renderPage, 6000, GAME_PAGE);

        return;
    }

    if (page === GAME_PAGE) {
        appEl.innerHTML =
            `<div class="header">
            <div class="timer" id="timer">
            <div class="timer__header" >
        <h4 class="timer__min">min</h4>
        <h4 class="timer__min">sek</h4>
        </div>
        <p class="timer__clock-face">00:00</p>
      </div>
      <button class="difficulty-box__button restart-button" id="restart-button">Начать заново</button>
      </div>` +
            `<div class="card-field" id="card-field">` +
            pairsOfCards
                .map((el, index) => {
                    return `<div class="card-field__card" data-card-id="${index}">
                    <img src="./static/img/cards/рубашка.jpg" id="card"  data-card-id="${index}" alt="рубашка">
                    </div>`;
                })
                .join('');
        +`</div>`;

        const restartButtonEl = document.getElementById(
            'restart-button',
        ) as HTMLButtonElement;

        restartButtonEl.addEventListener('click', () => {
            renderPage(LEVELS_PAGE);
        });

        timerHTML = document.getElementById('timer') as HTMLDivElement;
        myTimer.start();
        myTimer.addEventListener('secondsUpdated', () => {
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            renderTimer({ timerHTML } as any);
        });

        for (const cardEl of document.querySelectorAll('.card-field__card')) {
            cardEl.addEventListener(
                'click',
                () => {
                    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                    flipCard({ cardEl } as any);
                    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
                    renderTimer({ timerHTML } as any);
                },
                { once: true },
            );
        }

        return;
    }

    if (page === RESULTS_PAGE) {
        myTimer.pause();
        const cardField = document.getElementById(
            'card-field',
        ) as HTMLDivElement;
        cardField.insertAdjacentHTML(
            'afterend',
            `<div class="results">  
              <img src="./static/img/${
                  victory === true ? 'firecracker.png' : 'dead.png'
              }" alt="смайлик">
              <h2 class="results__header">${
                  victory === true ? 'Вы выиграли!' : 'Вы проиграли!'
              }</h2>
              <h4 class="results__text">Затраченное время</h4>
              <p class="timer__clock-face results__timer">${getMinutes()}:${getSeconds()}</p>
              <button class="difficulty-box__button results__restart-button" id="play-again-button">Играть снова</button>
            </div>
            <div class="translucent__background"
            </div>`,
        );

        const playAgainButtonEl = document.getElementById(
            'play-again-button',
        ) as HTMLButtonElement;
        playAgainButtonEl.addEventListener('click', () => {
            renderPage(LEVELS_PAGE);
        });

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

function flipCard({ cardEl }: { cardEl: HTMLElement }) {
    const cardId = cardEl.dataset.cardId;
    cardEl.innerHTML = `<img src="./static/img/cards/${
        pairsOfCards[Number(cardId)]
    }.jpg" alt="${pairsOfCards[Number(cardId)]}">`;

    if (choice1 === undefined) {
        choice1 = pairsOfCards[Number(cardId)];
    } else choice2 = pairsOfCards[Number(cardId)];

    if (choice1 !== undefined && choice2 !== undefined)
        if (choice1 === choice2) {
            pairsCounter++;
            choice1 = undefined;
            choice2 = undefined;
        } else {
            victory = false;
            renderPage(RESULTS_PAGE);
        }
    if (pairsCounter === pairsOfCards.length / 2) {
        victory = true;
        renderPage(RESULTS_PAGE);
    }
}
