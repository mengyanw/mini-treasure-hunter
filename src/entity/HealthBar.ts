import { Container, Sprite, Graphics } from "pixi.js";
import { Manager } from "../Manager";

export class HealthBar extends Container {
  private bar: Container;
  private border: Sprite;
  private fill: Graphics;

  private readonly fillColor: number = 0xb0242a;

  private readonly barScale = 1.5;

  public points: number;
  private readonly maxPoints: number = 100;

  constructor() {
    super();

    this.border = Sprite.from("healthBar");

    this.border.scale.x = this.barScale;
    this.border.scale.y = this.barScale;

    const pw = this.border.width;
    const ph = this.border.height;

    this.fill = new Graphics();
    this.fill.beginFill(this.fillColor, 1);
    this.fill.drawRect(0, 0, pw * 0.9, ph * 0.46);
    this.fill.endFill();

    this.fill.x = pw * 0.1;
    this.fill.y = ph * 0.27;
    this.fill.scale.x = 1;

    this.bar = new Container();
    this.bar.addChild(this.fill);
    this.bar.addChild(this.border);
    this.bar.addChild(this.border);
    this.bar.x = Manager.width - this.bar.width * 1.25;
    this.bar.y = Manager.height * 0.0;
    this.addChild(this.bar);

    this.points = 100;
  }

  public isEmpty(): boolean {
    return this.points === 1;
  }

  public removePoint(): void {
    console.log("hit", this.points);
    if (this.points > 0) {
      this.points--;
    }
    console.log(this.points);
    this.updateBar();
  }

  private updateBar(): void {
    this.fill.scale.x = this.points / this.maxPoints;
  }
}
