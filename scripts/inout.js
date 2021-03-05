'use strict';

Blockly.Blocks['text_print2'] = {
  init: function () {
    this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField("print");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('text_blocks');
    this.setColour(160);
    this.setTooltip("TEXT_PRINT_TOOLTIP");
    this.setHelpUrl("TEXT_PRINT_HELPURL");
  }
};
Blockly.JavaScript['text_print2'] = function (block) {
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return '$("#displayText").append("<p>"); $("#displayText").append('+msg+'); $("#displayText").append("</p>");' ;
};
Blockly.Python.text_print2 = function (block) {
  // Print statement.
  var msg = Blockly.Python.valueToCode(block, 'TEXT',
      Blockly.Python.ORDER_NONE) || '\'\'';
  return 'print(' + msg + ')\n';
};

Blockly.Blocks['text_prompt_ext2'] = {
  init: function () {
    var TYPES = [
      [Blockly.Msg['TEXT_PROMPT_TYPE_TEXT'], 'TEXT'],
      [Blockly.Msg['TEXT_PROMPT_TYPE_NUMBER'], 'NUMBER']
    ];
    this.setHelpUrl(Blockly.Msg['TEXT_PROMPT_HELPURL']);
    this.setStyle('text_blocks');
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    var dropdown = new Blockly.FieldDropdown(TYPES, function (newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendValueInput('TEXT')
      .appendField(dropdown, 'TYPE');
    this.setOutput(true, 'String');
    this.setTooltip(function () {
      return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
        Blockly.Msg['TEXT_PROMPT_TOOLTIP_TEXT'] :
        Blockly.Msg['TEXT_PROMPT_TOOLTIP_NUMBER'];
    });
  },
  updateType_: function (newOp) {
    this.outputConnection.setCheck(newOp == 'NUMBER' ? 'Number' : 'String');
  },
  
  MutationToDom() {
    
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('type', this.getFieldValue('TYPE'));
    return container;
  },

  DomToMutation(xmlElement) {
    
    this.updateType_(xmlElement.getAttribute('type'));
  }
};

Blockly.JavaScript['text_prompt_ext2'] = function (block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  }

  var code = 'window.prompt('+msg+')' 
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'Number('+code+')';
  }
  var code = '(function(theCode,theMSG){$("#displayText").append("<p>");\n $("#displayText").append(theMSG);\n $("#displayText").append(theCode.toString());\n $("#displayText").append("</p>");\n return theCode})('+code+','+msg+');'
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
Blockly.Python['text_prompt_ext2'] = function (block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  }
  var code = "input("+msg+")"
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) { 
    code = 'float('+code+')';
  } 
  return [code+"\n", Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

