var fish, fishLeft, fishRight;

var ground, backgroundImg;

var shark, sharkImg, obstacleGroup;

var carrot, carrotImg, foodGroup;

var gameOver, gameOverImg;

var gameState = 0;

function preload() {
  //load the animation for the fish
  fishRight = loadAnimation("images/right1.png","images/right2.png");
  fishLeft = loadAnimation("images/left1.png","images/left2.png");

  //load the background image
  backgroundImg = loadImage("images/water.png");

  //load the shark image
  sharkImg = loadImage("images/shark.png");

  //load the image for carrot
  carrotImg = loadImage("images/carrot.png");

  gameOverImg = loadImage("images/gameOver.png");
}

function setup() {
  //create the canvas
  createCanvas(1200,600);

  //set the background image
  ground = createSprite(600,300,200,200);
  ground.scale = 2.1;
  ground.addImage(backgroundImg);

  //create the fish and add the animations
  fish = createSprite(200,400);
  fish.addAnimation("fishRight",fishRight);
  fish.addAnimation("fishLeft",fishLeft);

  //create the gameOver sprite
  gameOver = createSprite(600,300);
  gameOver.addImage(gameOverImg);

  //create the obstacle  group
  obstacleGroup = new Group();

  //create the food group
  foodGroup = new Group();
}

function draw() {
  //set the background color
  background(0,0,0);

  if(gameState === 0) {
    //set the background color
    background(0,0,0);

    //display the game name
    strokeWeight(5);
    stroke("blue");
    textSize(80);
    fill("pink");
    text("Go Fish",420,100);

    //display the game information
    noStroke();
    textSize(40);
    text("Use the arrow keys to move the fish",245,200);
    text("Dodge the sharks and eat the carrots",235,290);
    text("Don’t run out of energy",370,380);
    text("Click space to start",400,470);

    //make the fish, ground, and gameOverImg invisible
    fish.visible = false;
    ground.visible = false;
    gameOver.visible = false;

    if(keyDown("space")) {
      gameState = 1;
      fish.visible = true;
      ground.visible = true;
    }
  }

  if(gameState === 1) {
    //reset the background
    ground.velocityX = -3;
    if(ground.x < 200) {
      ground.x = ground.width/2;
    }

    //move the fish with left arrow key and set the animation
    if(keyDown(LEFT_ARROW)) {
      fish.x = fish.x - 5;
      fish.changeAnimation("fishLeft",fishLeft);
    }

    //move the fish with the right arrow key and set the animation
    if(keyDown(RIGHT_ARROW)) {
      fish.x = fish.x + 5;
      fish.changeAnimation("fishRight",fishRight);
    }    
    
    //move the fish with up arrow key
    if(keyDown(UP_ARROW)) {
      fish.y = fish.y - 5;
    }

    //move the fish with the down arrow key
    if(keyDown(DOWN_ARROW)) {
      fish.y = fish.y + 5;
    }

    //spawn the sharks
    spawnSharks();

    //spawn the carrots
    spawnCarrots();

    //make the carrots disappear
    if(foodGroup.isTouching(fish)) {
      foodGroup.destroyEach();
    }

    //end the game
    if(obstacleGroup.isTouching(fish)) {
      gameState = 2;
    }
  }

  if(gameState === 2) {
    //display the gameOverImg
    gameOver.visible = true;

    //make everything invisible 
    fish.visible = false;
    ground.visible = false;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
  }

  //draw the sprites
  drawSprites();
}

function spawnSharks() {
  if(frameCount % 300 === 0) {
    var randY = Math.round(random(80,520));
    shark = createSprite(1150,randY,200,200);
    shark.addImage(sharkImg);
    shark.scale = 0.8;
    shark.velocityX = -5;
    shark.lifetime = 250;
    obstacleGroup.add(shark);
  }
}

function spawnCarrots() {
  if(frameCount % 100 === 0) {
    var randX = Math.round(random(50,1150));
    carrot = createSprite(randX,-20,200,200);
    carrot.addImage(carrotImg);
    carrot.velocityY = 3;
    carrot.lifetime = 200;
    foodGroup.add(carrot);
  }
}