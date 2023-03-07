import Piece, { FILL_SYMBOL } from './piece';

export class Dot extends Piece {
    constructor(color) {
        super(1, 1, color);

        // [x]
        
        this.shape[0][0] = FILL_SYMBOL;
    }

    rotate() {
        // Dot is always same shape
    }
}

export class SmallCorner extends Piece {
    constructor(color) {
        super(2, 2, color);
        
        // [x][ ]
        // [x][x]
        
        this.shape[0][0] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[1][1] = FILL_SYMBOL;
    }
}

export class LargeCorner extends Piece {
    constructor(color) {
        super(3, 3, color);
        
        // [x][ ][ ]
        // [x][ ][ ]
        // [x][x][x]
        
        this.shape[0][0] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[2][0] = FILL_SYMBOL;
        this.shape[2][1] = FILL_SYMBOL;
        this.shape[2][2] = FILL_SYMBOL;
    }
}

class LinePiece extends Piece {
    constructor(height, color) {
        super(1, height, color);
    }

    rotate(times) {
        if( times % 2 === 0 ) {
            return;
        }

        super.rotate(times);
    }
}

export class SmallLine extends LinePiece {
    constructor(color) {
        super(2, color);

        // [x]
        // [x]

        this.shape[0][0] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
    }
}

export class MediumLine extends LinePiece {
    constructor(color) {
        super(3, color);

        // [x]
        // [x]
        // [x]

        this.shape[0][0] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[2][0] = FILL_SYMBOL;
    }
}

export class LargeLine extends LinePiece {
    constructor(color) {
        super(4, color);

        // [x]
        // [x]
        // [x]
        // [x]

        this.shape[0][0] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[2][0] = FILL_SYMBOL;
        this.shape[3][0] = FILL_SYMBOL;
    }
}

export class GiantLine extends LinePiece {
    constructor(color) {
        super(5, color);

        // [x]
        // [x]
        // [x]
        // [x]
        // [x]

        this.shape[0][0] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[2][0] = FILL_SYMBOL;
        this.shape[3][0] = FILL_SYMBOL;
        this.shape[4][0] = FILL_SYMBOL;
    }
}

export class SmallBox extends Piece {
    constructor(color) {
        super(2, 2, color);

        // [x][x]
        // [x][x]

        this.shape[0][0] = FILL_SYMBOL;
        this.shape[0][1] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[1][1] = FILL_SYMBOL;
    }

    rotate() {
        // Squares always same shape
    }
}

export class LargeBox extends Piece {
    constructor(color) {
        super(3, 3, color);

        // [x][x][x]
        // [x][x][x]
        // [x][x][x]

        this.shape[0][0] = FILL_SYMBOL;
        this.shape[0][1] = FILL_SYMBOL;
        this.shape[0][2] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[1][1] = FILL_SYMBOL;
        this.shape[1][2] = FILL_SYMBOL;
        this.shape[2][0] = FILL_SYMBOL;
        this.shape[2][1] = FILL_SYMBOL;
        this.shape[2][2] = FILL_SYMBOL;
    }

    rotate() {
        // Squares always same shape
    }
}

export class RightL extends Piece {
    constructor(color) {
        super(2, 3, color);

        // [x][ ]
        // [x][ ]
        // [x][x]

        this.shape[0][0] = FILL_SYMBOL;
        this.shape[1][0] = FILL_SYMBOL;
        this.shape[2][0] = FILL_SYMBOL;
        this.shape[2][1] = FILL_SYMBOL;
    }
}

export class LeftL extends Piece {
    constructor(color) {
        super(2, 3, color);

        // [ ][x]
        // [ ][x]
        // [x][x]

        this.shape[0][1] = FILL_SYMBOL;
        this.shape[1][1] = FILL_SYMBOL;
        this.shape[2][0] = FILL_SYMBOL;
        this.shape[2][1] = FILL_SYMBOL;
    }
}

export const Pieces = {
    Dot,
    SmallLine,
    MediumLine,
    LargeLine,
    GiantLine,
    SmallCorner,
    LargeCorner,
    SmallBox,
    LargeBox,
    RightL,
    LeftL
};
export function getRandomPiece(allowsRotate = true) {
    let pieces = Object.values(Pieces);
    let piece = new (pieces[Math.floor(Math.random() * pieces.length)]);
    let times = Math.floor(Math.random() * 4);

    piece.rotate(times);

    return piece;
}