import { Application, Graphics } from 'pixi.js';

export class Hangman {
    private graphics: Graphics;
    private partIndex = -1;
    private parts: Array<() => void>;

    constructor(app: Application) {
        this.graphics = new Graphics();
        app.stage.addChild(this.graphics);

        this.parts = [
            // Gallows
            () => {
                this.graphics.moveTo(100, 400);
                this.graphics.lineTo(300, 400);
            },
            () => {
                this.graphics.moveTo(200, 400);
                this.graphics.lineTo(200, 100);
            },
            () => {
                this.graphics.moveTo(200, 100);
                this.graphics.lineTo(350, 100);
            },
            () => {
                this.graphics.moveTo(350, 100);
                this.graphics.lineTo(350, 150);
            },
            // Head
            () => {
                this.graphics.arc(350, 180, 30, 0, Math.PI * 2);
            },
            // Body
            () => {
                this.graphics.moveTo(350, 210);
                this.graphics.lineTo(350, 300);
            },
            // Arms
            () => {
                this.graphics.moveTo(350, 230);
                this.graphics.lineTo(300, 280);
            },
            () => {
                this.graphics.moveTo(350, 230);
                this.graphics.lineTo(400, 280);
            },
            // Legs
            () => {
                this.graphics.moveTo(350, 300);
                this.graphics.lineTo(300, 350);
            },
            () => {
                this.graphics.moveTo(350, 300);
                this.graphics.lineTo(400, 350);
            },
        ];
    }

    public addPart() {
        this.partIndex++;
        this.draw();
    }

    private draw() {
        this.graphics.clear();
        this.graphics.setStrokeStyle({ width: 4, color: 0xffffff });

        for (let i = 0; i <= this.partIndex && i < this.parts.length; i++) {
            this.graphics.beginPath();
            this.parts[i]();
            this.graphics.stroke();
        }
    }
}