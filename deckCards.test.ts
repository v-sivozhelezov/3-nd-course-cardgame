/* eslint @typescript-eslint/no-var-requires: "off" */
const { it } = require('@jest/globals');
const assert = require('assert').strict;
const { getDeckCards, deckCards, getRandomDeckCards } = require('./deckCards');

it('should compare the assembly of the deck of cards with the reference one', () => {
    const expected = [
        '6 бубны',
        '6 черви',
        '6 пики',
        '6 крести',
        '7 бубны',
        '7 черви',
        '7 пики',
        '7 крести',
        '8 бубны',
        '8 черви',
        '8 пики',
        '8 крести',
        '9 бубны',
        '9 черви',
        '9 пики',
        '9 крести',
        '10 бубны',
        '10 черви',
        '10 пики',
        '10 крести',
        'валет бубны',
        'валет черви',
        'валет пики',
        'валет крести',
        'дама бубны',
        'дама черви',
        'дама пики',
        'дама крести',
        'король бубны',
        'король черви',
        'король пики',
        'король крести',
        'туз бубны',
        'туз черви',
        'туз пики',
        'туз крести',
    ].toString();

    getDeckCards();
    const result = deckCards.toString();

    assert.equal(result, expected);
});

it('should check random card shuffling', () => {
    getDeckCards();
    const expected = deckCards.toString();

    const result = getRandomDeckCards().toString();

    assert.notStrictEqual(result, expected);
});
