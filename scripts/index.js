'use strict';

var myWorkspace = null;
myWorkspace = Blockly.inject('blocklyDiv',
  {
    toolbox: document.getElementById('toolbox-categories'),
    zoom:
      {controls: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true},
});
$(function(){

  //Hide windowed view button
  $('#windowView').hide()
  //Disable blocks that need to be imported to work
  $("[name='Turtle'] > *").attr("disabled",true);
  $("[type='math_trig']").attr("disabled",true);
  $("[type='math_constant']").attr("disabled",true);
  $("[type='math_atan2']").attr("disabled",true);
  $("[type='math_random_int']").attr("disabled",true);
  $("[type='math_random_float']").attr("disabled",true);
  $("[type='colour_random']").attr("disabled",true);
  setTimeout(BlocklyStorage.restoreBlocks, 0);  
});