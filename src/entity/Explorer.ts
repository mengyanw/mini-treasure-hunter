import { Container, Sprite } from "pixi.js";
import { Manager } from "../Manager";
import { Keyboard } from "../utils/Keyboard";

export class Explorer extends Container {
  public sprite: Sprite;
  private vx: number;
  private vy: number;

  constructor() {
    super();
    this.sprite = Sprite.from("explorer");
    this.sprite.x = 68;
    this.sprite.y = Manager.height / 2 - this.sprite.height / 2;
    this.addChild(this.sprite);
    this.vx = 0;
    this.vy = 0;
  }

  public update() {
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;

    if (this.sprite.x > Manager.width - this.sprite.width) {
      this.sprite.x = Manager.width - this.sprite.width;
    }
    if (this.sprite.y > Manager.height - this.sprite.height) {
      this.sprite.y = Manager.height - this.sprite.height;
    }
    if (this.sprite.x < 0) {
      this.sprite.x = 0;
    }
    if (this.sprite.y < 0) {
      this.sprite.y = 0;
    }

    if (Keyboard.state.get("ArrowRight")) {
      this.vx = 5;
    } else if (Keyboard.state.get("ArrowLeft")) {
      this.vx = -5;
    } else {
      this.vx = 0;
    }
    if (Keyboard.state.get("ArrowUp")) {
      this.vy = -5;
    } else if (Keyboard.state.get("ArrowDown")) {
      this.vy = 5;
    } else {
      this.vy = 0;
    }
  }
}
