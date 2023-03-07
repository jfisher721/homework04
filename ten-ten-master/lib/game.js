const EventEmitter = require('events');
import PlayField from './play-field';
import PlayerHand from './player-hand';
import ScoreKeeper from './score-keeper';
import Position from './position';
import Cell from './cell';
import { getRandomPiece } from './pieces';

const DEFAULT_GRID_SIZE = 10;
const DEFAULT_HAND_SIZE = 3;

// TODO: Use these
const MIN_GRID_SIZE = 5;
const MIN_HAND_SIZE = 1;

class Game extends EventEmitter {
    constructor(gridSize = DEFAULT_GRID_SIZE, handSize = DEFAULT_HAND_SIZE) {
        super();

        this.playField = new PlayField(gridSize);
        this.playerHand = new PlayerHand(handSize);
        this.scoreKeeper = new ScoreKeeper();

        this.maxHandSize = handSize;
        this.gameOver = false;

        this.reloadPlayerHand();
    }

    // Returns a PlayerHand
    getPlayerHand() {
        return this.playerHand;
    }

    // Return a PlayField
    getPlayField() {
        return this.playField;
    }

    reloadPlayerHand() {
        while( this.playerHand.getHandSize() < this.maxHandSize ) {
            let piece = getRandomPiece();
            this.playerHand.givePiece(piece);
        }
    }

    // Places a piece on the play field
    placePiece(piece, position) {
        if( !this.canPlacePiece(piece, position) ) {
            console.log('Piece cannot be placed');
            return false;
        }

        // TODO: Make sure piece is in player's hand
        let placeRow = position.row;
        let placeCol = position.col;

        for(let row = 0; row < piece.height; row++ ) {
            for(let col = 0; col < piece.width; col++ ) {
                if( piece.isEmptyAt(new Position(row, col)) ) {
                    continue;
                }

                let cellPosition = new Position(placeRow + row, placeCol + col);
                let cell = new Cell(false, piece.color);

                this.playField.setCell(cellPosition, cell);
            }
        }

        this.emit('piece-placed', piece);

        // TODO: Update score
        this.scorePlayField();

        // Remove piece from player hand
        this.playerHand.takePiece(piece);

        if( !this.playerHand.pieces.length ) {
            this.reloadPlayerHand();
        }

        // Check end game
        this.checkEndGame();

        return true;
    }

    // Returns true if the specified piece can be played at the specified position
    canPlacePiece(piece, position) {
        let placeRow = position.row;
        let placeCol = position.col;

        if( placeRow < 0 || placeRow >= this.playField.size ) {
            //('Invalid row position for piece placement on play field');
            return false;
        }

        if( placeCol < 0 || placeCol >= this.playField.size ) {
            //('Invalid col position for piece placement on play field');
            return false;
        }

        if( placeRow + piece.height > this.playField.size ) {
            //('Invalid row position. Piece extends beyond play field');
            return false;
        }

        if( placeCol + piece.width > this.playField.size ) {
            //('Invalid col position. Piece extends beyond play field');
            
        }

        for(let row = 0; row < piece.height; row++ ) {
            for(let col = 0; col < piece.width; col++ ) {
                if( piece.isEmptyAt(new Position(row, col)) ) {
                    continue;
                }

                if( !this.playField.isEmptyAt(new Position(placeRow + row, placeCol + col)) ) {
                    return false;
                }
            }
        }

        return true;
    }

    // Clears complete rows and columns, and scores it
    scorePlayField() {
        let rows = [];
        let cols = [];

        for(let i = 0; i < this.playField.size; i++ ) {
            rows[i] = true;
            cols[i] = true;
        }

        for(let row = 0; row < this.playField.size; row++ ) {
            for(let col = 0; col < this.playField.size; col++ ) {
                let position = new Position(row, col);
                if( this.playField.isEmptyAt(position) ) {
                    rows[row] = false;
                    cols[col] = false;
                }
            }
        }

        let cleared = 0;
        for(let i = 0; i < this.playField.size; i++ ) {
            if( rows[i] ) {
                for(let col = 0; col < this.playField.size; col++ ) {
                    this.playField.grid[i][col].isEmpty = true;
                    this.playField.grid[i][col].color = null;
                }
                cleared++;
            }

            if( cols[i] ) {
                for(let row = 0; row < this.playField.size; row++ ) {
                    this.playField.grid[row][i].isEmpty = true;
                    this.playField.grid[row][i].color = null;
                }
                cleared++;
            }
        }

        // Update score
        this.scoreKeeper.updateScore(cleared);
    }

    checkEndGame() {
        let numOfPieces = this.playerHand.getHandSize();
        let gridSize = this.playField.getSize();
        
        for( let i = 0; i < numOfPieces; i++ ) {
            let piece = this.playerHand.getPiece(i);
            let width = piece.width;
            let height = piece.height;
            
            for( let row = 0; row <= gridSize - height; row++ ) {
                for( let col = 0; col <= gridSize - width; col++ ) {
                    let position = new Position(row, col);

                    if( this.canPlacePiece(piece, position) ) {
                        return;
                    }
                }
            }
        }

        // At this point, no pieces can be placed, end the game.
        this.gameOver = true;
        this.emit('game-over');
    }

    // Return true if game is over
    isGameOver() {
        return this.gameOver;
    }

    // Returns the players current score
    getPlayerScore() {
        return this.scoreKeeper.score;
    }
}

export default Game;