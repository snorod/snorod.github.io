# Game Code Structure

This directory contains all the JavaScript code for the game, organized into logical modules.

## Directory Structure

```
js/
├── lib/
│   └── melonjs.min.js          # melonJS game engine library
├── entities/
│   ├── playable/               # Playable character entities
│   │   ├── BatmanEntity.js     # Batman character (starts active)
│   │   └── JinbeEntity.js      # Jinbe character (starts inactive)
│   └── npcs/                   # Non-playable character entities
│       ├── KakashiEntity.js    # Kakashi NPC
│       ├── DeathStarEntity.js  # Death Star obstacle/NPC
│       └── TechTowerEntity.js  # Tech Tower building
├── screens/
│   ├── PlayScreen.js           # Main gameplay screen
│   └── TitleScreen.js          # Title/menu screen (empty for now)
├── game.js                     # Main game object (initialization, loading)
├── resources.js                # Game resource definitions (images, audio, maps)
├── HUD.js                      # Heads-up display (score, UI elements)
└── app.min.js                  # OLD monolithic file (kept for reference)
```

## Load Order

Files must be loaded in this specific order (see `index.html`):

1. **melonJS Library** - Core engine
2. **Resources** - Asset definitions
3. **Game Core** - Main game object and HUD
4. **Entities** - All game entities (playable and NPCs)
5. **Screens** - Game screens/states

## Key Concepts

### Playable Characters
- Both Batman and Jinbe are standalone playable entities
- `game.activeCharacter` flag tracks which character is currently active ("batman" or "jinbe")
- Press **B** to switch to Batman
- Press **J** to switch to Jinbe
- Inactive characters display their "out" animation and cannot be controlled
- Only the active character responds to movement/jump input

### Entity Registration
- Entities are registered with `me.pool.register(name, EntityClass)`
- The name must match what's used in the TMX map files
- Batman is registered as "mainPlayer" (used in area03.tmx)
- Jinbe is registered as "jinbe" (used in area03.tmx)

## Architecture Notes

This refactor separates:
- **Engine code** (melonJS) from **game code**
- **Playable characters** from **NPCs**
- **Game logic** from **resource definitions**
- **Individual entities** into their own files

This makes the codebase much easier to:
- Navigate and understand
- Debug and test
- Extend with new features
- Maintain over time

## Migration from app.min.js

The old `app.min.js` file contained:
- Lines 1-10120: melonJS engine → now in `lib/melonjs.min.js`
- Lines 10121-10154: Game object → now in `game.js`
- Lines 10156-10435: Resources → already in `resources.js`
- Lines 10436-10498: PlayerEntity (Batman) → now `entities/playable/BatmanEntity.js`
- Lines 10499-10552: JinbeEntity → now `entities/playable/JinbeEntity.js`
- Lines 10553-10568: KakashiEntity → now `entities/npcs/KakashiEntity.js`
- Lines 10569-10589: DeathStarEntity → now `entities/npcs/DeathStarEntity.js`
- Lines 10590-10619: TechTowerEntity → now `entities/npcs/TechTowerEntity.js`
- Lines 10604-10619: HUD → now in `HUD.js`
- Lines 10620-10632: PlayScreen → now `screens/PlayScreen.js`
- Lines 10633-10636: TitleScreen → now `screens/TitleScreen.js`

**The old `app.min.js` file is kept for reference but is no longer loaded by the game.**

## Important Notes

### Tileset Resources
When TMX map files reference external tilesets (like `city_bg_original.png`), those images must be explicitly included in `resources.js`. Even though the TMX file has relative paths to these images, melonJS requires them to be preloaded.

If you add a new tileset to a TMX file, make sure to add it to `resources.js`:
```javascript
{
    "name": "your_tileset_name",
    "type": "image",
    "src": "data/img/map/path/to/tileset.png"
}
```

