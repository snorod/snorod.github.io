/**
 * Death Star Entity (NPC/Obstacle)
 */
game.DeathStarEntity = me.Entity.extend({
    init: function(x, y, settings) {
        me.Entity.prototype.init.apply(this, [x, y, settings]);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.alwaysUpdate = false;
        
        this.renderable.addAnimation("exist", [0]);
        this.renderable.setCurrentAnimation("exist");
        
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setVelocity(3.7, 0);
    },
    
    update: function(dt) {
        // Check if the active player is ducking
        var activePlayer = null;
        if (game.activeCharacter === "batman") {
            activePlayer = me.game.world.getChildByName("mainPlayer")[0];
        } else if (game.activeCharacter === "jinbe") {
            activePlayer = me.game.world.getChildByName("jinbe")[0];
        }
        
        var playerDucking = activePlayer && activePlayer.ducking;
        
        // Only move if player is not ducking
        if (!playerDucking) {
            if (me.input.isKeyPressed("left")) {
                this.body.vel.x -= this.body.accel.x * me.timer.tick;
            } else if (me.input.isKeyPressed("right")) {
                this.body.vel.x += this.body.accel.x * me.timer.tick;
            } else {
                this.body.vel.x = 0;
            }
        } else {
            this.body.vel.x = 0;
        }
        
        this.body.update(dt);
        me.collision.check(this);
        return me.Entity.prototype.update.apply(this, [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
    },
    
    onCollision: function(response, other) {
        return true;
    }
});

