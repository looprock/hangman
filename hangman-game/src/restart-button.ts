import { Container, Graphics, Text } from 'pixi.js';

export class RestartButton extends Container {
    constructor() {
        super();

        const background = new Graphics();
        background.fill(0x00ff00).rect(0, 0, 200, 50);
        this.addChild(background);

        const text = new Text({
            text: 'Restart',
            style: {
                fill: 0xffffff,
                fontSize: 24,
            }
        });
        text.x = background.width / 2;
        text.y = background.height / 2;
        text.anchor.set(0.5);
        this.addChild(text);

        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on('pointerdown', this.onClick, this);
    }

    private onClick() {
        window.location.reload();
    }
}