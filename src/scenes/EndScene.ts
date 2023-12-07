import { Container, TextStyle, Text } from "pixi.js";
import { IScene, Manager } from "../Manager";

export class EndScene extends Container implements IScene {
  constructor(text: string) {
    super();
    const style = new TextStyle({
      fontFamily: "Futura",
      fontSize: 64,
      fill: "white",
    });
    const message = new Text(text, style);
    message.x = 120;
    message.y = Manager.height / 2 - 32;
    this.addChild(message);
  }

  public update() {}
}
