import { Container, Sprite, DisplayObject } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Keyboard } from "../utils/Keyboard";

export class GameScene extends Container implements IScene {
    private door: Sprite;
    private dungeon: Sprite;
    private explorer: Sprite;
    private blobs: Sprite[];
    private treasure: Sprite;

    private explorerVelocityX: number;
    private explorerVelocityY: number;
    private blobVelocity: number[];

    constructor() {
        super();

        this.dungeon = Sprite.from("dungeon");
        this.addChild(this.dungeon)

        this.explorer = Sprite.from("explorer");
        this.explorer.x = 68;
	    this.explorer.y = Manager.height/2 - this.explorer.height / 2; 
        this.addChild(this.explorer)

        this.treasure = Sprite.from("treasure")
        this.treasure.x = Manager.width - this.treasure.width - 48;
        this.treasure.y = Manager.height / 2 - this.treasure.height / 2;
        this.addChild(this.treasure);

        this.door = Sprite.from("door")
        this.door.position.set(32, 0);
        this.addChild(this.door);

        //Make the blobs
        let numberOfBlobs = 6,
            spacing = 48,
            xOffset = 150,
            speed = 2,
            direction = 1;

        //An array to store all the blob monsters
        this.blobs = [];
        this.blobVelocity = [];

        //Make as many blobs as there are `numberOfBlobs`
        for (let i = 0; i < numberOfBlobs; i++) {

            //Make a blob
            const blob = Sprite.from("blob");

            //Space each blob horizontally according to the `spacing` value.
            //`xOffset` determines the point from the left of the screen
            //at which the first blob should be added
            const x = spacing * i + xOffset;

            //Give the blob a random y position
            const y = Math.floor(Math.random() * (Manager.height - blob.height + 1));

            //Set the blob's position
            blob.x = x;
            blob.y = y;

            //Set the blob's vertical velocity. `direction` will be either `1` or
            //`-1`. `1` means the enemy will move down and `-1` means the blob will
            //move up. Multiplying `direction` by `speed` determines the blob's
            //vertical direction
            this.blobVelocity.push(speed * direction);

            //Reverse the direction for the next blob
            direction *= -1;

            //Push the blob into the `blobs` array
            this.blobs.push(blob);

            //Add the blob to the `gameScene`
            this.addChild(blob);
        }

        this.explorerVelocityX = 0;
        this.explorerVelocityY = 0;

        new Keyboard();
        Keyboard.initialize();
    }
    public update(framesPassed: number): void {
        // animate blob
        for (let i = 0; i < this.blobs.length; i++) {
            this.blobs[i].y += this.blobVelocity[i]
            if (this.blobs[i].y > Manager.height - this.blobs[i].height) {
                this.blobs[i].y = Manager.height - this.blobs[i].height;
                this.blobVelocity[i] = -this.blobVelocity[i];
            }

            if (this.blobs[i].y < 0) {
                this.blobs[i].y = 0;
                this.blobVelocity[i] = -this.blobVelocity[i];
            }
            }

        // control explorer with keyboard
        this.explorer.x += this.explorerVelocityX
        this.explorer.y += this.explorerVelocityY
        if (this.explorer.x > Manager.width - this.explorer.width) {
            this.explorer.x = Manager.width - this.explorer.width;
        }
        if (this.explorer.y > Manager.height - this.explorer.height) {
            this.explorer.y = Manager.height - this.explorer.height;
        }
        if (this.explorer.x < 0) {
            this.explorer.x = 0;
        }
        if (this.explorer.y < 0) {
            this.explorer.y = 0;
        }

        if (Keyboard.state.get('ArrowRight')) {
            this.explorerVelocityX = 5
        }
        else if (Keyboard.state.get('ArrowLeft')) {
            this.explorerVelocityX = -5
        }
        else {
            this.explorerVelocityX = 0
        }
        if (Keyboard.state.get('ArrowUp')) {
            this.explorerVelocityY = -5
        }
        else if (Keyboard.state.get('ArrowDown')) {
            this.explorerVelocityY = 5
        }
        else {
            this.explorerVelocityY = 0
        }

        this.explorer.alpha = 1
        // check blob and player collision
        this.blobs.forEach(blob => {
            if (this.checkCollision(this.explorer, blob)) {
                this.explorer.alpha = 0.5;
            }
        })

    }

    private checkCollision(objA: DisplayObject, objB: DisplayObject): boolean {
    const a = objA.getBounds();
    const b = objB.getBounds();

    const rightmostLeft = a.left < b.left ? b.left : a.left;
    const leftmostRight = a.right > b.right ? b.right : a.right;

    if (leftmostRight <= rightmostLeft) {
        return false;
    }

    const bottommostTop = a.top < b.top ? b.top : a.top;
    const topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

    return topmostBottom > bottommostTop;
}
}