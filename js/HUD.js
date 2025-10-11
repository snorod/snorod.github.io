/**
 * HUD (Heads-Up Display)
 * Contains score and other UI elements
 */
game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({
    init: function() {
        me.Container.prototype.init.apply(this);
        this.isPersistent = true;
        this.floating = true;
        this.name = "HUD";
        this.addChild(new game.HUD.ScoreItem(5, 5));
    }
});

game.HUD.ScoreItem = me.Renderable.extend({
    init: function(x, y) {
        me.Renderable.prototype.init.apply(this, [x, y, 10, 10]);
        this.score = -1;
    },
    
    update: function() {
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            return true;
        }
        return false;
    },
    
    draw: function(renderer) {
        // TODO: Implement score drawing
    }
});

