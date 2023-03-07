// Each piece gets 1 point
// Each line completed gets 10X2^n
// Extra: Each line completed consecutively ?x5
// Extra: Points for lines of a single color


class ScoreKeeper {
    constructor() {
        this.score = 0;
        this.completedLinesLastUpdate = false;
    }

    /**
     * Called each time a piece is placed
     */
    updateScore(linesCompleted = 0) {
        // One point for placing a piece
        this.score++;

        if( linesCompleted ) {
            this.score += 10 * Math.pow(2, linesCompleted);

            // TODO: Lines completed consecutively score

            this.completedLinesLastUpdate = true;
        }

        return this.score;
    }
}

export default ScoreKeeper;