'use strict';
function MutationToDom() {
  var container = document.createElement('mutation');
  var continueOnError = (this.getFieldValue('HasCONTINUE') == 'TRUE');
  container.setAttribute('continueOnError', continueOnError);
  return container;
}

function DomToMutation(xmlElement) {
  var continueOnError = (xmlElement.getAttribute('continueOnError') == 'true');
  this.updateShape_(continueOnError);
}
Blockly.Blocks['text_print2'] = {
  init: function () {
    this.appendValueInput("TEXT")
      .setCheck(null)
      .appendField("print");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['text_print2'] = function (block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_FUNCTION_CALL);
  
  //return '$("#inout").append("<p>'+value_text +'</p>");';
  return '$("#inout").append("<p>"); $("#inout").append('+value_text+'); $("#inout").append("</p>");';
};

Blockly.Blocks['text_prompt_ext2'] = {
  /**
   * Block for prompt function (external message).
   * @this {Blockly.Block}
  */
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
  var code = '(function(){$("#inout").append("<span>");\n $("#inout").append('+msg+');\n $("#inout").append(" </span>");\n $("#inout").append('+code+'); return '+code+'})();'
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};


