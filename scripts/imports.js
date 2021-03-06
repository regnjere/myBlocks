'use strict';

Blockly.Blocks['import_turt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("Import Turtle"), "IMPORTTURT");
    this.setColour(290);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
    $("[name='Turtle'] > *").attr("disabled",false);

  }
};
Blockly.JavaScript.import_turt = function () {
  return ""
};
Blockly.Python.import_turt = function() {
  Blockly.Python.definitions_['import_turtle'] = 'import turtle'
  return ""
}

Blockly.Blocks['import_math'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldLabelSerializable("Import Math"), "IMPORTMATH");
    this.setColour(290);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
    $("[type='math_trig']").attr("disabled",false);
    $("[type='math_constant']").attr("disabled",false);
    $("[type='math_atan2']").attr("disabled",false);
  } 
};
Blockly.JavaScript.import_math = function () {
  return ""
};
Blockly.Python.import_math = function() {
  Blockly.Python.definitions_['import_math'] = 'import math';
  return ""
}

Blockly.Blocks['import_rand'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldLabelSerializable("Import Random"), "IMPORTRAND");
    this.setColour(290);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("");
    this.setHelpUrl("");
    $("[type='math_random_int']").attr("disabled",false);
    $("[type='math_random_float']").attr("disabled",false);
    $("[type='colour_random']").attr("disabled",false);
  }
};
Blockly.JavaScript.import_rand = function () {
  return ""
};
Blockly.Python.import_rand = function() {
  Blockly.Python.definitions_['import_random'] = 'import random'
  return ""
}

function importCheck(event){
  if (event.type == Blockly.Events.BLOCK_DELETE||event.type=="toolbox_item_select"){
    var allBlocks = myWorkspace.getAllBlocks()
    if (allBlocks.length == 0){
      $("[name='Turtle'] > *").attr("disabled",true);
      $("[type='math_trig']").attr("disabled",true);
      $("[type='math_round']").attr("disabled",true);
      $("[type='math_constant']").attr("disabled",true);
      $("[type='math_atan2']").attr("disabled",true);
      $("[type='math_random_int']").attr("disabled",true);
      $("[type='math_random_float']").attr("disabled",true);
      $("[type='colour_random']").attr("disabled",true);
    } else{
      $("[name='Turtle'] > *").attr("disabled",true);
      $("[type='math_trig']").attr("disabled",true);
      $("[type='math_round']").attr("disabled",true);
      $("[type='math_constant']").attr("disabled",true);
      $("[type='math_atan2']").attr("disabled",true);
      $("[type='math_random_int']").attr("disabled",true);
      $("[type='math_random_float']").attr("disabled",true);
      $("[type='colour_random']").attr("disabled",true);
      for (var i = 0; i < allBlocks.length; i++) {
        if (allBlocks[i].type == "import_turt") {
          $("[name='Turtle'] > *").attr("disabled",false);
        }
        if (allBlocks[i].type == "import_math") {
          $("[type='math_trig']").attr("disabled",false);
          $("[type='math_round']").attr("disabled",false);
          $("[type='math_constant']").attr("disabled",false);
          $("[type='math_atan2']").attr("disabled",false);
        }
        if (allBlocks[i].type == "import_rand") {
          $("[type='math_random_int']").attr("disabled",false);
          $("[type='math_random_float']").attr("disabled",false);
          $("[type='colour_random']").attr("disabled",false);
        }
      }
    }
  }
}