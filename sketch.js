
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var ground;
var gameState = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 400);
  
  monkey = createSprite(100, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  
}


function draw() {

  background(180);

  if(gameState === "play"){
    
  if(keyDown("space") && monkey.y>=100){
    monkey.velocityY = -12;
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  ground.x = ground.width/2;  
  console.log(ground.x);
  
  monkey.collide(ground);
  
  if(monkey.isTouching(FoodGroup)){
    score = score+1; 
  }
  
  if(monkey.isTouching(obstacleGroup)){
    monkey.velocityX = 0;
    gameState = "end";
    
  }
  var survivalTime = 0;
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score, 400, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime, 100, 50);
  
  spawnFood();
  spawnObstacles();
    
  drawSprites();
  }  
  
  if(gameState === "end"){
  
  textSize(22);
  fill("black");
  text("Game Over!!", 200, 200);
  }
}

function spawnFood(){
  if (frameCount % 80 === 0){
   banana = createSprite(600,100,20,20);
   banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
   banana.velocityX = -4;
   banana.scale = 0.1;
   banana.lifetime = 200;
   FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
   obstacle = createSprite(600,330,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -4;
   obstacle.scale = 0.1;
   obstacle.lifetime = 200;
   obstacleGroup.add(obstacle);
  }
}