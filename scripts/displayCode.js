$("#displayCode").hide()
function updateCode(){
  var code = Blockly.Python.workspaceToCode(myWorkspace);
  $("#displayCode").text("")
  $("#displayCode").text(code)
}
myWorkspace.addChangeListener(updateCode)

displayMyCode = function(){
  $("#codeDisplay").hide();
  $("#turtleDisplay").show();
  $("#visualization").hide();
  $("#displayCode").show();
}