'use strict';

//Text  Blocks
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
Blockly.Python['text_print2'] = function (block) {
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

//Loop Blocks
//range block
Blockly.Blocks['generate_range'] = {
  init: function() {
    this.appendValueInput("start")
        .setCheck("Number")
        .appendField("range(");
    this.appendValueInput("stop")
        .setCheck("Number")
        .appendField(",");
    this.appendValueInput("step")
        .setCheck("Number")
        .appendField(",");
    this.appendDummyInput()
        .appendField(")");
    this.setOutput(true, "Array");
    this.setStyle("loop_blocks");
 this.setTooltip("Create a range with start, stop and/or step");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript['generate_range'] = function(block) {
  var value_start = parseInt(Blockly.JavaScript.valueToCode(block, 'start', Blockly.JavaScript.ORDER_ATOMIC))||0;
  var value_stop = parseInt(Blockly.JavaScript.valueToCode(block, 'stop', Blockly.JavaScript.ORDER_ATOMIC))||1;
  var value_step = parseInt(Blockly.JavaScript.valueToCode(block, 'step', Blockly.JavaScript.ORDER_ATOMIC))||1;
  // TODO: Assemble JavaScript into code variable.
  let array = [];
  for(let i99 = value_start; i99 < value_stop; i99+=value_step)
  {
    array.push(i99);
  }
  var code = '['+array+']';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};
Blockly.Python['generate_range'] = function(block) {
  var value_start = Blockly.Python.valueToCode(block, 'start', Blockly.Python.ORDER_ATOMIC);
  var value_stop = Blockly.Python.valueToCode(block, 'stop', Blockly.Python.ORDER_ATOMIC);
  var value_step = Blockly.Python.valueToCode(block, 'step', Blockly.Python.ORDER_ATOMIC);

  var code = 'range('+value_start+','+value_stop+','+value_step+')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_CONDITIONAL];
};

//While loop block
Blockly.Blocks['controls_while'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")
        .appendField("while(");
    this.appendDummyInput()
        .appendField("):");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle("loop_blocks");
 this.setTooltip("Repeat code while condition is True");
 this.setHelpUrl("https://github.com/google/blockly/wiki/Loops#repeat");
  }
};
//JavaScript for while loop
Blockly.JavaScript['controls_while'] = function(block) {
  // Do while loop.
  var until = false;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL',
    until ? Blockly.JavaScript.ORDER_LOGICAL_NOT :
    Blockly.JavaScript.ORDER_NONE) || 'false';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};
//Python for while loop
Blockly.Python['controls_while'] = function(block) {
  // Do while/until loop.
  var until = false;
  var argument0 = Blockly.Python.valueToCode(block, 'BOOL',
      until ? Blockly.Python.ORDER_LOGICAL_NOT :
      Blockly.Python.ORDER_NONE) || 'False';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  return 'while ' + argument0 + ':\n' + branch;
};

Blockly.defineBlocksWithJsonArray([
  // Block for 'for each' loop.
  {
    "type": "controls_forEach2",
    "message0": "for %1 in %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": null
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "message1": "%1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "helpUrl": "https://docs.python.org/3/tutorial/controlflow.html#for-statements",
    "extensions": [
      "contextMenu_newGetVariableBlock",
      "controls_forEach_tooltip"
    ]
  },
])
//JavaScript for For loop
Blockly.JavaScript['controls_forEach2'] = function(block) {
  // For each loop.
  var variable0 = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var argument0 = Blockly.JavaScript.valueToCode(block, 'LIST',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '[]';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  var code = '';
  // Cache non-trivial values to variables to prevent repeated look-ups.
  var listVar = argument0;
  if (!argument0.match(/^\w+$/)) {
    listVar = Blockly.JavaScript.variableDB_.getDistinctName(
        variable0 + '_list', Blockly.VARIABLE_CATEGORY_NAME);
    code += 'var ' + listVar + ' = ' + argument0 + ';\n';
  }
  var indexVar = Blockly.JavaScript.variableDB_.getDistinctName(
      variable0 + '_index', Blockly.VARIABLE_CATEGORY_NAME);
  branch = Blockly.JavaScript.INDENT + variable0 + ' = ' +
      listVar + '[' + indexVar + '];\n' + branch;
  code += 'for (var ' + indexVar + ' in ' + listVar + ') {\n' + branch + '}\n';
  return code;
};
//Python for For loop
Blockly.Python['controls_forEach2'] = function(block) {
  // For each loop.
  var variable0 = Blockly.Python.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var argument0 = Blockly.Python.valueToCode(block, 'LIST',
      Blockly.Python.ORDER_RELATIONAL) || '[]';
  var branch = Blockly.Python.statementToCode(block, 'DO');
  branch = Blockly.Python.addLoopTrap(branch, block) || Blockly.Python.PASS;
  var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch;
  return code;
};

Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.LOOP_TYPES.push('controls_forEach2');
Blockly.Constants.Loops.CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.LOOP_TYPES.push('controls_while');

//Modified Boolean Block
Blockly.Blocks['logic_boolean2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["True","TRUE"], ["False","False"]]), "BOOL");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
 this.setTooltip("%{BKY_LOGIC_BOOLEAN_TOOLTIP}");
 this.setHelpUrl("%{BKY_LOGIC_BOOLEAN_HELPURL}");
  }
};
//JavaScript for boolean
Blockly.JavaScript['logic_boolean2'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python['logic_boolean2'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Python.ORDER_ATOMIC];
};
