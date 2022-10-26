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

var nutrientLevel = 50;
var noNutrients = 0;
var overFed = 80;

var trimmed = false;
var nearDeath = false;

var w = {waterLevel:20, noWater:0, drowning:40}

function dryOut() {
  checkHealth()
  if(waterLevel > 0)
    waterLevel--;
  console.log(waterLevel);
  var waterTimer = setTimeout(dryOut, 11500);

}

function deplete() {
  checkHealth()
  if (nutrientLevel > noNutrients) {
    nutrientLevel--;
  }
  console.log(nutrientLevel);
  var nutrientTimer = setTimeout(deplete, 11800);
}

function grow() {
  checkHealth()
  trimmed = false;
  $('#trim').fadeIn()
  var growthTimer = setTimeout(grow, 100000);
}



dryOut();
deplete();
grow();



function checkHealth() {
  if(waterLevel <= nowater || nutrientLevel <= noNutrients) {
    nearDeath = true;
    $("#plant path").css("fill", "#555555")
  }
  if (nearDeath && waterLevel > nowater && nutrientLevel > noNutrients && trimmed) {
    $("#plant path").css("fill", "#568b62")
    nearDeath = false;
  } else if(nearDeath) {
    console.log("Help! I'm dying ;(")
  }

}


$('#water-me').on("click", function() {
  console.log("clicked!")
  waterLevel += 10;
  $('#water').fadeIn().delay(3000).fadeOut()
  // var watering = setTimeout(, 100);
});

$('#feed-me').on("click", function () {
  nutrientLevel += 10;
  $('#food').fadeIn().delay(3000).fadeOut()
});

$('#trim-me').on("click", function () {
  trimmed = true;
 $('#trim').fadeOut();
});

$(".panel").on("panel:open", function() {
  var motivation = ["I'm worth it", "Thanks for trying", "Be leaf in yourself"];
  var indexnum = Math.floor(Math.random() * motivation.length)
  console.log("INDEX:", indexnum)
  $('#plant-quote').text(motivation[indexnum])
})

$("#name-input").on("change", function () {
  console.log("name changed :(");
  var plantname = $(this).val();
  $(".name-display").text(plantname);
})
