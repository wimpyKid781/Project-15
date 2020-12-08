var knife;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var knifeImage;
  var r;
  var monster, monsterI;
  var fruit1, fruit2, fruit3, fruit4, fruitI1, fruitI2, fruitI3, fruitI4;
  var gameOver, gameOverI;
  var fruitGroup, enemyGroup;
  var score = 0;
function preload() {
   knifeImage = loadImage("sword.png");
  fruitI1 = loadImage("fruit1.png");
  fruitI2 = loadImage("fruit2.png");
  fruitI3 = loadImage("fruit3.png");
  fruitI4 = loadImage("fruit4.png")
  monsterI = loadImage("alien1.png");
  gameOverI = loadImage("gameover.png");
}

function setup() {
  createCanvas(400,400);
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background(180);
  text("Score: " + score, 500, 50);
  if (gameState === PLAY) {

    knife.x = mouseX;
    knife.y = mouseY;
    
    fruits();
    enemy();
    
    if (fruitGroup.isTouching(knife)) {
      fruitGroup.destroyEach();
      score = score + 2
    }
      if (enemyGroup.isTouching(knife)) {
        gameState = END;
      }
    }
   else if (gameState === END) {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
     var gameOver = createSprite(200,200)
    gameOver.addImage("gameover",gameOverI)
    
    knife.x = 200;
    knife.y = 200;
     score=0;
  }
  
  drawSprites();
}

function fruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    r = Math.round(random(1, 4));
   if (r === 1) {
      fruit.addImage(fruitI1);
   }
  else if (r === 2) {
      fruit.addImage(fruitI2);
    } else if (r === 3) {
     fruit.addImage(fruitI3);
    } else if(r===4)  {
      fruit.addImage(fruitI4);
    }
    fruit.y = Math.round(random(50, 340))
    fruit.velocityX = -7
    fruit.lifetime = 100;
    fruitGroup.add(fruit);
  }
}

function enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20)
    monster.addImage("Moving", monsterI)
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -8;
    monster.lifetime = 50;
    enemyGroup.add(monster);
  }
}