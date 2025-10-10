/**
 * Main Game Object
 * Handles initialization and asset loading
 */
var game = {
    // Game data
    data: {
        score: 0
    },
    
    // Track which character is currently active
    activeCharacter: "batman",
    
    /**
     * Initialize the game
     */
    onload: function() {
        // Initialize video
        if (!me.video.init(640, 480, {
            wrapper: "screen",
            scale: "auto",
            scaleMethod: "flex-width"
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        
        // Enable debug panel if in debug mode
        if (me.game.HASH.debug === true) {
            window.onReady(function() {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }
        
        // Initialize audio
        me.audio.init("mp3,ogg");
        
        // Preload resources
        me.loader.preload(game.resources, this.loaded.bind(this));
        
        // Change to LOADING state
        me.state.change(me.state.LOADING);
    },
    
    /**
     * Called when all resources are loaded
     */
    loaded: function() {
        // Set initial active character
        game.activeCharacter = "batman";
        
        // Set up screens
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        
        // Register entities
        // Note: "mainPlayer" is used in the TMX map file for Batman
        me.pool.register("mainPlayer", game.BatmanEntity);
        me.pool.register("jinbe", game.JinbeEntity);
        me.pool.register("kakashi", game.KakashiEntity);
        me.pool.register("deathStar", game.DeathStarEntity);
        me.pool.register("techTower", game.TechTowerEntity);
        
        // Bind keyboard controls
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.J, "play_as_jinbe");
        me.input.bindKey(me.input.KEY.B, "play_as_batman");
        
        // Start the game
        me.state.change(me.state.PLAY);
    }
};

