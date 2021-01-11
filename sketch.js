var INS=0;
var START=1;
var PLAY=2;
var END=3; 
var gameState=0;
var ins,ins_img;
var backg,backg_img;
var ground,ground_img,invisibleG;
var monkey , monkey_img,scream,scream_img;
var banana ,banana_img, obstacle, obstacle_img;
var bananaGroup, obstacleGroup;
var start,start_img,restart,restart_img,reset,reset_img;
var jump;
var yw,yw_img;
var sound1,sound2,sound3;
var Score,survivalTime, chances;
function preload(){
  
  
  monkey_img =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  scream_img=loadImage("scream.jpg");
  banana_img = loadImage("banana.png");
  obstacle_img= loadImage("obstacle.png");
  ground_img = loadImage("ground.png");
  backg_img = loadImage("j2.webp");
  start_img= loadImage("s2.png");
  restart_img=loadImage("gameOver.png");
  reset_img=loadImage("restart.png");
  ins_img=loadImage("ins4.JPG");
  yw_img=loadImage("yw.jpg");
  sound1=loadSound("jump.wav");
  sound2=loadSound("collided.wav");
  
}



function setup() {
  createCanvas(550,400);
  

  backg= createSprite(275,200,20,20);
  backg.addImage("b",backg_img);
  backg.scale=1.5;

  ground = createSprite(275,410,550,10);
  ground.addImage("g",ground_img);
  ground.setCollider("rectangle",0,20);
  
  monkey = createSprite(30,305,30,20);
  monkey.addAnimation("m",monkey_img);
  monkey.scale=0.1;
  
  invisibleG = createSprite(275,338,550,5);
  invisibleG.visible=false;
  
  start=createSprite(285,200,20,20);
  start.addImage("s",start_img);
  start.scale=1.5;
  
  jump=createSprite(490,365,80,50);
  jump.visible=false;
  
  restart=createSprite(275,175,20,20);
  restart.addImage("r1",restart_img);
  
  reset=createSprite(275,250,20,20);
  reset.addImage("rs1",reset_img);
  reset.scale=0.1;
  
  scream=createSprite(30,305,20,20);
  scream.addImage("sc1",scream_img);
  scream.scale=0.1;
  
  ins=createSprite(305,200,20,20);
  ins.addImage("i",ins_img);
  ins.scale=1.2;
  ins.visible=false;
  
  yw=createSprite(275,200,20,20);
  yw.addImage("i",yw_img);
  yw.scale=2.4;
  yw.visible=false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  Score=0;
  survivalTime=0;
  chances=5;

}


function draw() {
background("white");
  
  if(gameState === 0){
     ins.visible=true;
     }
    
  if (keyDown("space")&& gameState === 0){
      gameState = 1;
      ins.visible=false;
      }
  if (gameState === 1){
    monkey.visible=false;
    restart.visible=false;
    reset.visible=false;
    scream.visible=false;
    ground.velocityX=0;
  }
  if(mousePressedOver(start) && gameState === 1){
      gameState = 2;
     }
     
  if(gameState === 2){
    start.visible=false;
    restart.visible=false;
    scream.visible=false;
survivalTime=survivalTime +Math.round(getFrameRate()/60);

    
  if (ground.x < 0){
      ground.x=ground.width/2;
      }
    monkey.visible=true;  
    ground.velocityX=-(5+Score/5);
    
  if (mousePressedOver(jump) && monkey.y > 220) {
    sound1.play();
   monkey.velocityY=-10;   
   }
   monkey.velocityY = monkey.velocityY + 0.8;
  
   banana1();
   obstacle1();
  
  if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     Score=Score+1;
     }
    
  if(obstacleGroup.isTouching(monkey)){
     chances=chances-1;
     obstacleGroup.destroyEach();
     sound2.play();
  }
  if(chances === 0){
     gameState =3;
     } 
  }
   
 else if(gameState === 3 && chances === 0){
     restart.visible=true;
     reset.visible=true;
     monkey.visible=false;
     scream.visible=true;
     ground.velocityX=0;
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     

    
    if(mousePressedOver(reset)){
      reset1();
    }
  }
  
  monkey.collide(invisibleG); 
  drawSprites();
  if(gameState === 2){
  strokeWeight(6);
  stroke("green");
  textSize(25);
  fill("lightgreen");
  textFont("Jokerman");
  text(" Score : " + Score,415,35);
  
  strokeWeight(6);
  stroke("blue");
  textSize(25);
  fill("lightblue");
  textFont("Jokerman");
  text(" Survival Time : " + survivalTime ,5,35);

  strokeWeight(6);
  stroke("brown");
  textSize(25);
  fill("red");
  textFont("Jokerman");
  text(" Chances : " + chances ,250,35);
    
  
  strokeWeight(6);
  stroke("brown");
  textSize(30);
  fill("red");
  textFont("Jokerman");
  text("JUMP",450,375);
  }
if(gameState === 3){
  strokeWeight(6);
  stroke("green");
  textSize(25);
  fill("lightgreen");
  textFont("Jokerman");
  text(" Score : " + Score ,415,35);
  
  strokeWeight(6);
  stroke("blue");
  textSize(25);
  fill("lightblue");
  textFont("Jokerman");
  text(" Survival Time : " + survivalTime ,5,35);

  strokeWeight(6);
  stroke("brown");
  textSize(25);
  fill("red");
  textFont("Jokerman");
  text(" Chances : " + chances  ,250,35);

}
}

function banana1(){
  if(frameCount % 120===0 ){
  banana = createSprite(600,Math.round(random(180,250)),20,20);
  banana.velocityX=-(5+Score/5);
  banana.addImage("b1",banana_img);
  banana.scale=0.1;
  banana.lifetime = 125;
  bananaGroup.add(banana);
}
}

function obstacle1(){
  if(frameCount % 80 === 0){
     obstacle = createSprite(600,Math.round(random(310,330)),20,20);
    obstacle.velocityX=-(5+Score/5);
    obstacle.addImage("o1",obstacle_img);
    obstacle.scale=0.1;
    obstacle.lifetime=125;
    obstacleGroup.add(obstacle);
     }
}

function reset1(){
  Score=0;
  survivalTime=0;
  gameState=0;
  chances=5;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  scream.visible=false;
  monkey.visible=true;
  start.visible=true;
}