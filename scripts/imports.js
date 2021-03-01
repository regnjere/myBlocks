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
  }
};
Blockly.JavaScript.import_turt = function () {
  return ""
};

Blockly.Blocks['import_math'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("Import Math"), "IMPORTMATH");
    this.setColour(290);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.import_math = function () {
  return ""
};


Blockly.Blocks['import_rand'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldLabelSerializable("Import Random"), "IMPORTRAND");
    this.setColour(290);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript.import_rand = function () {
  return ""
};

