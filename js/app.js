//Problem: it doesn't do anything
//Solution: make it draw

//variables
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//when clicking on an unselected control li the unselected element should inherit the selected class
$(".controls").on("click", "li", function() {
  //remove selected class from siblings
  $(this).siblings().removeClass("selected");
  //add selected class for clicked element
  $(this).addClass("selected");
  //update selected color
  color = $(this).css("background-color");
});


//when add color is pressed
  //show or hide the color select according to it's current state
$("#revealColorSelect").click(function() {
  changeColor();
  $("#colorSelect").toggle();
});

function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + ", " + g + ", " + b +  ")");
}
//when color sliders change
  //update the new color span
$("input[type=range]").change(changeColor);

//when add color is pressed
$("#addNewColor").click(function() {
    //append new color to control
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    $newColor.click();
});

//mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});