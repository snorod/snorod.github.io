/**
 * Jinbe Entity (Playable Character)
 * Registered as "jinbe" in the game
 */
game.JinbeEntity = me.Entity.extend({
    init: function(x, y, settings) {
        me.Entity.prototype.init.apply(this, [x, y, settings]);
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.body.setVelocity(0, 0);
        this.alwaysUpdate = true;
        
        // Define animations
        this.renderable.addAnimation("walk", [4, 5, 6, 7, 8, 9, 10, 11]);
        this.renderable.addAnimation("vibe", [0, 0, 1, 1, 2, 2, 3, 3]);
        this.renderable.addAnimation("out", [0, 0, 1, 1, 2, 2, 3, 3]);
        this.renderable.addAnimation("jump", [12, 13, 14, 15, 16, 17, 18]);
        
        this.renderable.setCurrentAnimation("out");
    },
    
    update: function(dt) {
        // When inactive, check for activation
        if (this.renderable.isCurrentAnimation("out")) {
            if (me.input.isKeyPressed("play_as_jinbe")) {
                game.activeCharacter = "jinbe";
                me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
                this.body.setVelocity(3.8, 12);
                this.renderable.setCurrentAnimation("vibe");
                this.body.collisionType = me.collision.types.PLAYER_OBJECT;
                return true;
            }
            this.body.update(dt);
            me.collision.check(this);
            me.Entity.prototype.update.apply(this, [dt]);
            return true;
        }
        
        // Check if another character was activated
        if (game.activeCharacter !== "jinbe") {
            this.body.collisionType = me.collision.types.NO_OBJECT;
            this.body.setVelocity(0, 0);
            this.body.vel.x = 0;
            this.body.vel.y = 0;
            this.renderable.setCurrentAnimation("out");
            return true;
        }
        
        // Handle movement
        if (me.input.isKeyPressed("left") && !this.renderable.isCurrentAnimation("out")) {
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
            if (!this.renderable.isCurrentAnimation("out") && !this.renderable.isCurrentAnimation("vibe") && !this.body.jumping && !this.body.falling) {
                this.renderable.setCurrentAnimation("vibe");
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
        return this.body.vel.x !== 0 || this.body.vel.y !== 0;
    },
    
    onCollision: function(response, other) {
        return true;
    }
});

