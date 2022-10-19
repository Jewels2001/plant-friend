var app = new Framework7({
  // App root element
  el: '#app',
  // ... other parameters
});
var mainView = app.views.create('.view-main')

/* 
by default:
 - plant starts healthy
 - dry out over time
 - deplete in nutrients over time

interactions:
 - water it, replenish the plant
 - feed it, nutrients for the plant
 - trim it

care:
 - too much water, plant near death
 - too much fertilizer, plant near death
 - if the plant falls into a near death state, you can only heal it by trimming it
*/

var waterLevel = 20;
var nowater = 0;
var drowning = 40;

var nearDeath = false;

var w = {waterLevel:20, noWater:0, drowning:40}

function dryOut() {
  checkHealth()
  if(waterLevel > 0)
    waterLevel--;
  console.log(waterLevel);
  var waterTimer = setTimeout(dryOut, 500);

}
dryOut();

function checkHealth() {
  if(waterLevel <= nowater) {
    nearDeath = true;
    console.log("Help! I'm dying ;(")
    $("#plant path").css("fill", "#555555")
  }
}