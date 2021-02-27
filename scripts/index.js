'use strict';

let workspace = null;

function start() {
  // Create main workspace.
  workspace = Blockly.inject('blocklyDiv',
    {
      toolbox: document.getElementById('toolbox-categories'),
    });
  //Disable blocks that need to be imported to work
  $("[name='Turtle'] > *").attr("disabled",true);
  $("[type='math_trig']").attr("disabled",true);
  $("[type='math_constant']").attr("disabled",true);
  $("[type='math_atan2']").attr("disabled",true);
  $("[type='math_random_int']").attr("disabled",true);
  $("[type='math_random_float']").attr("disabled",true);
  $("[type='colour_random']").attr("disabled",true);
  setTimeout(BlocklyStorage.restoreBlocks, 0);
}

$( window ).resize(function() {
  console.log("window resized")
});

$( function() {

  $( ":checkbox[name ='importTurtle']" ).change(function () {
    if ($(this).prop("checked")) {
      console.log($("[name='Turtle']"))
      $("[name='Turtle'] > *").attr("disabled",false);
    } else{
      $("[name='Turtle'] > *").attr("disabled",true);
    }
  });
  $( ":checkbox[name ='importMath']" ).change(function () {
      if ($(this).prop("checked")) {
        $("[type='math_trig']").attr("disabled",false);
        $("[type='math_constant']").attr("disabled",false);
        $("[type='math_atan2']").attr("disabled",false);
      } else{
        $("[type='math_trig']").attr("disabled",true);
        $("[type='math_constant']").attr("disabled",true);
        $("[type='math_atan2']").attr("disabled",true);
      }
  });
  $( ":checkbox[name ='importRandom']" ).change(function () {
      if ($(this).prop("checked")) {
        $("[type='math_random_int']").attr("disabled",false);
        $("[type='math_random_float']").attr("disabled",false);
        $("[type='colour_random']").attr("disabled",false);
      } else{
        $("[type='math_random_int']").attr("disabled",true);
        $("[type='math_random_float']").attr("disabled",true);
        $("[type='colour_random']").attr("disabled",true);
      }
  });
});