export const FILL_SYMBOL = 'x';

const COLORS = [
    'blue',
    'green',
    'orange',
    'gray'
];
function generateColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

let currentId = 1;
function * generateId(initialValue) {
    while(true) {
        yield currentId++;
    }
}

let idGenerator = generateId();
function nextId() {
    return idGenerator.next().value;
}

// TODO: Refactor to use cells
// TODO: Refactor subclasses to do performance rotate
class Piece {
    constructor(width, height, color) {
        if( width < 1 ) {
            throw new Error('Piece must have a width greater than 0');
        }
        
        if( height < 1 ) {
            throw new Error('Piece must have a height greater than 0');
        }

        this.id = nextId();
        this.width = width;
        this.height = height;
        this.color = color ? color : generateColor();
        this.shape = [];

        for(let row = 0; row < this.height; row++ ) {
            this.shape.push([]);

            for(let col = 0; col < this.width; col++ ) {
                this.shape[row].push(' ');
            }
        }
    }

    isEmptyAt(position) {
        return this.shape[position.row][position.col] !== FILL_SYMBOL;
    }

    // Rotates clockwise
    rotate(times = 1) {
        times = Math.abs(times % 4);

        for(let i = 0; i < times; i++ ) {
            let width = this.height;
            let height = this.width;
            let shape = [];

            for(let row = 0; row < height; row++ ) {
                shape.push([]);

                for(let col = 0; col < width; col++ ) {
                    shape[row][col] = this.shape[this.height - col -1][row];
                }
            }

            this.width = width;
            this.height = height;
            this.shape = shape;
        }
    }

    toString() {
        let stringRep = '';
        for(let row = 0; row < this.height; row++ ) {
            for(let col = 0; col < this.width; col++ ) {
                stringRep += (this.shape[row][col] === FILL_SYMBOL ? FILL_SYMBOL : ' ');
            }

            stringRep += '\n';
        }

        return stringRep;
    }
}

export default Piece;
