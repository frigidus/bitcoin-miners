// BITCOIN HUNTERS
// made by frigidus mini games

var gameState = {};
var score = 0;
var speed = 1;
var scoreup = 0;
var minercost = 9;
var upgradecost = 9;
var adder = 1;

function preload() {
  this.load.image('player', 'player.png');
  this.load.image('playerbig', 'playerbig.png');
  this.load.image('coin', 'coin.png');
  this.load.image('background', 'background.png');
  this.load.audio('coinsound', 'coin.mp3');
}

function create() {
  // game stuff
  gameState.background = this.add.image(0, -15, 'background');
  gameState.cursors = this.input.keyboard.createCursorKeys();
  gameState.player = this.add.sprite(40, 70, 'player');
  gameState.coin = this.add.sprite(Math.floor(Math.random() * 301), Math.floor(Math.random() * 276), 'coin');
  gameState.coinsound = this.sound.add('coinsound');

  // menu
  gameState.menu = this.add.rectangle(150, 360, 300, 120, 0xdda0dd);
  gameState.score = this.add.text(20, 317, 'Score: 0');

  // miner button
  gameState.minerButton = this.add.rectangle(210, 325, 150, 25, 0x000000);
  gameState.minerButtonText = this.add.text(143, 319, 'Buy Miner (10 Coins)', { fontSize: 11 });
  gameState.minerButton.setInteractive();

  // upgrade button
  gameState.upgradeButton = this.add.rectangle(210, 360, 150, 25, 0x000000);
  gameState.upgradeButtonText = this.add.text(144, 355, 'Buy Upgrade (10 Coins)', { fontSize: 10 });
  gameState.upgradeButton.setInteractive();

  // get bigger
  gameState.bigButton = this.add.rectangle(210, 395, 150, 25, 0x000000);
  gameState.bigButtonText = this.add.text(145, 389, 'Get Big (1000 Coins)', { fontSize: 11 });
  gameState.bigButton.setInteractive();

  // title screen
  gameState.titleScreen = this.add.rectangle(150, 210, 300, 420, 0xdda0dd);
  gameState.title = this.add.text(45, 60, 'Bitcoin\nHunters', { fontSize: 50 });
  gameState.desc = this.add.text(32, 390, 'made by frigidus mini games', { fontSize: 15 });
  gameState.playButton = this.add.rectangle(150, 200, 150, 50, 0x000000);
  gameState.playButtonText = this.add.text(110, 185, 'Play', { fontSize: 30 });
  gameState.playButton.setInteractive();

  // physics so we can use collisions
  this.physics.add.existing(gameState.player);
  this.physics.add.existing(gameState.coin);

  // when player collides with coin, the handleCollision function gets triggered
  this.physics.add.collider(gameState.player, gameState.coin, handleCollision, null, this);

  // title screen remover
  gameState.playButton.on('pointerup', function () {
    gameState.titleScreen.destroy();
    gameState.title.destroy();
    gameState.desc.destroy();
    gameState.playButton.destroy();
    gameState.playButtonText.destroy();
  })

  // miner button handler
  gameState.minerButton.on('pointerup', function () {
    if (score > minercost) {
      score -= (minercost + 1);
      gameState.score.text = 'Score: ' + score;
      scoreup += 1;
      minercost += 10;
      gameState.minerButtonText.text = 'Buy Miner (' + (minercost + 1) + ' Coins)';
    } else {
      alert("You need more coins!")
    }
  })

  // upgrade button handler
  gameState.upgradeButton.on('pointerup', function () {
    if (score > upgradecost) {
      score -= (upgradecost + 1);
      gameState.score.text = 'Score: ' + score;
      upgradecost += 10;
      adder += 1;
      gameState.upgradeButtonText.text = 'Buy Upgrade (' + (upgradecost + 1) + ' Coins)';
    } else {
      alert("You need more coins!")
    }
  })

  // big button handler
  gameState.bigButton.on('pointerup', function () {
    if (score > 999) {
      score -= 1000;
      gameState.score.text = 'Score: ' + score;
      gameState.player.setTexture('playerbig');
      gameState.player.body.setSize(75, 75);
      gameState.player.body.setOffset(0, 0);
      gameState.bigButton.destroy();
      gameState.bigButtonText.destroy();
    } else {
      alert("You need more coins!")
    }
  })
}


// controls are here
function update() {
  if (gameState.cursors.down.isDown) {
    gameState.player.y += speed;
  }
  if (gameState.cursors.up.isDown) {
    gameState.player.y -= speed;
  }
  if (gameState.cursors.left.isDown) {
    gameState.player.x -= speed;
  }
  if (gameState.cursors.right.isDown) {
    gameState.player.x += speed;
  }
  if (gameState.cursors.space.isDown) {
    speed = 2;
  } else {
    speed = 1;
  }
}

// add points
function handleCollision() {
  gameState.coinsound.play();
  score += adder;
  gameState.score.text = 'Score: ' + score;
  moveCoin();
}

// move coin
function moveCoin() {
  gameState.coin.x = Math.floor(Math.random() * 301);
  gameState.coin.y = Math.floor(Math.random() * 276);
  // TODO: make it so that if the coin collides with the player it regenerates the coin position
}

// adder
setInterval(function () {
  score += scoreup;
  gameState.score.text = 'Score: ' + score;
}, 1000);

// config stuff
const config = {
  width: 300,
  height: 420,
  backgroundColor: 0xdda0dd,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  },
  parent: 'game'
};

const game = new Phaser.Game(config);