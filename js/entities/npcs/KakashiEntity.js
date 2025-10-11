/**
 * Kakashi Entity (NPC)
 */
game.KakashiEntity = me.Entity.extend({
    init: function(x, y, settings) {
        me.Entity.prototype.init.apply(this, [x, y, settings]);
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.body.setVelocity(0, 0);
        
        this.renderable.addAnimation("charge", [0, 0, 0, 1, 2, 3, 2, 3, 2, 1]);
        this.renderable.setCurrentAnimation("charge");
    },
    
    update: function(dt) {
        this.body.update(dt);
        me.collision.check(this);
        return me.Entity.prototype.update.apply(this, [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0;
    },
    
    onCollision: function(response, other) {
        return true;
    }
});

