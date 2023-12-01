import type { ResolverManifest } from "pixi.js";

export const manifest:ResolverManifest = {
    bundles: [
        {
            name: "treasureHunter",
            assets:
            {
                "door": "images/door.png",
                "dungeon": "images/dungeon.png",
                "explorer": "images/explorer.png",
                "blob": "images/blob.png",
                "treasure": "images/treasure.png"
            }
        }

    ]
}