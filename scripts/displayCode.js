
function updateCode(){
  var code = Blockly.Python.workspaceToCode(myWorkspace);
  $("#displayCode").text("")
  $("#displayCode").text(code)
}
myWorkspace.addChangeListener(updateCode)

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