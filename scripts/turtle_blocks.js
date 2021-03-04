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

/* Create a new "turtle" type variable
Blockly.Blocks['create_turtle'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable(
          "VAR_NAME", ['turtle'], 'turtle'), "FIELD_NAME");
    this.setOutput(true, 'turtle');
    this.setColour(35);
    this.setTooltip("Create a turtle object");
  }
};
Blockly.JavaScript.create_turtle = function (block) {
  console.log(block)
  var value_turtlename = block.childBlocks_[0].inputList[0].fieldRow[0].selectedOption_[0];
  var code = 'Turtle.createTurtle(\''+value_turtlename+'\',\'block_id_' + this.id + '\')\n';
  return code;
};
Blockly.Python.create_turtle = function (block){
  var value_turtlename = block.childBlocks_[0].inputList[0].fieldRow[0].selectedOption_[0];
  return value_turtlename+"=turtle.Turtle()\n"
}
Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'turtle')
Blockly.JavaScript['create_turtle'] = function(block) {
  // Variable getter.
  var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};*/

// Create a new turtle and save it to a variable
Blockly.Blocks['create_turtle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(" = turtle.Turtle()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.create_turtle = function (block) {
  var value_turtlename = block.inputList[0].fieldRow[0].selectedOption_[0];
  var code = 'Turtle.createTurtle(\'' + value_turtlename + '\',\'block_id_' + this.id + '\')\n';
  return code;
};
Blockly.Python.create_turtle = function (block) {
  var value_turtlename = block.inputList[0].fieldRow[0].selectedOption_[0];
  return value_turtlename + "=turtle.Turtle()\n"
}

// Move some distance either forward or backward
Blockly.Blocks['draw_move'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["forward", "forward"], ["backward", "backward"]]), "DIR")
      .appendField("(");
    this.appendValueInput("DIST")
      .setCheck("Number")
    this.appendDummyInput()
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['draw_move'] = function (block) {
  //Make it so it doesn't matter what order they attached the input blocks
  var value_turtlename = block.inputList[0].fieldRow[0].selectedOption_[0];
  var dropdown_dir = block.getFieldValue('DIR');
  var value_dist = Blockly.JavaScript.valueToCode(block, 'DIST', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Turtle.' + dropdown_dir +
    '(\'' + value_turtlename + '\',' + value_dist + ', \'block_id_' + this.id + '\');\n';
  return code;
};
Blockly.Python['draw_move'] = function (block) {
  var value_turtlename = block.inputList[0].fieldRow[0].selectedOption_[0];
  var dropdown_dir = block.getFieldValue('DIR');
  var value_dist = Blockly.JavaScript.valueToCode(block, 'DIST', Blockly.JavaScript.ORDER_ATOMIC);
  return value_turtlename + "." + dropdown_dir + "(" + value_dist + ")\n";
};

//Rotate the turtle
Blockly.Blocks['draw_turn'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["left", "left"], ["right", "right"]]), "DIR")
      .appendField("(")
      .appendField(new Blockly.FieldAngle(90), 'ANGLE');
    this.appendDummyInput()
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['draw_turn'] = function (block) {
  var value_turtlename = block.inputList[0].fieldRow[0].selectedOption_[0];
  var dropdown_dir = block.getFieldValue('DIR');
  var value_angle = block.getFieldValue('ANGLE');
  // TODO: Assemble JavaScript into code variable.
  var code = 'Turtle.' + dropdown_dir +
    '(\'' + value_turtlename + '\',' + value_angle + ', \'block_id_' + this.id + '\');\n';
  return code;
};
Blockly.Python.draw_turn = function (block) {
  var value_turtlename = block.inputList[0].fieldRow[0].selectedOption_[0];
  var dropdown_dir = block.getFieldValue('DIR');
  var value_angle = block.getFieldValue('ANGLE');
  return value_turtlename + "." + dropdown_dir + "(" + value_angle + ")\n";
};

//Move turtle to
Blockly.Blocks['draw_moveto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".goto(");
    this.appendValueInput("XPOS")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField(",");
    this.appendValueInput("YPOS")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['draw_moveto'] = function (block) {
  try {
    var name = block.childBlocks_[1].inputList[0].fieldRow[0].selectedOption_[0];
  } catch{
    try {
      var name = block.childBlocks_[2].inputList[0].fieldRow[0].selectedOption_[0];
    } catch{
      var name = block.childBlocks_[0].inputList[0].fieldRow[0].selectedOption_[0];
    }
  }
  var xpos = Blockly.JavaScript.valueToCode(block, 'XPOS', Blockly.JavaScript.ORDER_ATOMIC);
  var ypos = Blockly.JavaScript.valueToCode(block, 'YPOS', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'Turtle.moveTo(\'' + name + '\',' + xpos + ',' + ypos + ', \'block_id_' + this.id + '\');\n';
  return code;
};
Blockly.Python.draw_moveto = function (block) {
  try {
    var name = block.childBlocks_[1].inputList[0].fieldRow[0].selectedOption_[0];
  } catch{
    try {
      var name = block.childBlocks_[2].inputList[0].fieldRow[0].selectedOption_[0];
    } catch{
      var name = block.childBlocks_[0].inputList[0].fieldRow[0].selectedOption_[0];
    }
  }
  var xpos = Blockly.JavaScript.valueToCode(block, 'XPOS', Blockly.JavaScript.ORDER_ATOMIC);
  var ypos = Blockly.JavaScript.valueToCode(block, 'YPOS', Blockly.JavaScript.ORDER_ATOMIC);
  return name + ".goto(" + xpos + "," + ypos + ")\n";
};

//
Blockly.Blocks['draw_circle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name');
    this.appendValueInput("RADIUS")
      .setCheck("Number")
      .appendField(".circle(");
    this.appendDummyInput()
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("draw a circle");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['draw_circle'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var value_radius = Blockly.JavaScript.valueToCode(this, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return 'Turtle.drawCircle(\'' + name + '\',' + value_radius + ', \'block_id_' + this.id + '\');\n';
};
Blockly.Python['draw_circle'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var value_radius = Blockly.JavaScript.valueToCode(this, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return name + ".circle(" + value_radius + ")\n";
}

Blockly.Blocks['draw_stamp'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".stamp()");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("stamp an image of the turtle");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['draw_stamp'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  return 'Turtle.drawStamp(\'' + name + '\', \'block_id_' + this.id + '\');\n';
};
Blockly.Python['draw_stamp'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var value_radius = Blockly.JavaScript.valueToCode(this, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return name + ".stamp()\n";
};

//Set the turtle's speed
Blockly.Blocks['turtle_speed'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name');
    this.appendValueInput("SPEED")
      .setCheck("Number")
      .appendField(".speed(");
    this.appendDummyInput()
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("Set the turtle's speed");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['turtle_speed'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var speed = Blockly.JavaScript.valueToCode(this, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return 'Turtle.turt_speed(\'' + name + '\',' + speed + ', \'block_id_' + this.id + '\');\n';
};
Blockly.Python['turtle_speed'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var speed = Blockly.JavaScript.valueToCode(this, 'SPEED', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return name + ".speed(" + speed + ")\n";
}

//PEN CONTROL BLOCKS
//Penup/pendown
Blockly.Blocks['draw_pen'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name');
    this.appendDummyInput()
      .appendField(".")
      .appendField(new Blockly.FieldDropdown([["penup", "penup"], ["pendown", "pendown"]]), "PEN")
      .appendField("( )");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("Lift up the pen or set the pen down");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.draw_pen = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  // Generate JavaScript for pen up/down.
  return 'Turtle.' + this.getFieldValue('PEN') +
    '(\'' + name + '\',\'block_id_' + this.id + '\');\n';
};
Blockly.Python.draw_pen = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  return name + "." + this.getFieldValue('PEN') + "()\n";
};

//Set the pen width
Blockly.Blocks['draw_width'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name');
    this.appendDummyInput()
      .appendField(".pensize(");
    this.appendValueInput("WIDTH")
      .setCheck("Number");
    this.appendDummyInput()
      .appendField(")")
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("Change the turtle's pen width");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.draw_width = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return 'Turtle.penWidth(\'' + name + '\','+ width +',\'block_id_' + block.id + '\');\n';
};
Blockly.Python.draw_width = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC) || '0';
  return name + ".penwidth(" + width + ")\n";
};


//COLOR CONTROL BLOCKS
//Change the canvas' background color
//Change the turtle's pen color
Blockly.Blocks['pen_color'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name');
    this.appendValueInput("COLOR")
      .setCheck("Colour")
      .appendField(".pencolor(");
    this.appendDummyInput()
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("Set's the pen color and line color for the turtle");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['pen_color'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.penColour(\''+name+'\',' + colour + ', \'block_id_' +
    this.id + '\');\n';
};
Blockly.Python['pen_color'] = function(block){
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return name + ".pencolor("+colour+")\n";
};

//Set the turtle's fill color
Blockly.Blocks['fill_color'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name');
    this.appendValueInput("COLOR")
      .setCheck("Colour")
      .appendField(".fillcolor(");
    this.appendDummyInput()
      .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(35);
    this.setTooltip("Set the fill color for the turtle");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['fill_color'] = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.fillColour(\''+name+'\',' + colour + ', \'block_id_' +
    this.id + '\');\n';
};
Blockly.Python['fill_color'] = function(block){
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var colour = Blockly.JavaScript.valueToCode(this, 'COLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return name + ".fillcolor("+colour+")\n";
};

Blockly.Blocks["begin_fill"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".begin_fill()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(35);
    this.setTooltip("Begin filling a shape");
    this.setHelpUrl("");
    
  }
};
Blockly.JavaScript.begin_fill = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  return 'Turtle.beginFill(\'' + name + '\', \'block_id_' + this.id + '\');\n';
};
Blockly.Python.begin_fill = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  return name+".begin_fill()\n";
}

Blockly.Blocks["end_fill"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".end_fill()");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(35);
    this.setTooltip("End fill and fill in the shape");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.end_fill = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  return 'Turtle.endFill(\''+name+'\', \'block_id_' + this.id + '\');\n';
};
Blockly.Python.end_fill = function (block) {
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  return name+".end_fill()\n";
}

//Write Text
Blockly.Blocks['draw_print'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
    this.appendValueInput("TEXT")
      .setCheck("String")
      .appendField(".write(");
    this.appendDummyInput()
      .appendField(")");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(35);
    this.setTooltip("Write the text at the turtle's location");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['draw_print'] = function (block) {
  // Generate JavaScript for printing text.
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var argument0 = String(Blockly.JavaScript.valueToCode(this, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'Turtle.drawPrint(\''+ name + '\',' + argument0 + ', \'block_id_' +
    this.id + '\');\n';
};
Blockly.Python['draw_print'] = function (block){
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var argument0 = String(Blockly.JavaScript.valueToCode(this, 'TEXT',
    Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return name+".write("+argument0+")\n";
};


//Turtle Appearance
//Set the turtle's shape
Blockly.Blocks['turtle_shape'] = { 
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".shape(");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["turtle", "turtle"], ["triangle", "triangle"],["square", "square"],["circle", "circle"]]), "SHAPE")
      .appendField(")")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(35);
    this.setTooltip("Set the turtle's shape");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['turtle_shape'] = function (block) {
  // Generate JavaScript for printing text.
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var shape = this.getFieldValue('SHAPE')
  var code = 'Turtle.set_shape(\''+ name + '\',\'' + shape + '\', \'block_id_' +
    this.id + '\');\n';
  return code;
};
Blockly.Python['turtle_shape'] = function (block){
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var shape = this.getFieldValue('SHAPE')
  return name+".write("+shape+")\n";
};

//Show/Hide turtle
Blockly.Blocks['turtle_visibility'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldVariable('myTurtle'), 'name')
      .appendField(".shape(");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["showturtle", "showturtle"], ["hideturtle", "hideturtle"]]), "HIDE")
      .appendField(")")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(35);
    this.setTooltip("Show or hide the turtle");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript['turtle_visibility'] = function (block) {
  // Generate JavaScript for printing text.
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var visibility = this.getFieldValue('HIDE')
  var code = 'Turtle.'+visibility+'(\''+ name + '\',\'block_id_' +
    this.id + '\');\n';
  return code;
};
Blockly.Python['turtle_visibility'] = function (block){
  var name = block.inputList[0].fieldRow[0].selectedOption_[0];
  var visibility = this.getFieldValue('HIDE')
  return name+"."+visibility+"()\n";
};

//Change the canvas' background color
Blockly.Blocks['bg_color'] = {
  init: function () {
    this.appendValueInput("BGCOLOR")
      .setCheck("Colour")
      .appendField("wn.bgcolor(");
    this.appendDummyInput()
      .appendField(")")
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setColour(35);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
Blockly.JavaScript.bg_color = function () {
  var bgcolor = Blockly.JavaScript.valueToCode(this, 'BGCOLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Turtle.bgColor(' + bgcolor + ', \'block_id_' +
    this.id + '\');\n';
};
Blockly.Python.bg_color = function () {
  var bgcolor = Blockly.JavaScript.valueToCode(this, 'BGCOLOR',
    Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return "wn = turtle.Screen()\nwn.bgcolor("+bgcolor+")\n";
};