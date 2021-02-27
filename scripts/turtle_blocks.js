/**
 * Blockly Apps: Turtle Graphics Blocks
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blocks for Blockly's Turtle Graphics application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// Extensions to Blockly's language and JavaScript generator.


Blockly.Blocks['draw_move'] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField("move")
      .appendField(new Blockly.FieldDropdown([["forward", "moveForward"], ["backward", "moveBackward"]]), "DIR")
      .appendField("by");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("BlocklyApps.getMsg('Turtle_moveTooltip'");
  }
};
Blockly.JavaScript.draw_move = function () {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
    Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getFieldValue('DIR') +
    '(' + value + ', \'block_id_' + this.id + '\');\n';
};
Blockly.Blocks['draw_moveto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("move to");
    this.appendValueInput("XPOS")
      .setCheck("Number")
      .appendField("x");
    this.appendValueInput("YPOS")
      .setCheck("Number")
      .appendField("y");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turtle_moveToTooltip");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.draw_moveto = function () {
  // Generate JavaScript for moving to absolute position
  var xpos = Blockly.JavaScript.valueToCode(this, 'XPOS', Blockly.JavaScript.ORDER_NONE) || '0';
  var ypos = Blockly.JavaScript.valueToCode(this, 'YPOS', Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.moveTo(' + xpos + ',' + ypos + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Blocks['draw_turn'] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck("Number")
      .appendField("turn")
      .appendField(new Blockly.FieldDropdown([["right", "turnRight"], ["left", "turnLeft"]]), "DIR")
      .appendField("by");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("BlocklyApps.getMsg('Turtle_turnTooltip'");
  }
};
Blockly.JavaScript.draw_turn = function () {
  // Generate JavaScript for turning left or right.
  var value = Blockly.JavaScript.valueToCode(this, 'VALUE',
    Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Turtle.' + this.getFieldValue('DIR') +
    '(' + value + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Blocks['draw_width'] = {
  init: function () {
    this.appendValueInput("WIDTH")
      .setCheck("Number")
      .appendField("set pen width to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turtle_widthTooltip");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript.draw_width = function () {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(this, 'WIDTH',
    Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Turtle.penWidth(' + width + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Blocks['draw_pen'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["Pen Up", "penUp"], ["Pen Down", "penDown"]]), "PEN");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turtle_penTooltip");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.draw_pen = function () {
  // Generate JavaScript for pen up/down.
  return 'Turtle.' + this.getFieldValue('PEN') +
    '(\'block_id_' + this.id + '\');\n';
};

Blockly.Blocks['turtle_visibility'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["hide", "hideTurtle"], ["show", "showTurtle"]]), "VISIBILITY")
      .appendField("turtle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turtle_turtleVisibilityTooltip");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.turtle_visibility = function () {
  // Generate JavaScript for changing turtle visibility.
  return 'Turtle.' + this.getFieldValue('VISIBILITY') +
    '(\'block_id_' + this.id + '\');\n';
};

Blockly.Blocks['draw_print'] = {
  init: function () {
    this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField("Write");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turtle_printTooltip");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.draw_print = function () {
  // Generate JavaScript for printing text.
  var argument0 = String(Blockly.JavaScript.valueToCode(this, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'Turtle.drawPrint(' + argument0 + ', \'block_id_' +
    this.id + '\');\n';
};

//Create a new turtle object
Blockly.Blocks['create_turtle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Create turtle named:")
      .appendField(new Blockly.FieldTextInput("myTurtle"), "turtName");
    this.appendDummyInput()
      .appendField("with shape")
      .appendField(new Blockly.FieldDropdown([["turtle", "turtle"],["circle","circle"],["square","square"],["triangle","triangle"]]), "turtShape");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['create_turtle'] = function (block) {
  var turtName = block.getFieldValue('turtName');
  var turtShape = block.getFieldValue('turtShape');
  return 'Turtle.createTurtle(\'' + turtName + '\',\'' + turtShape + '\', \'block_id_' +     this.id + '\');\n';
};
//change the font 
Blockly.Blocks['draw_font'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Font: ")
      .appendField(new Blockly.FieldDropdown([["Arial", "Arial"], ["Courier New", "Courier New"], ["Georgia", "Georgia"], ["Impact", "Impact"], ["Times New Roman", "Times New Roman"], ["Trebuchet MS", "Trebuchet MS"], ["Verdana", "Verdana"]]), "FONT");
    this.appendDummyInput()
      .appendField("Font Size:")
      .appendField(new Blockly.FieldTextInput("18"), "FONTSIZE");
    this.appendDummyInput()
      .appendField("Font Style: ")
      .appendField(new Blockly.FieldDropdown([["normal", "normal"], ["italic", "italic"], ["bold", "bold"]]), "FONTSTYLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turtle_fontTooltip");
    this.setHelpUrl("Turtle_fontHelpUrl");
  }
};
Blockly.JavaScript.draw_font = function () {
  return 'Turtle.drawFont(\'' + this.getFieldValue('FONT') + '\',' +
    Number(this.getFieldValue('FONTSIZE')) + ',\'' +
    this.getFieldValue('FONTSTYLE') + '\', \'block_id_' +
    this.id + '\');\n';
};

//Change the turtle's pen color
Blockly.Blocks['draw_color'] = {
  init: function () {
    this.appendValueInput("COLOR")
      .setCheck("Colour")
      .appendField("Set turtle pen color to: ");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Turtle_colourTooltip");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.draw_color = function () {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.penColour(' + colour + ', \'block_id_' +
    this.id + '\');\n';
};

//Change the canvas' background color
Blockly.Blocks['bg_color'] = {
  init: function () {
    this.appendValueInput("BGCOLOR")
      .setCheck("Colour")
      .appendField("Set background color:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['bg_color'] = function (block) {
  var bgcolor = Blockly.JavaScript.valueToCode(this, 'BGCOLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.bgColor(' + bgcolor + ', \'block_id_' +
    this.id + '\');\n';
};
// Code to draw a circle
Blockly.Blocks['draw_circle'] = {
  init: function () {
    this.appendValueInput("RADIUS")
      .setCheck("Number")
      .appendField("draw circle with radius: ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['draw_circle'] = function (block) {
  var value_radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return 'Turtle.drawCircle(' + value_radius + ', \'block_id_' + this.id + '\');\n';
};

//Code to fill the shape with color
Blockly.Blocks['begin_fill'] = {
  init: function () {
    this.appendValueInput("FILLCOLOUR")
      .setCheck("Colour")
      .appendField("Begin fill.")
      .appendField("Fill shape with: ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['begin_fill'] = function (block) {
  var value_fillcolor = Blockly.JavaScript.valueToCode(block, 'FILLCOLOUR', Blockly.JavaScript.ORDER_ATOMIC);
  return 'Turtle.beginFill(' + value_fillcolor + ', \'block_id_' + this.id + '\');\n';
};

Blockly.Blocks['end_fill'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("End fill");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['end_fill'] = function (block) {
  return 'Turtle.endFill(\'block_id_' + this.id + '\');\n';
};