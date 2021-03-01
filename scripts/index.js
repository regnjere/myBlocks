'use strict';

var myWorkspace = null;


//Disable blocks that need to be imported to work
myWorkspace = Blockly.inject('blocklyDiv',
  {
    toolbox: document.getElementById('toolbox-categories'),
  });
$(function(){
  $("[name='Turtle'] > *").attr("disabled",true);
  $("[type='math_trig']").attr("disabled",true);
  $("[type='math_constant']").attr("disabled",true);
  $("[type='math_atan2']").attr("disabled",true);
  $("[type='math_random_int']").attr("disabled",true);
  $("[type='math_random_float']").attr("disabled",true);
  $("[type='colour_random']").attr("disabled",true);
  setTimeout(BlocklyStorage.restoreBlocks, 0);  
});


function importModules() {
  var dom = Blockly.Xml.workspaceToDom(myWorkspace);
  var oSerializer = new XMLSerializer();
  var xmlString = oSerializer.serializeToString(dom);
  if (xmlString.search("import_turt") != -1) {
    $("[name='Turtle'] > *").attr("disabled",false);
  } else{
    $("[name='Turtle'] > *").attr("disabled",true);
  }

  if (xmlString.search("import_math") != -1) {
    $("[type='math_trig']").attr("disabled",false);
    $("[type='math_constant']").attr("disabled",false);
    $("[type='math_atan2']").attr("disabled",false);
  } else{
    $("[type='math_trig']").attr("disabled",true);
    $("[type='math_constant']").attr("disabled",true);
    $("[type='math_atan2']").attr("disabled",true);
  }
  if (xmlString.search("import_rand") != -1) {
    $("[type='math_random_int']").attr("disabled",false);
    $("[type='math_random_float']").attr("disabled",false);
    $("[type='colour_random']").attr("disabled",false);
  } else{
    $("[type='math_random_int']").attr("disabled",true);
    $("[type='math_random_float']").attr("disabled",true);
    $("[type='colour_random']").attr("disabled",true);
  }
};
myWorkspace.addChangeListener(importModules);
//importModules();