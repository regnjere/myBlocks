'use strict';
Blockly.Blocks['text_print2'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .appendField("Print");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['text_print2'] = function(block) {
  // Print statement.
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return '$("#inout").html($("#inout").html()+"<p>'+msg+'</p>");\n';
};


Blockly.Blocks['text_prompt_ext2'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(["String", "Number"])
        .appendField("prompt for")
        .appendField(new Blockly.FieldDropdown([["text","text"], ["number","number"]]), "TYPE")
        .appendField("with message");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['text_prompt_ext2'] = function(block) {
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
  }
  var code = 'window.prompt(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'Number(' + code + ')';
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


