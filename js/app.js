// blocks and canvas size
var blockWidth = 101;
var blockHeight = 83;
var canvasWidth = blockWidth * 4;
var canvasHeight = blockHeight * 4;

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = Math.random() * -2000;
  this.y = (Math.floor(Math.random() * 3) + 1) * blockHeight - 20; // make sure the enemies walk in each row
  this.speedArray = [200, 400, 700];
  this.speed = this.speedArray[Math.floor(Math.random() * 3)];
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // run
  this.x += dt * this.speed;

  // re position when exceeds the canvas width
  if (this.x > canvasWidth + blockWidth) this.x = Math.random() * -2000;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.startPosX = 202;
  this.startPosY = 405;
  this.x = this.startPosX;
  this.y = this.startPosY;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.backToStartPos = function() {
  this.x = this.startPosX;
  this.y = this.startPosY;
};

Player.prototype.handleInput = function(keyCode) {
  switch (keyCode) {
    case 'left':
      if (this.x > 0) {
        this.x -= blockWidth;
      }
      break;
    case 'right':
      if (this.x < canvasWidth) {
        this.x += blockWidth;
      }
      break;
    case 'up':
      if (this.y > 0) {
        this.y -= blockHeight;
      }
      break;
    case 'down':
      if (this.y < canvasHeight) {
        this.y += blockHeight;
      }
      break;
    default:
  }
};

Player.prototype.update = function() {
  this.y < 0 && this.backToStartPos();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy(),
  new Enemy()
];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// check Collision
function checkCollisions() {
  allEnemies.forEach(function(enemy) {
    // console.log('enemy', enemy);
    var enemyWidth = 0.8 * blockWidth;
    var xColli =
      (enemy.x + enemyWidth > player.x && enemy.x < player.x + enemyWidth) ||
      (enemy.x < player.x && player.x < enemy.x + enemyWidth);
    var yColli = enemy.y + 10 == player.y;
    if (xColli && yColli) {
      player.backToStartPos();
    }
  });
}
