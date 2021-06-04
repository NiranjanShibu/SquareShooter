var bg;
var square, squareIMG;
var bottomBlock, topBlock, leftBlock, rightBlock;
var gameState = 0;
var score = 0;
var triangleIMG1;
var triangleIMG2;
var triangleIMG3;
var triangleIMG4;
var lives = 1;
var enemyGroup, shotGroup, bulletGroup;
var shotIMG;
var bulletCount = 5;
var bulletIconIMG, bulletIMG;

function preload() {
  
  bg = loadImage("GradientBG.jpg");
  squareIMG = loadImage("Square.png");
  triangleIMG1 = loadImage("TriangleD.png");
  triangleIMG2 = loadImage("TriangleL.png");
  triangleIMG3 = loadImage("TriangleU.png");
  triangleIMG4 = loadImage("TriangleR.png");
  bulletIconIMG = loadImage("bulletIcon.png");
  bulletIMG = loadImage("bullet.png");
  shotIMG = loadImage("circleBullet.png");

}

function setup() {
  createCanvas(1000, 560);

  square = createSprite(500, 300, 60, 50);
  square.addImage(squareIMG);
  square.scale = 0.0085;

  topBlock = createSprite(500, -1, 1020, 20);
  bottomBlock = createSprite(500, 565, 1020, 20);
  leftBlock = createSprite(-1, 310, 20, 640);
  rightBlock = createSprite(1001, 310, 20, 640);

  topBlock.visible = false;
  bottomBlock.visible = false;
  leftBlock.visible = false;
  rightBlock.visible = false;

  bulletGroup = new Group();
  enemyGroup = new Group();
  shotGroup = new Group();
}

function draw() {
  background(bg);

  image(bulletIconIMG, 20, 20, 40, 40);
  textSize(30);
  fill("black");
  text(bulletCount, 65, 50);

  if(lives === 0){
    gameState = 1;
    square.destroy();
    shotGroup.destroyEach();

    textFont("impact");
    textSize(45);
    fill("black");
    text("GAME OVER", 400, 270);
    textSize(30);
    text("Score: " + score, 438, 300);
    textSize(13);
    text("Press 'R' to restart!", 450, 330);
  }

  if(keyDown("r") && gameState == 1){
    location.reload();
  }

  if(keyDown("right") || keyDown("d")){
    square.x = square.x + 5.7;
  }
  if(keyDown("left") || keyDown("a")){
    square.x = square.x - 5.7;
  }

  if(keyDown("up") || keyDown("w")){
    square.y = square.y - 5.7;
  }
  if(keyDown("down") || keyDown("s")){
    square.y = square.y + 5.7;
  }

  if(square.isTouching(topBlock)){
    square.y = square.y+10;
  }
  if(square.isTouching(bottomBlock)){
    square.y = square.y-10;
  }
  if(square.isTouching(leftBlock)){
    square.x = square.x+10;
  }
  if(square.isTouching(rightBlock)){
    square.x = square.x-10;
  }

  textSize(18);
  textFont("Arial");
  text("Space to shoot and earn points. Earn as much as possible before losing.", 207.8, 45);

  drawSprites();
  spawnTriangles();
  spawnBullet();
  shoot();

  if(enemyGroup.isTouching(square)){
    lives = 0;
  }

  for (var i = 0; i < enemyGroup.length; i++) {
    if (enemyGroup.get(i).isTouching(shotGroup) && gameState === 0) {
      enemyGroup.get(i).destroy();     
      score += 10;
    }
  }

  for (var i = 0; i < bulletGroup.length; i++) {
    if (bulletGroup.get(i).isTouching(square)) {
      bulletGroup.get(i).destroy();     
      bulletCount += 3;
    }
  }

  fill("black");
  textSize(30);
  text(score, 925, 40);

}

  function spawnTriangles(){
  
    if(frameCount%11 === 0 && gameState === 0){
    var dir = Math.round(random(1,4));
    var triangle = createSprite(615, -15, 20, 20);
    triangle.lifetime = 190;
    triangle.scale = 0.05;
    triangle.addImage(triangleIMG1);

    enemyGroup.add(triangle);
    if(dir == 1){
      triangle.velocityY = 5.6;
      triangle.y = -15;
      triangle.x = Math.round(random(40, 960));
      triangle.addImage(triangleIMG1);
    }
    if(dir == 2){
      triangle.velocityX = -5.6;
      triangle.y = Math.round(random(40, 520));
      triangle.x = 1015;
      triangle.addImage(triangleIMG2);
    }
    if(dir == 3){
      triangle.velocityY = -5.6;
      triangle.y = 580;
      triangle.x = Math.round(random(40, 960));
      triangle.addImage(triangleIMG3);
    }
    if(dir == 4){
      triangle.velocityX = 5.6;
      triangle.y = Math.round(random(40, 520));
      triangle.x = -15;
      triangle.addImage(triangleIMG4);
    }
      
  }  
  }
  
  function shoot(){
    if(keyWentDown("space") && bulletCount > 0 && gameState === 0){
      var shot1 = createSprite(square.x, square.y, 20, 20);
      shot1.addImage(shotIMG);
      shot1.scale = 0.05;
      shot1.velocityX = 9;
      shot1.lifetime = 185;
      shotGroup.add(shot1);

      var shot2 = createSprite(square.x, square.y, 20, 20);
      shot2.addImage(shotIMG);
      shot2.scale = 0.05;
      shot2.velocityX = -9;
      shot2.lifetime = 185;
      shotGroup.add(shot2);

      var shot3 = createSprite(square.x, square.y, 20, 20);
      shot3.addImage(shotIMG);
      shot3.scale = 0.05;
      shot3.velocityY = 9;
      shot3.lifetime = 185;
      shotGroup.add(shot3);

      var shot4 = createSprite(square.x, square.y, 20, 20);
      shot4.addImage(shotIMG);
      shot4.scale = 0.05;
      shot4.velocityY = -9;
      shot4.lifetime = 185;
      shotGroup.add(shot4);

      bulletCount -= 1;
    }
  }

  function spawnBullet(){
    if(frameCount%225 === 0 && gameState === 0){
      var bullet = createSprite(615, 50, 20, 20);
      bullet.lifetime = 500;
      bullet.scale = 0.16;
      bullet.addImage(bulletIMG);  
      bulletGroup.add(bullet);
      bullet.x = Math.round(random(40, 960));
      bullet.y = Math.round(random(40, 520));
    }
  }