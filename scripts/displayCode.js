$("#displayCode").hide()
function updateCode(){
  console.log("I'm here!")
  var code = Blockly.Python.workspaceToCode(myWorkspace);
  $("#displayCode").text(code)
}
myWorkspace.addChangeListener(updateCode)

displayMyCode = function(){
  $("#codeDisplay").hide();
  $("#turtleDisplay").show();
  $("#visualization").hide();
  $("#displayCode").show();
}