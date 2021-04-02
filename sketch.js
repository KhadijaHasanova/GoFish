var fish, fishLeft, fishRight;
 
var ground, backgroundImg;
 
var shark, sharkImg, obstacleGroup;
 
var carrot, carrotImg, foodGroup;
 
var gameOver, gameOverImg;
 
var gameState = 0;
 
var score = 0;
 
var greyBar, scoreBar, scoreCarrot;

var easy, medium, hard;

var ateSound, hitSharkSound, gameOverSound, wonSound;

var reset;

var edges;
 
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

 //load the sound for eating food
 ateSound = loadSound("sounds/ateFoodSound.wav");

 //load the sound for hitting the shark
 hitSharkSound = loadSound("sounds/hitShark.wav");

 //load the sound for gameOver
 gameOverSound = loadSound("sounds/gameOverSound.wav");

 //load the sonud for winning
 wonSound = loadSound("sounds/wonSound.wav");
}
 
function setup() {
 //create the canvas
 createCanvas(windowWidth,windowHeight);
 
 //set the background image
 ground = createSprite(width,height-500,200,200);
 ground.scale = 3.5;
 ground.addImage(backgroundImg);
 
 //create the fish and add the animations
 fish = createSprite(200,400);
 fish.addAnimation("fishRight",fishRight);
 fish.addAnimation("fishLeft",fishLeft);
 
 //create the gameOver sprite
 gameOver = createSprite(width/2-0,height/2-150);
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

 //add color to the buttons
 let color1 = color(17, 255, 0);
 let color2 = color(209, 209, 0);
 let color3 = color(255, 13, 0);
 let color4 = color(255, 73, 56);

 //create the button for the easy level
 easy = createButton("EASY");
 easy.position(width/2-300,height/2-50);
 easy.style('background-color', color1);
 easy.style('font-size', '40px');
 easy.style('font-family', 'Architects Daughter');
 easy.style('border-radius','40px');
 easy.style('border-width','10px');
 easy.style('border-color','white');
 easy.style('border-style','outset double outset double');

 //create the button for the medium level
 medium = createButton("MEDIUM");
 medium.position(width/2-70,height/2-50);   
 medium.style('background-color', color2);
 medium.style('font-size', '40px');
 medium.style('font-family', 'Architects Daughter');
 medium.style('border-radius','40px');
 medium.style('border-width','10px');
 medium.style('border-color','white');
 medium.style('border-style','outset double outset double');

 //create the button for the hard level
 hard = createButton("HARD");
 hard.position(width/2+200,height/2-50);
 hard.style('background-color', color3);
 hard.style('font-size', '40px');
 hard.style('font-family', 'Architects Daughter');
 hard.style('border-radius','40px');
 hard.style('border-width','10px');
 hard.style('border-color','white');
 hard.style('border-style','outset double outset double');

 //create the reset button
 reset = createButton("RESET");
 reset.position(width/2-70,height/2);
 reset.style('background-color', color4);
 reset.style('font-size', '40px');
 reset.style('font-family', 'Architects Daughter');
 reset.style('border-radius','40px');
 reset.style('border-width','10px');
 reset.style('border-color','white');
 reset.style('border-style','outset double outset double');

 //create the obstacle  group
 obstacleGroup = new Group();
 
 //create the food group
 foodGroup = new Group();
}
 
function draw() {
  //set the background color
  background(0,0,0);

  //create edge sprites
  edges = createEdgeSprites();
  fish.collide(edges);

  //starting screen
  if(gameState === 0) {
  //set the background color
  background(0,0,0);

  //show the level buttons
  easy.show();
  medium.show();
  hard.show();
 
  //display the game name
  strokeWeight(5);
  stroke("blue");
  textSize(100);
  textFont('Architects Daughter');
  fill("pink");
  text("Go Fish",width/2-150,height/2-370);
 
  //display the game information
  noStroke();
  textSize(30);
  textFont('Architects Daughter');
  text("Use the arrow keys to move the fish",width/2-240,height/2-300);
  text("Dodge the sharks and eat the carrots",width/2-240,height/2-250);
  text("Don’t run out of energy",width/2-140,height/2-200);
  text("Click a level to start",width/2-120,height/2-150);

  //go to the easy level
  easy.mousePressed(()=>{
    gameState = 1;
  });

  //go to the medium level
  medium.mousePressed(()=>{
    gameState = 2;
  });

  //go to the hard level
  hard.mousePressed(()=>{
    gameState = 3;
  })

  //make the fish, ground, and gameOverImg invisible
  fish.visible = false;
  ground.visible = false;
  gameOver.visible = false;
  scoreBar.visible = false;
  greyBar.visible = false;
  scoreCarrot.visible = false;

  //hide the reset button
  reset.hide();
 }
 

 //easy level
 if(gameState === 1) {
   //hide the buttons
  easy.hide();
  medium.hide();
  hard.hide();
  reset.hide();

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
    scoreBar.x = scoreBar.x + 10;
    scoreBar.width = scoreBar.width + 20;

    //play the sound for eating food
    ateSound.play();
  }

  //decrease the score of the fish as time goes on
  if(frameCount % 200 === 0) {
    scoreBar.x = scoreBar.x - 2;
    scoreBar.width = scoreBar.width - 4;
  }

  //destroy the shark and decrease the energy level
  if(obstacleGroup.isTouching(fish)) {
    obstacleGroup.destroyEach();
    scoreBar.x = scoreBar.x - 3;
    scoreBar.width = scoreBar.width - 6;

    //play the sound for hitting the shark
    hitSharkSound.play();
  }

  //let the player win when the energy bar is full
  if(scoreBar.width >= 300) {
    //change the game state
    gameState = 5;

    //play the won sound
    wonSound.play();
  }

  //end the game when there is no energy left
  if(scoreBar.width <= 150) {
    //change the game state
    gameState = 4;

    //play the game over sound
    gameOverSound.play();
  }
}


//medium level
if(gameState === 2) { 
  //hide the buttons
  easy.hide();
  medium.hide();
  hard.hide();
  reset.hide();

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

    //play the sound for eating food
    ateSound.play();
  }

  //decrease the score of the fish as time goes on
  if(frameCount % 200 === 0) {
    scoreBar.x = scoreBar.x - 2;
    scoreBar.width = scoreBar.width - 4;
  }

  //destroy the shark and decrease the energy level
  if(obstacleGroup.isTouching(fish)) {
    obstacleGroup.destroyEach();
    scoreBar.x = scoreBar.x - 6;
    scoreBar.width = scoreBar.width - 12;

    //play the sound for hitting the shark
    hitSharkSound.play();
  }

  //let the player win when the energy bar is full
  if(scoreBar.width >= 300) {
    //change the game state
    gameState = 5;

    //play the won sound
    wonSound.play();
  }

  //end the game when there is no energy left
  if(scoreBar.width <= 0) {
    //change the game state
    gameState = 4;

    //play the game over sound
    gameOverSound.play();
  }
}
 

//hard level
if(gameState === 3) { 
  //hide the buttons
  easy.hide();
  medium.hide();
  hard.hide();
  reset.hide();
  
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
    scoreBar.x = scoreBar.x + 9;
    scoreBar.width = scoreBar.width + 18;
    
    //play the sound for eating food
    ateSound.play();
  }

  //decrease the score of the fish as time goes on
  if(frameCount % 200 === 0) {
    scoreBar.x = scoreBar.x - 2;
    scoreBar.width = scoreBar.width - 4;
  }

  //destroy the shark and decrease the energy level
  if(obstacleGroup.isTouching(fish)) {
    obstacleGroup.destroyEach();
    scoreBar.x = scoreBar.x - 8;
    scoreBar.width = scoreBar.width - 16;

    //play the sound for hitting the shark
    hitSharkSound.play();
  }

  //let the player win when the energy bar is full
  if(scoreBar.width >= 150) {
    //change the game state
    gameState = 5;

    //play the won sound
    wonSound.play();
  }

  //end the game when there is no energy left
  if(scoreBar.width <= 0) {
    //change the game state
    gameState = 4;

    //play the game over sound
    gameOverSound.play();
  }
}


 //player lost
 if(gameState === 4) {
   //display the gameOverImg and resetImg
   gameOver.visible = true;
   
   //display the reset button
   reset.show();

   //make everything invisible
   fish.visible = false;
   ground.visible = false;
   scoreBar.visible = false;
   greyBar.visible = false;
   scoreCarrot.visible = false;
   obstacleGroup.destroyEach();
   foodGroup.destroyEach();

   reset.mousePressed(()=>{
    gameState = 0;
  })
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

   //display the reset button
   reset.show();

   //display that the player won
   fill("pink");
   strokeWeight(4);
   stroke("blue");
   textSize(180);
   textFont('Architects Daughter');
   text("YOU WON !!!",width/2-450,height/2-100);

   reset.mousePressed(()=>{
    gameState = 0;
  })
 }
 
 //draw the sprites
 drawSprites();
}

 
function easySharks() {
  if(frameCount % 300 === 0) {
    var randY = Math.round(random(80,520));
    shark = createSprite(1200,randY,200,200);
    shark.addImage(sharkImg);
    shark.scale = 0.8;
    shark.lifetime = 400;
    shark.velocityX = -5;
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
    shark = createSprite(1200,randY,200,200);
    shark.addImage(sharkImg);
    shark.scale = 0.8;
    shark.lifetime = 400;
    shark.velocityX = -6;
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
    shark = createSprite(1200,randY,200,200);
    shark.addImage(sharkImg);
    shark.scale = 0.8;
    shark.lifetime = 400;
    shark.velocityX = -7;
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