;(function(){
  if (typeof Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function(){
    this.lives = Game.STARTING_LIVES;
    this.score = 0;
    this.asteroids = [];
    this.bullets = [];
    (function () {

      for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
        var pos = this.randomPosition();
        this.asteroids.push(new window.Asteroids.Asteroid(pos, this, 40));
      }

    }).call(this);

    this.ship = new window.Asteroids.Ship(this.randomPosition(), this);
  };

  Game.prototype.randomPosition = function() {
    return [
     Math.random() * (Game.DIM_X * 0.8) + (Game.DIM_X * 0.1),
     Math.random() * (Game.DIM_Y * 0.8) + (Game.DIM_Y * 0.1)
   ];
 };

  Game.NUM_ASTEROIDS = 3;
  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.MAX_BULLETS = 10;
  Game.STARTING_LIVES = 3;



  Game.prototype.draw = function (ctx) {
    $("#score").html(this.score);
    var lives = "";
    for (var life = 0; life < this.lives; life++){
      lives += "Δ "
    }
    $("#lives").html(lives);
    // movement

    window.game.ship.drag();
    if (Asteroids.leftPressed()){
      window.game.ship.turn(0.1);
    }
    if (Asteroids.rightPressed()){
      window.game.ship.turn(-0.1);
    }
    if (Asteroids.upPressed()){
      window.game.ship.thrust();
    }


    ctx.fillStyle = "#013";
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }
  };

  Game.prototype.moveObjects = function(){
    for (var i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].move();
    }
  };

  Game.prototype.checkCollisions = function() {
    var collidedPairs = [];

    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = 0; j < this.allObjects().length; j++) {
        if (i !== j &&  this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          collidedPairs.push([this.allObjects()[j], this.allObjects()[i]]);
        }
      }
    }

    for (var k = 0; k < collidedPairs.length; ++k){
      collidedPairs[k][0].collideWith(collidedPairs[k][1]);
    }
  };

  Game.prototype.remove = function (asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    if (index > -1){
      this.asteroids.splice(index, 1);
    }
  };

  Game.prototype.gameOver = function () {
    $("#game-over").removeClass("hidden");
    this.ship.pos = [Game.DIM_X / 2, Game.DIM_Y / 2];
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.wrap = function (pos, radius) {
    var wrappedPos = pos;

    if (pos[0] > Game.DIM_X) {
      wrappedPos[0] = 0;
    }
    if (pos[1] > Game.DIM_Y) {
      wrappedPos[1] = 0;
    }
    if (pos[0] < 0) {
      wrappedPos[0] = Game.DIM_X;
    }
    if (pos[1] < 0) {
      wrappedPos[1] = Game.DIM_Y;
    }

    return wrappedPos;
  };

})();
