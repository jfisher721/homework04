Ten Ten the Library
===================

A library for playing the game Ten Ten. Just add water (and a UI).

## Usage
To use this library, just import and instantiate a Game instance.

```javascript
import { Game, Position } from 'ten-ten';

let game = new Game();
let currentPieces = game.playerHand.getPieces();

game.playField.toString();
game.placePiece(currentPieces[0], new Position(0, 0));

game.playField.toString();
```