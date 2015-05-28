;(function() {
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  GameView.prototype.start = function() {
    window.setInterval(this.game.step.bind(this.game), 20);
    window.setInterval(function(){
      this.game.draw(this.ctx)
    }.bind(this), 20);

    key('up', function() { this.game.ship.thrust(-1) }.bind(this));
    key('left', function() {
      this.game.ship.turn(0.3);
      console.log(this.game.ship.facing);
    }.bind(this));
    key('down', function() { this.game.ship.thrust(1) }.bind(this));
    key('right', function() {
      this.game.ship.turn(-0.3);
      console.log(this.game.ship.facing);
    }.bind(this));

    key('space', function(){
      if (game.bullets.length < Asteroids.Game.MAX_BULLETS){
        bullet = new Asteroids.Bullet(this.game);
        this.game.bullets.push(bullet);
      }
    }.bind(this));

    key('1', function() { console.log(this.game.ship.pos) }.bind(this));
    key('2', function() { console.log(this.game.ship.facing) }.bind(this));
  }

})();
