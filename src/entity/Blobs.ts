import { Container, Sprite } from "pixi.js";
import { Manager } from "../Manager";

export class Blobs extends Container {
  public sprites: Sprite[];
  private vx: number[];
  private vy: number[];

  private numberOfBlobs = 6;
  private spacing = 48;
  private xOffset = 150;
  private speed = 2;
  private direction = 1;

  constructor() {
    super();

    this.sprites = [];
    this.vx = [];
    this.vy = [];

    //Make as many blobs as there are `numberOfBlobs`
    for (let i = 0; i < this.numberOfBlobs; i++) {
      //Make a blob
      const sprite = Sprite.from("blob");

      //Space each blob horizontally according to the `spacing` value.
      //`xOffset` determines the point from the left of the screen
      //at which the first blob should be added
      const x = this.spacing * i + this.xOffset;

      //Give the blob a random y position
      const y = Math.floor(
        Math.random() * (Manager.height - sprite.height + 1),
      );

      //Set the blob's position
      sprite.x = x;
      sprite.y = y;

      //Set the blob's vertical velocity. `direction` will be either `1` or
      //`-1`. `1` means the enemy will move down and `-1` means the blob will
      //move up. Multiplying `direction` by `speed` determines the blob's
      //vertical direction
      this.vy.push(this.speed * this.direction);

      //Reverse the direction for the next blob
      this.direction *= -1;

      //Push the blob into the `blobs` array
      this.sprites.push(sprite);

      //Add the blob to the `gameScene`
      this.addChild(sprite);
    }
  }

  public update() {
    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].y += this.vy[i];
      if (this.sprites[i].y > Manager.height - this.sprites[i].height) {
        this.sprites[i].y = Manager.height - this.sprites[i].height;
        this.vy[i] = -this.vy[i];
      }

      if (this.sprites[i].y < 0) {
        this.sprites[i].y = 0;
        this.vy[i] = -this.vy[i];
      }
    }
  }
}
