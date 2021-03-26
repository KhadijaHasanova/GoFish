var fish, fishLeft, fishRight;
 
var ground, backgroundImg;
 
var shark, sharkImg, obstacleGroup;
 
var carrot, carrotImg, foodGroup;
 
var gameOver, gameOverImg;
 
var gameState = 0;
 
var score = 0;
 
var greyBar,scoreBar,scoreCarrot;

var easy, medium, hard;
 
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
 
 //load the image for game over
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
 gameOver.scale = 2;
 
 //create the grey bar
 greyBar = createSprite(250,550,300,20)
 greyBar.shapeColor = "grey";
 greyBar.depth = fish.depth - 1;

 //create the score bar
 scoreBar = createSprite(175,550,150,20)
 scoreBar.shapeColor = "darkorange";
 scoreBar.depth = fish.depth - 1;

 //create the score carrot
 scoreCarrot = createSprite(65,540);
 scoreCarrot.addImage(carrotImg);
 scoreCarrot.depth = fish.depth - 1;

 //create the obstacle  group
 obstacleGroup = new Group();
 
 //create the food group
 foodGroup = new Group();
}
 
function draw() {
  //set the background color
  background(0,0,0);

  //starting screen
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
  textSize(30);
  text("Use the arrow keys to move the fish",310,200);
  text("Dodge the sharks and eat the carrots",305,250);
  text("Don’t run out of energy",405,300);
  text("Click a level to start",430,350);

  //create the buttons for different levels
  easy = createButton("EASY");
  easy.position(200,500);

  medium = createButton("MEDIUM");
  medium.position(500,500);   
   
  hard = createButton("HARD");
  hard.position(800,500);

  //go to the easy level
  easy.mousePressed(()=>{
    console.log("easy");
    gameState = 1;
  });

  //go to the medium level
  medium.mousePressed(()=>{
    console.log("medium");
    gameState = 2;
  });

  //go to the hard level
  hard.mousePressed(()=>{
    console.log("hard");
    gameState = 3;
  })

  //make the fish, ground, and gameOverImg invisible
  fish.visible = false;
  ground.visible = false;
  gameOver.visible = false;
  scoreBar.visible = false;
  greyBar.visible = false;
  scoreCarrot.visible = false;
 }
 

 //easy level
 if(gameState === 1) {
  //reset the background
  ground.velocityX = -3;
  if(ground.x < 200) {
    ground.x = ground.width/2;
  }

  //make the sprites visible
  fish.visible = true;
  ground.visible = true;
  scoreBar.visible = true;
  greyBar.visible = true;
  scoreCarrot.visible = true;
  
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
  easySharks();

  //spawn the carrots
  easyCarrots();

  //make the carrots disappear
  if(foodGroup.isTouching(fish)) {
    //destroy the food as they are eaten
    foodGroup.destroyEach();

    //increase x position half of incresement of width
    scoreBar.x = scoreBar.x + 5;
    scoreBar.width = scoreBar.width + 10;
  }

  //decrease the score of the fish as time goes on
  if(frameCount % 200 === 0) {
    scoreBar.x = scoreBar.x - 5;
    scoreBar.width = scoreBar.width - 10;
  }

  //destroy the shark and decrease the energy level
  if(obstacleGroup.isTouching(fish)) {
    obstacleGroup.destroyEach();
    scoreBar.x = scoreBar.x - 10;
    scoreBar.width = scoreBar.width - 20;
  }

  //let the player win when the energy bar is full
  if(scoreBar.width >= 300) {
    gameState = 5;
  }

  //end the game when there is no energy left
  if(scoreBar.width <= 0) {
    gameState = 4;
  }
}


//medium level
if(gameState === 2) { 
  //reset the background
  ground.velocityX = -3;
  if(ground.x < 200) {
    ground.x = ground.width/2;
  }

  //make the sprites visible
  fish.visible = true;
  ground.visible = true;
  scoreBar.visible = true;
  greyBar.visible = true;
  scoreCarrot.visible = true;

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
  mediumSharks();

  //spawn the carrots
  mediumCarrots();

  //make the carrots disappear
  if(foodGroup.isTouching(fish)) {
    //destroy the food as they are eaten
    foodGroup.destroyEach();

    //increase x position half of incresement of width
    scoreBar.x = scoreBar.x + 5;
    scoreBar.width = scoreBar.width + 10;
  }

  //decrease the score of the fish as time goes on
  if(frameCount % 200 === 0) {
    scoreBar.x = scoreBar.x - 5;
    scoreBar.width = scoreBar.width - 10;
  }

  //destroy the shark and decrease the energy level
  if(obstacleGroup.isTouching(fish)) {
    obstacleGroup.destroyEach();
    scoreBar.x = scoreBar.x - 10;
    scoreBar.width = scoreBar.width - 20;
  }

  //let the player win when the energy bar is full
  if(scoreBar.width >= 300) {
    gameState = 5;
  }

  //end the game when there is no energy left
  if(scoreBar.width <= 0) {
    gameState = 4;
  }
}
 

//hard level
if(gameState === 3) { 
  //reset the background
  ground.velocityX = -3;
  if(ground.x < 200) {
    ground.x = ground.width/2;
  }

  //make the sprites visible
  fish.visible = true;
  ground.visible = true;
  scoreBar.visible = true;
  greyBar.visible = true;
  scoreCarrot.visible = true;

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
  hardSharks();

  //spawn the carrots
  hardCarrots();

  //make the carrots disappear
  if(foodGroup.isTouching(fish)) {
    //destroy the food as they are eaten
    foodGroup.destroyEach();

    //increase x position half of incresement of width
    scoreBar.x = scoreBar.x + 5;
    scoreBar.width = scoreBar.width + 10;
  }

  //decrease the score of the fish as time goes on
  if(frameCount % 200 === 0) {
    scoreBar.x = scoreBar.x - 5;
    scoreBar.width = scoreBar.width - 10;
  }

  //destroy the shark and decrease the energy level
  if(obstacleGroup.isTouching(fish)) {
    obstacleGroup.destroyEach();
    scoreBar.x = scoreBar.x - 10;
    scoreBar.width = scoreBar.width - 20;
  }

  //let the player win when the energy bar is full
  if(scoreBar.width >= 300) {
    gameState = 5;
  }

  //end the game when there is no energy left
  if(scoreBar.width <= 0) {
    gameState = 4;
  }
}


 //player lost
 if(gameState === 4) {
   //display the gameOverImg
   gameOver.visible = true;
 
   //make everything invisible
   fish.visible = false;
   ground.visible = false;
   scoreBar.visible = false;
   greyBar.visible = false;
   scoreCarrot.visible = false;
   obstacleGroup.destroyEach();
   foodGroup.destroyEach();

   //create the reset button
   //reset = createButton("RESET");
   //reset.position(400,400);
 }
 
 //player won
 if(gameState === 5) {
   //make everything invisible
   fish.visible = false;
   ground.visible = false;
   scoreBar.visible = false;
   greyBar.visible = false;
   scoreCarrot.visible = false;
   obstacleGroup.destroyEach();
   foodGroup.destroyEach();
 
   //display that the player won
   textSize(80);
   fill("pink");
   strokeWeight(4);
   stroke("blue");
   text("YOU WON!!!",400,300);
 }
 
 //draw the sprites
 drawSprites();
}
 
function easySharks() {
  if(frameCount % 300 === 0) {
    var randY = Math.round(random(80,520));
    shark = createSprite(1150,randY,200,200);
    shark.addImage(sharkImg);
    shark.scale = 0.8;
    shark.lifetime = 350;
  
    if(scoreBar.width <= 170) {
      shark.velocityX = -5;
    } else {
      shark.velocityX = -10;
    }
    obstacleGroup.add(shark);
  }
 }
  
 function easyCarrots() {
  if(frameCount % 200 === 0) {
    var randX = Math.round(random(50,1150));
    carrot = createSprite(randX,-20,200,200);
    carrot.addImage(carrotImg);
    carrot.velocityY = 3;
    carrot.lifetime = 250;
    foodGroup.add(carrot);
  }
 }


 function mediumSharks() {
  if(frameCount % 250 === 0) {
    var randY = Math.round(random(80,520));
    shark = createSprite(1150,randY,200,200);
    shark.addImage(sharkImg);
    shark.scale = 0.8;
    shark.lifetime = 350;
  
    if(scoreBar.width <= 170) {
      shark.velocityX = -6;
    } else {
      shark.velocityX = -12;
    }
    obstacleGroup.add(shark);
  }
 }
  
 function mediumCarrots() {
  if(frameCount % 200 === 0) {
    var randX = Math.round(random(50,1150));
    carrot = createSprite(randX,-20,200,200);
    carrot.addImage(carrotImg);
    carrot.velocityY = 4;
    carrot.lifetime = 250;
    foodGroup.add(carrot);
  }
 }


function hardSharks() {
  if(frameCount % 200 === 0) {
    var randY = Math.round(random(80,520));
    shark = createSprite(1150,randY,200,200);
    shark.addImage(sharkImg);
    shark.scale = 0.8;
    shark.lifetime = 350;
  
    if(scoreBar.width <= 170) {
      shark.velocityX = -7;
    } else {
      shark.velocityX = -14;
    }
    obstacleGroup.add(shark);
  }
 }
  
 function hardCarrots() {
  if(frameCount % 200 === 0) {
    var randX = Math.round(random(50,1150));
    carrot = createSprite(randX,-20,200,200);
    carrot.addImage(carrotImg);
    carrot.velocityY = 5;
    carrot.lifetime = 250;
    foodGroup.add(carrot);
  }
 }