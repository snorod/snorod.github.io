/**
 * Play Screen
 * Main game screen where gameplay happens
 */
game.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        // Load the level
        me.levelDirector.loadLevel("area03");
        game.data.score = 0;
        
        // Add HUD
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
        
        // Set viewport to follow Batman at startup
        setTimeout(function() {
            var batman = me.game.world.getChildByName("mainPlayer")[0];
            if (batman) {
                me.game.viewport.follow(batman.pos, me.game.viewport.AXIS.BOTH);
            }
        }, 100);
    },
    
    onDestroyEvent: function() {
        me.game.world.removeChild(this.HUD);
    }
});

