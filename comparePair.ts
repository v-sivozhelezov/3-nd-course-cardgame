export let victory: boolean = false;
import { pairsOfCards, renderPage } from './renderPage';
import { RESULTS_PAGE } from './routes';

export function comparePair({
    // choice1,
    // choice2,
    // pairsCounter,
}: {
    choice1: string | undefined;
    choice2: string | undefined;
    pairsCounter: number;
}) {
    console.log(pairsCounter);
    if (pairsCounter / 2 === pairsOfCards.length / 2) {
        victory = true;
        renderPage(RESULTS_PAGE);
        return victory;
    }
    if (choice1 !== choice2) {
        victory = false;
        renderPage(RESULTS_PAGE);
        return victory;
    }
}
