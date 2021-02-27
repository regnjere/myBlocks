/**
 * Blockly Apps: Turtle Graphics
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
 * @fileoverview JavaScript for Blockly's Turtle application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var BlocklyApps = {};
/**
 * Highlight the block (or clear highlighting).
 * @param {?string} id ID of block that triggered this action.
 */
BlocklyApps.highlight = function (id) {
  if (id) {
    var m = id.match(/^block_id_(\d+)$/);
    if (m) {
      id = m[1];
    }
  }
  Blockly.mainWorkspace.highlightBlock(id);
};
BlocklyApps.checkTimeout = function (opt_id) {
  if (opt_id) {
    BlocklyApps.log.push([null, opt_id]);
  }
  if (BlocklyApps.ticks-- < 0) {
    throw Infinity;
  }
};

var Turtle = {};
document.addEventListener('DOMContentLoaded', function() {
  Turtle.HEIGHT = document.getElementById('display').clientHeight;
  Turtle.WIDTH = document.getElementById('display').clientHeight;
}, false);

/**
 * PID of animation task currently executing.
 */
Turtle.pid = 0;

/**
 * Should the turtle be drawn?
 */
Turtle.visible = true;

/**
 * Initialize Blockly and the turtle.  Called on page load.
 */
Turtle.init = function () {
  var toolbox = document.getElementById('toolbox');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Turtle,code');

  var blocklyDiv = document.getElementById('blocklyDiv');
  var visualization = document.getElementById('visualization');
  
  Turtle.ctxDisplay = document.getElementById('display').getContext('2d');
  Turtle.ctxScratch = document.getElementById('scratch').getContext('2d');
  Turtle.reset();
};

window.addEventListener('load', Turtle.init);

/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
Turtle.reset = function () {
  // Starting location and heading of the turtle.
  Turtle.x = Turtle.HEIGHT / 2;
  Turtle.y = Turtle.WIDTH / 2;
  Turtle.heading = 0;
  Turtle.penDownValue = true;
  Turtle.visible = true;
  Turtle.beginFillValue = false

  // Clear the display.
  Turtle.ctxScratch.canvas.width = Turtle.ctxScratch.canvas.width;
  Turtle.ctxScratch.strokeStyle = '#000000';
  Turtle.ctxScratch.fillStyle = '#000000';
  Turtle.ctxScratch.lineWidth = 1;
  Turtle.ctxScratch.lineCap = 'round';
  Turtle.ctxScratch.font = 'normal 18pt Arial';
  Turtle.display();

  // Kill any task.
  if (Turtle.pid) {
    window.clearTimeout(Turtle.pid);
  }
  Turtle.pid = 0;
};

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
Turtle.display = function () {
  Turtle.ctxDisplay.globalCompositeOperation = 'copy';
  Turtle.ctxDisplay.drawImage(Turtle.ctxScratch.canvas, 0, 0);
  Turtle.ctxDisplay.globalCompositeOperation = 'source-over';
  // Draw the turtle.
  if (Turtle.visible) {
    // Make the turtle the colour of the pen.
    Turtle.ctxDisplay.strokeStyle = Turtle.ctxScratch.strokeStyle;
    Turtle.ctxDisplay.fillStyle = Turtle.ctxScratch.fillStyle;
    /*var myTurtle = new Image();
    myTurtle = function() {
      Turtle.ctxDisplay.drawImage(myTurtle, 200, 200);
    }
    myTurtle.src = "/icons/turtle.svg";*/
    
    // Draw the turtle body.
    var radius = Turtle.ctxScratch.lineWidth / 2 + 10;
    Turtle.ctxDisplay.beginPath();
    Turtle.ctxDisplay.arc(Turtle.x, Turtle.y, radius, 0, 2 * Math.PI, false);
    Turtle.ctxDisplay.lineWidth = 3;
    Turtle.ctxDisplay.stroke();

    // Draw the turtle head.
    var WIDTH = 0.3;
    var HEAD_TIP = 10;
    var ARROW_TIP = 4;
    var BEND = 6;
    var radians = 2 * Math.PI * Turtle.heading / 360;
    var tipX = Turtle.x + (radius + HEAD_TIP) * Math.sin(radians);
    var tipY = Turtle.y - (radius + HEAD_TIP) * Math.cos(radians);
    radians -= WIDTH;
    var leftX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
    var leftY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
    radians += WIDTH / 2;
    var leftControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
    var leftControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH;
    var rightControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
    var rightControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH / 2;
    var rightX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
    var rightY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
    Turtle.ctxDisplay.beginPath();
    Turtle.ctxDisplay.moveTo(tipX, tipY);
    Turtle.ctxDisplay.lineTo(leftX, leftY);
    Turtle.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
      rightControlX, rightControlY, rightX, rightY);
    Turtle.ctxDisplay.closePath();
    //Turtle.ctxDisplay.fillStyle = "black";
    Turtle.ctxDisplay.stroke();
  }
};

/**
 * Click the run button.  Start the program.
 */
Turtle.runButtonClick = function () {
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  
  //document.getElementById('spinner').style.visibility = 'visible';
  //Blockly.mainWorkspace.traceOn(true);
  Turtle.execute();
};

/**
 * Click the reset button.  Reset the Turtle.
 */
Turtle.resetButtonClick = function () {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  $("#inout").html("")
  //Blockly.mainWorkspace.traceOn(false);
  Turtle.reset();
};


/**
 * Execute the user's code.  Heaven help us...
 */
Turtle.execute = function () {
  BlocklyApps.log = [];
  BlocklyApps.ticks = 1000000;

  var code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    eval(code);
  } catch (e) {
    // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== Infinity) {
      alert(e);
    }
  }
  /*Display the log
  /alert(BlocklyApps.log)*/
  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  Turtle.reset();
  Turtle.pid = window.setTimeout(Turtle.animate, 1000);
};

/**
 * Iterate through the recorded path and animate the turtle's actions.
 */
Turtle.animate = function () {

  // All tasks should be complete now.  Clean up the PID list.
  Turtle.pid = 0;

  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
    //document.getElementById('spinner').style.visibility = 'hidden';
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  var command = tuple.shift();
  //alert(tuple)
  BlocklyApps.highlight(tuple.pop());
  Turtle.step(command, tuple);
  Turtle.display();

  // Scale the speed non-linearly, to give better precision at the fast end.
  var stepSpeed = 1000;//1000 * Math.pow(Turtle.speedSlider.getValue(), 2);
  Turtle.pid = window.setTimeout(Turtle.animate, stepSpeed);
};

/**
 * Execute one step.
 * @param {string} command Logo-style command (e.g. 'FD' or 'RT').
 * @param {!Array} values List of arguments for the command.
 */
Turtle.step = function (command, values) {
  switch (command) {
    case 'FD':  // Forward
      if (! Turtle.beginFillValue){
        Turtle.ctxScratch.beginPath();
        if (Turtle.penDownValue) {
          Turtle.ctxScratch.moveTo(Turtle.x, Turtle.y);
        }
      }
      var distance = values[0];
      if (distance) {
        Turtle.x += distance * Math.sin(2 * Math.PI * Turtle.heading / 360);
        Turtle.y -= distance * Math.cos(2 * Math.PI * Turtle.heading / 360);
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (Turtle.penDownValue) {
        Turtle.ctxScratch.lineTo(Turtle.x, Turtle.y);
        Turtle.ctxScratch.stroke(); 
      }
      break;
    case 'RT':  // Right Turn
      Turtle.heading += values[0];
      Turtle.heading %= 360;
      if (Turtle.heading < 0) {
        Turtle.heading += 360;
      }
      break;
    case 'MT': // Move To
      if (! Turtle.beginFillValue){
        Turtle.ctxScratch.beginPath();
      }
      if (Turtle.penDownValue) {
        if (! Turtle.beginFillValue){
          Turtle.ctxScratch.moveTo(Turtle.x, Turtle.y);
        }
        else {
          Turtle.ctxScratch.lineTo(Turtle.x, Turtle.y);
        }
        Turtle.x = values[0] + 200;
        Turtle.y = values[1] + 200;
        Turtle.ctxScratch.lineTo(values[0] + 200, values[1] + 200);
        Turtle.ctxScratch.stroke();
      } else {
        Turtle.x = values[0] + 200;
        Turtle.y = values[1] + 200;
      }
      break;
    case 'DP':  // Draw Print
      Turtle.ctxScratch.save();
      Turtle.ctxScratch.translate(Turtle.x, Turtle.y);
      Turtle.ctxScratch.rotate(2 * Math.PI * (Turtle.heading - 90) / 360);
      Turtle.ctxScratch.fillText(values[0], 0, 0);
      Turtle.ctxScratch.restore();
      break;
    case 'DF': // Draw Font
      Turtle.ctxScratch.font = values[2] + ' ' + values[1] + 'px ' + values[0];
      break;
    case 'PU':  // Pen Up
      Turtle.penDownValue = false;
      break;
    case 'PD':  // Pen Down
      Turtle.penDownValue = true;
      break;
    case 'PW':  // Pen Width
      Turtle.ctxScratch.lineWidth = values[0];
      break;
    case 'PC':  // Pen Colour
      Turtle.ctxScratch.strokeStyle = values[0];
      Turtle.ctxScratch.fillStyle = values[0];
      break;
    case 'HT':  // Hide Turtle
      Turtle.visible = false;
      break;
    case 'ST':  // Show Turtle
      Turtle.visible = true;
      break;
    case 'BG': //change set background colour
      Turtle.ctxScratch.fillStyle = values[0];
      Turtle.ctxScratch.fillRect(0, 0, 400, 400);
      break;
    case 'DC': //Draw a Circle
      Turtle.ctxScratch.beginPath();
      if (Turtle.penDownValue) {
        Turtle.ctxScratch.arc(Turtle.x, Turtle.y, 40, 0, 2 * Math.PI);
        Turtle.ctxScratch.stroke();
      } else {
        Turtle.ctxScratch.arc(Turtle.x, Turtle.y, 40, 0, 2 * Math.PI);
      }
      break;
    case 'BF': //Begin fill
      Turtle.beginFillValue = true;
      Turtle.ctxScratch.fillStyle = values[0]
      Turtle.ctxScratch.beginPath();
      if (Turtle.penDownValue){
        Turtle.ctxScratch.lineTo(Turtle.x, Turtle.y);
      }
      else{
        Turtle.width1 = Turtle.ctxScratch.lineWidth;
        Turtle.ctxScratch.lineWidth = 0.000001;
        Turtle.ctxScratch.lineTo(Turtle.x, Turtle.y);
        Turtle.penDownValue = true
      }
      break;
    case 'EF':
      Turtle.ctxScratch.closePath();
      Turtle.ctxScratch.fill();
      Turtle.beginFillValue = false;
      if (Turtle.width1 != Turtle.ctxScratch.lineWidth){
        Turtle.ctxScratch.lineWidth = Turtle.width1;
        Turtle.penDownValue = false;
      }
      break;
  }
};

/**
 * Save an image of the SVG canvas.
 */
Turtle.createImageLink = function () {
  var imgLink = document.getElementById('downloadImageLink');
  imgLink.setAttribute('href',
    document.getElementById('display').toDataURL('image/png'));
  var temp = window.onbeforeunload;
  window.onbeforeunload = null;
  imgLink.click();
  window.onbeforeunload = temp;
};

// Turtle API.

Turtle.moveForward = function (distance, id) {
  BlocklyApps.log.push(['FD', distance, id]);
};

Turtle.moveBackward = function (distance, id) {
  BlocklyApps.log.push(['FD', -distance, id]);
};

Turtle.moveTo = function (xpos, ypos, id) {
  BlocklyApps.log.push(['MT', xpos, ypos, id]);
};

Turtle.turnRight = function (angle, id) {
  BlocklyApps.log.push(['RT', angle, id]);
};

Turtle.turnLeft = function (angle, id) {
  BlocklyApps.log.push(['RT', -angle, id]);
};

Turtle.penUp = function (id) {
  BlocklyApps.log.push(['PU', id]);
};

Turtle.penDown = function (id) {
  BlocklyApps.log.push(['PD', id]);
};

Turtle.penWidth = function (width, id) {
  BlocklyApps.log.push(['PW', Math.max(width, 0), id]);
};

Turtle.penColour = function (colour, id) {
  BlocklyApps.log.push(['PC', colour, id]);
};

Turtle.bgColor = function (colour, id) {
  BlocklyApps.log.push(['BG', colour, id]);
};

Turtle.hideTurtle = function (id) {
  BlocklyApps.log.push(['HT', id]);
};

Turtle.showTurtle = function (id) {
  BlocklyApps.log.push(['ST', id]);
};

Turtle.drawPrint = function (text, id) {
  BlocklyApps.log.push(['DP', text, id]);
};

Turtle.drawFont = function (font, size, style, id) {
  BlocklyApps.log.push(['DF', font, size, style, id])
};

Turtle.drawCircle = function (rad, id) {
  BlocklyApps.log.push(['DC', rad, id])
};

Turtle.beginFill = function(colour, id) {
  BlocklyApps.log.push(['BF', colour, id])
}

Turtle.endFill = function(id) {
  BlocklyApps.log.push(['EF', id])
}