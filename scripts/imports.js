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
  return "import turtle\n"
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
  return ""
}

myWorkspace.addChangeListener( function(event){
  if (event.type == Blockly.Events.BLOCK_DELETE){
    var allBlocks = myWorkspace.getAllBlocks()
    if (allBlocks.length == 0){
      $("[name='Turtle'] > *").attr("disabled",true);
      $("[type='math_trig']").attr("disabled",true);
      $("[type='math_constant']").attr("disabled",true);
      $("[type='math_atan2']").attr("disabled",true);
      $("[type='math_random_int']").attr("disabled",true);
      $("[type='math_random_float']").attr("disabled",true);
      $("[type='colour_random']").attr("disabled",true);
    } else{
      for (var i = 0; i < allBlocks.length; i++) {
        if (allBlocks[i].type != "import_turt") {
          $("[name='Turtle'] > *").attr("disabled",true);
        }
        if (allBlocks[i].type != "import_math") {
          $("[type='math_trig']").attr("disabled",true);
          $("[type='math_constant']").attr("disabled",true);
          $("[type='math_atan2']").attr("disabled",true);
        }
        if (allBlocks[i].type != "import_math") {
          $("[type='math_random_int']").attr("disabled",true);
          $("[type='math_random_float']").attr("disabled",true);
          $("[type='colour_random']").attr("disabled",true);
        }
      }
    }
  }
});