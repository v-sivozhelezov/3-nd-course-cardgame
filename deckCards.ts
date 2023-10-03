export const CARDS = {
    ranks: ['6', '7', '8', '9', '10', 'валет', 'дама', 'король', 'туз'],
    suits: ['бубны', 'черви', 'пики', 'крести'],
};
export const deckCards: string[] = [];
export let randomDeckCards: string[];

export function getDeckCards() {
    CARDS.ranks.map((rank) => {
        CARDS.suits.map((suit) => {
            const card = rank + ` ` + suit;
            deckCards.push(card);
        });
    });
}

export function getRandomDeckCards() {
    randomDeckCards = deckCards.sort(() => Math.random() - 0.5);
    return randomDeckCards;
}
