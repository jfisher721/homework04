import Cell from './cell';

class PlayField {
    constructor(size) {
        this.size = size;
        this.grid = [];
        
        for(let row = 0; row < size; row++ ) {
            this.grid[row] = [];
            
            for(let col = 0; col < size; col++ ) {
                this.grid[row].push(new Cell(true));
            }
        }
    }

    getSize() {
        return this.size;
    }

    getCellAt(position) {
        return this.grid[position.row][position.col];
    }

    isEmptyAt(position) {
        return this.grid[position.row][position.col].isEmpty;
    }

    setCell(position, cell) {
        if( !(cell instanceof(Cell)) ) {
            throw new Error('Cannot set cell to value that is not an instance of Cell');
        }
        
        this.grid[position.row][position.col] = cell;
    }

    clearCell(position) {
        this.grid[position.row][position.col].isEmpty = true;
    }

    toString() {
        let stringRep = '';

        for( let row = 0; row < this.size; row++ ) {
            for( let col = 0; col < this.size; col++ ) {
                stringRep += (this.grid[row][col].isEmpty ? '+' : 'x');
            }
            stringRep += '\n';
        }

        return stringRep;
    }
}

export default PlayField;