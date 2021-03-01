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
    var dom = Blockly.Xml.workspaceToDom(myWorkspace);
    var oSerializer = new XMLSerializer();
    var xmlString = oSerializer.serializeToString(dom);
    if (xmlString.search("import_turt") != -1) {
      $("[name='Turtle'] > *").attr("disabled",false);
    } else{
      $("[name='Turtle'] > *").attr("disabled",true);
    }
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
    var dom = Blockly.Xml.workspaceToDom(myWorkspace);
    var oSerializer = new XMLSerializer();
    var xmlString = oSerializer.serializeToString(dom);


    if (xmlString.search("import_math") != -1) {
      $("[type='math_trig']").attr("disabled",false);
      $("[type='math_constant']").attr("disabled",false);
      $("[type='math_atan2']").attr("disabled",false);
    } else{
      $("[type='math_trig']").attr("disabled",true);
      $("[type='math_constant']").attr("disabled",true);
      $("[type='math_atan2']").attr("disabled",true);
    }
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
    var dom = Blockly.Xml.workspaceToDom(myWorkspace);
    var oSerializer = new XMLSerializer();
    var xmlString = oSerializer.serializeToString(dom);
    if (xmlString.search("import_rand") != -1) {
      $("[type='math_random_int']").attr("disabled",false);
      $("[type='math_random_float']").attr("disabled",false);
      $("[type='colour_random']").attr("disabled",false);
    } else{
      $("[type='math_random_int']").attr("disabled",true);
      $("[type='math_random_float']").attr("disabled",true);
      $("[type='colour_random']").attr("disabled",true);
    }
  }
};
Blockly.JavaScript.import_rand = function () {
  return ""
};

