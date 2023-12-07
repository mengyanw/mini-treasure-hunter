import { Container, Sprite, DisplayObject } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Keyboard } from "../utils/Keyboard";
import { HealthBar } from "../entity/HealthBar";
import { Explorer } from "../entity/Explorer";
import { Blobs } from "../entity/Blobs";
import { EndScene } from "./EndScene";

export class GameScene extends Container implements IScene {
  private door: Sprite;
  private dungeon: Sprite;
  private treasure: Sprite;

  private explorer: Explorer;
  private blobs: Blobs;
  private healthBar: HealthBar;

  constructor() {
    super();

    this.dungeon = Sprite.from("dungeon");
    this.addChild(this.dungeon);

    this.treasure = Sprite.from("treasure");
    this.treasure.x = Manager.width - this.treasure.width - 48;
    this.treasure.y = Manager.height / 2 - this.treasure.height / 2;
    this.addChild(this.treasure);

    this.door = Sprite.from("door");
    this.door.position.set(32, 0);
    this.addChild(this.door);

    this.explorer = new Explorer();
    this.addChild(this.explorer);

    this.blobs = new Blobs();
    this.addChild(this.blobs);

    this.healthBar = new HealthBar();
    this.addChild(this.healthBar);

    new Keyboard();
    Keyboard.initialize();
  }

  public update(framesPassed: number): void {
    this.blobs.update();

    this.explorer.update();

    this.explorer.alpha = 1;
    this.blobs.sprites.forEach((blob) => {
      if (this.checkCollision(this.explorer.sprite, blob)) {
        this.explorer.alpha = 0.5;
        blob.alpha = 0.5;
        this.healthBar.removePoint();
      } else {
        blob.alpha = 1;
      }
    });

    if (this.checkCollision(this.explorer, this.treasure)) {
      this.treasure.x = this.explorer.sprite.x + 8;
      this.treasure.y = this.explorer.sprite.y + 8;
    }

    if (this.checkCollision(this.treasure, this.door)) {
      Manager.changeScene(new EndScene("You won!"));
    }

    if (this.healthBar.points == 0) {
      Manager.changeScene(new EndScene("You lost!"));
    }
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
