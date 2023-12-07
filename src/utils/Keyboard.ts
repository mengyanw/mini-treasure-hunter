export class Keyboard {
  public static state: Map<string, boolean>;
  public static initialize() {
    // The `.bind(this)` here isn't necesary as these functions won't use `this`!
    this.state = new Map();
    document.addEventListener("keydown", Keyboard.keyDown);
    document.addEventListener("keyup", Keyboard.keyUp);
  }
  private static keyDown(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, true);
  }
  private static keyUp(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, false);
  }
}
