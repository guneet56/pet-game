var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,feedTime, lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  //addFood.addImage = Milk.png;
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed = data.val();
  })
  
  fill(255,255,254);
  textSize(15);
  if (lastFed >= 12 ){
    text("Last Feed:" +lastFed % 12 +"PM" , 350, 30);
  }
  else if (lastFed == 0 ){
    text("Last Feed: 12AM", 350, 30);
  }
else{
  text("Last Feed:" +lastFed  +"AM" , 350, 30);
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

// Function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() -1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  if (mousePressed("Add Food")){
    addFoods=loadImage('Milk.png');
  }
  this.image=loadImage('Milk.png');
  database.ref('/').update({
    Food:foodS
  })
}
