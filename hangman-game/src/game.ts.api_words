import { Application, Text } from 'pixi.js';
import { Hangman } from './hangman';
import { RestartButton } from './restart-button';

export class Game {
    private app: Application;
    private word: string = '';
    private maskedWord: string[] = [];
    private text?: Text;
    private hangman: Hangman;
    private incorrectGuesses = 0;

    constructor(app: Application) {
        this.app = app;
        this.hangman = new Hangman(app);

        // Fetch a random word from the API
        fetch('https://random-word-api.herokuapp.com/word')
            .then(response => response.json())
            .then((data: string[]) => {
                this.word = data[0].toLowerCase();
                this.maskedWord = Array(this.word.length).fill('_');
                this.setupGame();
            });
    }

    private setupGame() {
        this.text = new Text({
            text: this.maskedWord.join(' '),
            style: {
                fontFamily: 'Arial',
                fontSize: 36,
                fill: 0xffffff,
                align: 'center',
            }
        });

        this.text.x = this.app.screen.width / 2;
        this.text.y = this.app.screen.height / 2;
        this.text.anchor.set(0.5);

        this.app.stage.addChild(this.text);

        window.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    private handleKeyPress(event: KeyboardEvent) {
        const letter = event.key.toLowerCase();
        console.log(`Key pressed: ${letter}`);
        console.log(`Word: ${this.word}`);

        if (this.word.includes(letter)) {
            console.log(`Correct guess: ${letter}`);
            for (let i = 0; i < this.word.length; i++) {
                if (this.word[i] === letter) {
                    this.maskedWord[i] = letter;
                }
            }
            this.text!.text = this.maskedWord.join(' ');
        } else {
            console.log(`Incorrect guess: ${letter}. Calling hangman.addPart()`);
            this.incorrectGuesses++;
            this.hangman.addPart();
        }
        console.log(`Incorrect guesses: ${this.incorrectGuesses}`);

        this.checkGameOver();
    }

    private checkGameOver() {
        if (this.incorrectGuesses === 10) {
            this.endGame(false);
        } else if (!this.maskedWord.includes('_')) {
            this.endGame(true);
        }
    }

    private endGame(isWinner: boolean) {
        console.log(`Game Over! isWinner: ${isWinner}, Incorrect Guesses: ${this.incorrectGuesses}`);
        window.removeEventListener('keydown', this.handleKeyPress.bind(this));

        const message = isWinner ? 'You win!' : `You lose! The word was ${this.word}`;

        const gameOverText = new Text({
            text: message,
            style: {
                fontFamily: 'Arial',
                fontSize: 48,
                fill: isWinner ? 'green' : 'red',
                align: 'center',
            }
        });

        gameOverText.x = this.app.screen.width / 2;
        gameOverText.y = this.app.screen.height / 2 - 100;
        gameOverText.anchor.set(0.5);

        this.app.stage.addChild(gameOverText);

        const restartButton = new RestartButton();
        restartButton.x = this.app.screen.width / 2 - restartButton.width / 2;
        restartButton.y = this.app.screen.height / 2 + 50;
        this.app.stage.addChild(restartButton);
    }
}