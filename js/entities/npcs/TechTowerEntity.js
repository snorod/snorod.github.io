/**
 * Tech Tower Entity (NPC/Building)
 */
game.TechTowerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        me.Entity.prototype.init.apply(this, [x, y, settings]);
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.body.setVelocity(0, 0);
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

