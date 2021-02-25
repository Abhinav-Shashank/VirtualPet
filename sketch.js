var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;
var milk, milkImg, dogfood, food;
var food1,milk1; 

function preload()
{
  dogImg = loadImage("Dog.png");

  dogHappyImg = loadImage("happydog.png");

  milkImg = loadImage("milk.png");

  dogfood = loadImage("dogfood.png");
  

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);

  milk = createSprite(210,280,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;
  milk.visible = false;

  food = createSprite(210,280,10,10);
  food.addImage(dogfood);
  food.scale=0.08;
  food.visible = false;


  for (var i = 5; i < 500; i=i+10){
    var dot = createSprite(i, 5, 3, 3);
    dot.shapeColor = "red";
  }
  for (var i = 5; i < 500; i=i+10) {
    var dot1 = createSprite(i, 495, 3, 3);
    dot1.shapeColor = "red";
  }
  for (var i = 5; i < 500; i=i+10) {
    var dot1 = createSprite(495,i, 3, 3);
    dot1.shapeColor = "red";
  }
  for (var i = 5; i < 500; i=i+10) {
    var dot1 = createSprite(5,i, 3, 3);
    dot1.shapeColor = "red";
  }

  food1 = 30;
  milk1 = 30;

}


function draw() {  
  background("cyan")

  if(foodS !== 0){
  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    milk.visible = true;
    milk1 = milk1-1;
  }
  if(keyWentUp(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    milk.visible = false;
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);
    food.visible = true;
    food1 = food1-1;
  }
  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);
    food.visible = false;
  }

}
  drawSprites();

  if(food1 >= 1 && milk1 >= 1){
    textSize(17);
    fill("black");
    text("I am your Pet 🐶Bruno...😍 I am Hungry ",100,150);
    fill("black");
    text("Long Press up arrow key to feed your Dog Food",50,50);
    text("Long Press down arrow key to feed your Dog Milk",50,80);

    //displaying the remaining food
    textSize(20);
    fill("black");
    stroke("white")
    text("Food Remaining : "+food1,170,440);
    text("Milk Remaining : "+milk1,170,470);
  }else {
  //if(food1 === 0 && milk1 === 0){
    textSize(24);
    fill("green");
    text("Your Dog is not hungry anymore...",100,65);
    dog.addImage(dogImg);

  }

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

