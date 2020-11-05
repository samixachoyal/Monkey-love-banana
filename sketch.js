var bakground,bakgroundImage;
var player , player_running,playercollided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var sc;
var ground,groundImage;
var invisible;

var PLAY=1;

var END=0;

var gameState=1;

var bananaC;


function preload(){
  
  bakgroundImage = loadImage("s.jpg");
    player_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  playercollided = loadAnimation("sprite_1.png");

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("snow.PNG");
   
 
}



function setup() {
  
createCanvas(windowWidth,windowHeight);
  
bakground = createSprite(250,250);
bakground.addImage("bakground",bakgroundImage);
bakground.scale = 2;
  
player = createSprite(100,415,30,30);
player.addAnimation("player",player_running);
player.addAnimation("collided",playercollided);
player.debug = false;  
player.setCollider("rectangle",0,0,40,player.height);  
player.scale = 0.1;
  
ground = createSprite(100,600,1000,5);
ground.addImage("ground",groundImage);
ground.scale = 2.9;  
  
FoodGroup = createGroup();
obstacleGroup = createGroup(); 
  
invisible = createSprite(250,460,500,5);
invisible.visible = false;
  
score = 0;
  
bananaC = 0;
  
sc = 0;  
  
}


function draw() {
  
if(gameState===PLAY){
  
food();
obstacles();
  
if(player.isTouching(FoodGroup)){
  
FoodGroup.destroyEach();
bananaC = bananaC + 1;
player.scale = player.scale + 0.01;
sc = sc+2;  
  
}
  
score = score + Math.round(getFrameRate()/67);
  
  if(player.isTouching(obstacleGroup)){
  
gameState=END;
player.scale = 0.1;    
  
}      
}  
  
if(touches.length > 0 || keyDown("SPACE")) {
player.velocityY = -10;
touches = [];
}  
  
player.velocityY = player.velocityY + 0.8;  
  

  
player.collide(ground);
  
obstacleGroup.collide(invisible);  

ground.velocityX = -5;  
  
if (ground.x < 0){
ground.x = ground.width/2;
}
  
bakground.velocityX = -5;
  
if (bakground.x < 0){
bakground.x = bakground.width/2;
}  
  
drawSprites();

fill("blue"); 
textSize(20);  
text("SURVIVAL TIME : "+ score, widht-100,50); 
  
fill("yellow");
textSize(17);
text("Banana Collect : "+ bananaC,width-100,70);
  
fill("cyan");
textSize(15);
text("score :"+sc,width-100,90);  
  
if(gameState===END){
  
player.changeAnimation("collided",playercollided);

fill("red")  
textSize(15);
text("GAME OVER!",width-400,200);
  
player.collide(ground);  

ground.velocityX = 0;
player.velocityY = 0;
bakground.velocityX = 0;  
FoodGroup.setVelocityXEach(0)
obstacleGroup.setVelocityXEach(0) 
  
obstacleGroup.setLifetimeEach(-1)
FoodGroup.setLifetimeEach(-1)
        
}  
  
}

function food(){
  
if(frameCount%100==0){
  
banana = createSprite(490,250,30,30);
banana.y = Math.round(random(220,300));  
banana.addImage("banana",bananaImage);  
banana.scale = 0.05;  
  
banana.velocityX = -5;  
banana.lifetime = 100;
FoodGroup.add(banana);  
  
}    
}

function obstacles(){
  
if(frameCount%300==0){
  
obstacle = createSprite(480,450,10,10);  
obstacle.addImage("obstacle",obstacleImage);
obstacle.scale = 0.1;  
  
obstacle.velocityX = -5;  
obstacle.lifetime = 100;  
obstacleGroup.add(obstacle);  
}    
}