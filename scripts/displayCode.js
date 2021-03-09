
function updateCode(){
  var code = Blockly.Python.workspaceToCode(myWorkspace);
  $("#displayCode").text("")
  $("#displayCode").text(code)
}


//Show the Python Code
$(displayCode = function(){
  $("#displayCode").show();
  $("#displayText").hide();
  $("#visualization").hide();
});
//Show the Turtle Window
displayTurtle = function(){
  $("#displayCode").hide();
  $("#displayText").hide();
  $("#visualization").show();
};
//Show the Turtle Window
displayText = function(){
  $("#displayCode").hide();
  $("#displayText").show();
  $("#visualization").hide();
};
//Make blocks full screen. 
makeFullscreen = function(){
  $('#myFullscreen').fullScreen(true);
  $('#fullScreen').hide()
  $('#windowView').show()
}
//Make block not full screen.
makeWindowed = function(){
  $('#myFullscreen').fullScreen(false);
  $('#windowView').hide()
  $('#fullScreen').show()
}


// Resize Boxes and turtle depending on screen size
$(window).resize(function(){
  windowSize();
  // Re-run the current code if a turtle is present on the canvas 
  setTimeout(function(){
    if ($(".turtles svg").length > 0){
    Turtle.reset();
    Turtle.execute();
  }},250);
});