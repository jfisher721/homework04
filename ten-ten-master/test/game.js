"use strict";

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const should = chai.should();
chai.use(sinonChai);

require('babel-register');
require('babel-polyfill');

const Game = require('../lib/game').default;

describe('Game', function() {
    let game;

    describe('api', function() {
        beforeEach(function() {
            game = new Game();
        });

        it('should have isGameOver()', function() {
            game.should.respondTo('isGameOver');
        });

        it('should respondTo on()', function() {
            game.should.respondTo('on');
        });
    });

    describe('behavior', function() {
        beforeEach(function() {
            game = new Game();
        });

        describe('when the game is over', function() {

            beforeEach(function() {
                game.playField = {
                    getSize: sinon.stub().returns(10),
                    isEmptyAt: sinon.stub().returns(true)
                };
                game.playerHand = {
                    getHandSize: sinon.stub().returns(0)
                };
            });

            it('should emit a "game-over" event', function() {
                let eventSpy = sinon.spy();
                game.on('game-over', eventSpy);

                game.checkEndGame();

                eventSpy.should.have.been.calledOnce;
            });
        })
    });
});