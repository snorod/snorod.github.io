/**
 * Batman Entity (Playable Character)
 * Registered as "mainPlayer" in the game
 */
game.BatmanEntity = me.Entity.extend({
    init: function(x, y, settings) {
        settings.alwaysUpdate = true;
        me.Entity.prototype.init.apply(this, [x, y, settings]);
        this.alwaysUpdate = true;
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.body.setVelocity(4, 15);
        this.body.jumping = false;
        this.body.falling = false;
        
        // Define animations
        this.renderable.addAnimation("walk", [18, 19, 22, 23, 21, 20, 16, 17]);
        this.renderable.addAnimation("stand", [1, 2, 3, 2, 1], 200);
        this.renderable.addAnimation("out", [1, 2, 3, 2, 1], 200);
        this.renderable.addAnimation("jump", [29]);
        
        this.renderable.setCurrentAnimation("stand");
    },
    
    update: function(dt) {
        var isOut = this.renderable.isCurrentAnimation("out");
        
        // When inactive, check for reactivation
        if (isOut) {
            if (me.input.isKeyPressed("play_as_batman")) {
                game.activeCharacter = "batman";
                me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
                this.body.setVelocity(4, 15);
                this.body.jumping = false;
                this.body.falling = false;
                this.renderable.setCurrentAnimation("stand");
                this.body.collisionType = me.collision.types.PLAYER_OBJECT;
                return true;
            }
            this.body.update(dt);
            me.collision.check(this);
            me.Entity.prototype.update.apply(this, [dt]);
            return true;
        }
        
        // Check if another character was activated
        if (game.activeCharacter !== "batman") {
            this.body.collisionType = me.collision.types.NO_OBJECT;
            this.body.setVelocity(0, 0);
            this.body.vel.x = 0;
            this.body.vel.y = 0;
            this.body.jumping = false;
            this.body.falling = false;
            this.renderable.setCurrentAnimation("out");
            return true;
        }
        
        // Handle movement
        if (me.input.isKeyPressed("left") && !isOut) {
            this.renderable.flipX(true);
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("walk") && !this.body.jumping && !this.body.falling) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (me.input.isKeyPressed("right") && !this.renderable.isCurrentAnimation("out")) {
            this.renderable.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("walk") && !this.body.jumping && !this.body.falling) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.body.vel.x = 0;
            if (!this.renderable.isCurrentAnimation("out") && !this.renderable.isCurrentAnimation("stand") && !this.body.jumping && !this.body.falling) {
                this.renderable.setCurrentAnimation("stand");
            }
        }
        
        // Handle jumping
        if (me.input.isKeyPressed("jump") && !this.renderable.isCurrentAnimation("out")) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                if (!this.renderable.isCurrentAnimation("jump")) {
                    this.renderable.setCurrentAnimation("jump");
                }
                this.body.jumping = true;
            }
        }
        
        this.body.update(dt);
        me.collision.check(this);
        me.Entity.prototype.update.apply(this, [dt]);
        return true;
    },
    
    onCollision: function(response, other) {
        return true;
    }
});

