'use strict';


/**
 * Highlight the block (or clear highlighting).
 * @param {?string} id ID of block that triggered this action.
 */
function highlightBlock(id) {
  myWorkspace.highlightBlock(id);
}

var checkTimeout = function (opt_id) {
  if (opt_id) {
    Turtle.log.push([null, opt_id]);
  }
  if (Turtle.ticks-- < 0) {
    throw Infinity;
  }
};

var Turtle = {};
//var actionLog = [];
Turtle.Id = 0;
Turtle.speed = [];



$(function () {
  
  //var toolbox = document.getElementById('toolbox');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Turtle,code');

  var blocklyDiv = document.getElementById('blocklyDiv');
  //var visualization = document.getElementById('visualization');
  Turtle.HEIGHT = document.getElementById('drawing').clientHeight;
  Turtle.WIDTH = document.getElementById('drawing').clientHeight;
  Turtle.x = [Turtle.HEIGHT / 2];
  Turtle.y = [Turtle.HEIGHT / 2];
  Turtle.ctxTurtle = document.getElementById('drawing').getContext('2d');
  Turtle.ctxTurtle.font = 'normal 18pt Arial';
  Turtle.ctxBackground = document.getElementById('background').getContext('2d');

  Turtle.penDownValue = true;
  Turtle.beginFillValue = false;
});

Turtle.execute = function () {
  Turtle.log = [];
  Turtle.ticks = 1000000;
  
  var code = Blockly.JavaScript.workspaceToCode(myWorkspace);
 
  try {
    eval(code);
  } catch (e) {
     // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== Infinity) {
      alert(e);
    }
  }
  // Turtle.log now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  Turtle.reset();
  Turtle.pid = window.setTimeout(Turtle.animate, Turtle.speed[Turtle.Id]);
};

Turtle.animate = function () {
  // All tasks should be complete now.  Clean up the PID list.
  Turtle.pid = 0;
  var commands = Turtle.log.shift();
  if (!commands) {
    //Blockly.workspace.highlightBlock(null);
    return;
  }
  var command = commands.shift();
  highlightBlock(commands.pop());
  Turtle.step(command, commands);
  Turtle.pid = window.setTimeout(Turtle.animate, Turtle.speed[Turtle.Id]);
};

Turtle.reset = function () {
  // Starting location and heading of the turtle.
  //Turtle.log = [];
  $(".turtles").html("")
  Turtle.x = [Turtle.HEIGHT / 2];
  Turtle.y = [Turtle.HEIGHT / 2];
  Turtle.heading = 0;
  Turtle.ctxTurtle.moveTo(Turtle.x[Turtle.Id],Turtle.y[Turtle.Id])
  Turtle.penDownValue = true;
  Turtle.beginFillValue = false;

  Turtle.ctxTurtle.canvas.width = Turtle.ctxTurtle.canvas.width;
  Turtle.ctxTurtle.strokeStyle = '#000000';
  Turtle.ctxTurtle.fillStyle = '#000000';
  Turtle.ctxTurtle.lineWidth = 1;
  Turtle.ctxTurtle.lineCap = 'round';
  Turtle.ctxTurtle.font = 'normal 18pt Arial';
  Turtle.ctxBackground.canvas.width = Turtle.ctxTurtle.canvas.width;
  Turtle.ctxBackground.strokeStyle = '#000000';
  Turtle.ctxBackground.fillStyle = '#FFFFFF';
  Turtle.ctxBackground.lineWidth = 1;
  Turtle.ctxBackground.lineCap = 'round';
  Turtle.ctxBackground.font = 'normal 18pt Arial';
  Turtle.Id = 0;
  // Kill any task.
  if (Turtle.pid) {
    window.clearTimeout(Turtle.pid);
  }
  Turtle.pid = 0;
};

function rotateTurtle(turtId,angle){
  var tt = $("#turtle"+turtId);
  var currentAngle = parseInt(tt.attr("transform").split("(")[1].split(")")[0])
  angle = angle + currentAngle
  tt.attr("transform","rotate("+angle+")")
}

Turtle.step = function (command, values) {
  switch (command) {
    case 'CR':
      var turtId = Turtle.Id;
      var shape = values[1];
      $.ajax({
        url : "../icons/"+shape+".txt",
        type : "get",
        async: false,
        success : function(data) {
          data = data.split("*")[0] + turtId + data.split("*")[1];
          $(".turtles").html($(".turtles").html()+data.toString());
        },
      });
      Turtle.x.push(Turtle.HEIGHT/2)
      Turtle.y.push(Turtle.HEIGHT/2)
      rotateTurtle(turtId,90)
      $("#turtle"+turtId+" #shape").attr("fill","#00000000")
    
      $("#turtle"+turtId).css({
        "position": "absolute",
        "left": (Turtle.HEIGHT/2-12)+"px",
        "top": (Turtle.HEIGHT/2-12)+"px"
      });
      $("#turtle"+turtId + " #shape").css({  
        "stroke": "#000000",
        "stroke-width": "0.75px",
        "stroke-linejoin": "round",
      });

      Turtle.speed.push(100);
      //Turtle.Id += 1;
      break;
    case 'FD':  // Forward
      //update for multiple turtles
      var turtId = 0;
      if (! Turtle.beginFillValue){
        Turtle.ctxTurtle.beginPath();
        if (Turtle.penDownValue) {
          Turtle.ctxTurtle.lineTo(Turtle.x[turtId],Turtle.y[turtId]);
        } else{
          Turtle.ctxTurtle.moveTo(Turtle.x[turtId],Turtle.y[turtId]);
        }
      }
      var dist = values[0];
      var tt = $("#turtle"+turtId);
      var xPos = parseInt(tt.css("left").split("px")[0]);
      var yPos = parseInt(tt.css("top").split("px")[0]);
      var currentAngle = parseInt(tt.attr("transform").split("(")[1].split(")")[0])
      xPos = xPos - dist*Math.cos(currentAngle*Math.PI/180+Math.PI/2);
      Turtle.x[turtId] = Turtle.x[turtId] - dist*Math.cos(currentAngle*Math.PI/180+Math.PI/2);
      // Double check the out of edge code
      if (xPos > Turtle.HEIGHT-24){
        xPos = Turtle.HEIGHT-24;
      } else if (xPos < 24){
        xPos = 24
      }
      yPos = (yPos - dist*Math.sin(currentAngle*Math.PI/180+Math.PI/2));
      Turtle.y[turtId] = (Turtle.y[turtId] - dist*Math.sin(currentAngle*Math.PI/180+Math.PI/2))
      if (yPos > Turtle.HEIGHT){
        yPos = Turtle.HEIGHT;
      } else if (yPos < 0){
        yPos = 150;
      }
      
      if (Turtle.penDownValue && ! Turtle.beginFillValue) {
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId],Turtle.y[turtId]);
        Turtle.ctxTurtle.stroke(); 
      } else if (! Turtle.penDownValue && ! Turtle.beginFillValue){
        Turtle.ctxTurtle.moveTo(Turtle.x[turtId],Turtle.y[turtId]);
        Turtle.ctxTurtle.stroke(); 
      } else{
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId],Turtle.y[turtId]);
      }
      yPos = (yPos).toString() +"px";
      xPos = xPos.toString() +"px";
      tt.css({
        "position": "absolute",
        "left": xPos,
        "top": yPos
      });

      break;
    case 'RT':  // Rotate 
      turtId = 0;
      rotateTurtle(turtId,values[0])
      break;
    case 'MT': // Move 
      turtId = 0;
      var newX = values[0];
      var newY = -values[1];
      var tt = $("#turtle"+turtId);
      tt.css("left",(newX+188).toString()+"px");
      tt.css("top",(newY+188).toString()+"px");
      if (! Turtle.beginFillValue){
        if (Turtle.penDownValue) {
          Turtle.ctxTurtle.beginPath();
          Turtle.ctxTurtle.lineTo(Turtle.x[turtId],Turtle.y[turtId]);
        } else{
          Turtle.ctxTurtle.moveTo(Turtle.x[turtId],Turtle.y[turtId]);
        }
        Turtle.x[turtId] = newX + 200;
        Turtle.y[turtId] = newY + 200; 
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
        if (Turtle.penDownValue){
          Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
          Turtle.ctxTurtle.stroke();
        }else{
          Turtle.ctxTurtle.moveTo(Turtle.x[turtId], Turtle.y[turtId]);  
        }
        
      } else {
        Turtle.x[turtId] = newX + 200;
        Turtle.y[turtId] = newY + 200; 
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
      }
      break;
    case 'DP':  // Draw Print
      var turtId = 0;
      var tt = $("#turtle"+0);
      var currentAngle = parseInt(tt.attr("transform").split("(")[1].split(")")[0])
      Turtle.ctxTurtle.save();
      Turtle.ctxTurtle.translate(Turtle.x[turtId], Turtle.y[turtId]);
      Turtle.ctxTurtle.rotate(2 * Math.PI * (currentAngle) / 360);
      Turtle.ctxTurtle.fillStyle = $("#turtle"+turtId+" path").attr("fill").toString();
      Turtle.ctxTurtle.fillText(values[0], 0, 0);
      Turtle.ctxTurtle.restore();
      break;
    case 'DF': // Draw Font
      Turtle.ctxTurtle.font = values[2] + ' ' + values[1] + 'px ' + values[0];
      break;
    case 'PU':  // Pen Up
      Turtle.penDownValue = false;
      break;
    case 'PD':  // Pen Down
      Turtle.penDownValue = true;
      break;
    case 'PW':  // Pen Width
      Turtle.ctxTurtle.lineWidth = values[0];
      break;
    case 'PC':  // Pen Color
      Turtle.ctxTurtle.strokeStyle = values[0];
      Turtle.ctxTurtle.fillStyle = values[0];
      var turtId = 0;
      $("#turtle"+turtId+" path").css("stroke",values[0])
      break;
    case 'HT':  // Hide Turtle
      $("#turtle"+0).hide() 
      break;
    case 'ST':  // Show Turtle
      $("#turtle"+0).show()
      break;
    case 'BG': //change set background colour
      Turtle.ctxBackground.fillStyle = values[0];
      Turtle.ctxBackground.fillRect(0, 0, Turtle.HEIGHT, Turtle.WIDTH);
      break;
    case 'DC': //Draw a Circle
      var rad = values[0];
      var turtId = 0;
      var tt = $("#turtle"+turtId.toString());
      var currentAngle = (parseInt(tt.attr("transform").split("(")[1].split(")")[0]))*Math.PI/180;
      // Adjust where circle is drawn based off of current turtle angle
      var startY = Turtle.y[turtId]-rad*Math.sin(currentAngle);
      var startX = Turtle.x[turtId]+rad*Math.cos(currentAngle);
      Turtle.ctxTurtle.beginPath();
      if (Turtle.penDownValue) {
        Turtle.ctxTurtle.arc(startX, startY, rad, 0,2 * Math.PI);
        Turtle.ctxTurtle.stroke();
      } else {
        Turtle.ctxTurtle.arc(startX, startY, rad, 0, 2 * Math.PI);
      }
      break;
    case 'BF': //Begin fill
      Turtle.beginFillValue = true;
      var turtId = 0;
      $("#turtle"+turtId+" #shape").attr("fill",values[0])
      Turtle.ctxTurtle.fillStyle = values[0];
      Turtle.ctxTurtle.beginPath();
      if (Turtle.penDownValue){
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
      }
      else{
        Turtle.width1 = Turtle.ctxTurtle.lineWidth;
        Turtle.ctxTurtle.lineWidth = 0.000001;
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
        Turtle.penDownValue = true;
      }
      break;
    case 'EF':
      var turtId = 0;
      Turtle.ctxTurtle.closePath();
      Turtle.ctxTurtle.stroke();
      Turtle.ctxTurtle.fill();
      Turtle.beginFillValue = false;
      if (Turtle.width1 != Turtle.ctxTurtle.lineWidth){
        Turtle.ctxTurtle.lineWidth = Turtle.width1;
        Turtle.penDownValue = false;
      }
      //reset the fill color to clear
      $("#turtle"+turtId+" #shape").attr("fill","#00000000")
      break;
  }
};
Turtle.displayTurtle = function(){
  if (!$("#codeDisplay").css("width")) {
    $("#codeDisplay").css("width",$("#turtleDisplay").css("width")) ;
  }
  $("#codeDisplay").show();
  $("#turtleDisplay").hide();
  $("#displayCode").hide();
  $("#visualization").show();
}
Turtle.runButtonClick = function () {
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';

  Turtle.execute();
};

/**
 * Click the reset button.  Reset the Turtle.
 */
Turtle.resetButtonClick = function () {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  $("#inout").html("")
  Turtle.reset();
};

Turtle.createTurtle = function (name, shape, id) {
  Turtle.log.push(['CR', name, shape, id]);
};

Turtle.moveForward = function (distance, id) {
  Turtle.log.push(['FD', distance, id]);
};

Turtle.moveBackward = function (distance, id) {
  Turtle.log.push(['FD', -distance, id]);
};

Turtle.moveTo = function (xpos, ypos, id) {
  Turtle.log.push(['MT', xpos, ypos, id]);
};

Turtle.turnRight = function (angle, id) {
  Turtle.log.push(['RT', angle, id]);
};

Turtle.turnLeft = function (angle, id) {
  Turtle.log.push(['RT', -angle, id]);
};

Turtle.penUp = function (id) {
  Turtle.log.push(['PU', id]);
};

Turtle.penDown = function (id) {
  Turtle.log.push(['PD', id]);
};

Turtle.penWidth = function (width, id) {
  Turtle.log.push(['PW', Math.max(width, 0), id]);
};

Turtle.penColour = function (colour, id) {
  Turtle.log.push(['PC', colour, id]);
};

Turtle.bgColor = function (colour, id) {
  Turtle.log.push(['BG', colour, id]);
};

Turtle.hideTurtle = function (id) {
  Turtle.log.push(['HT', id]);
};

Turtle.showTurtle = function (id) {
  Turtle.log.push(['ST', id]);
};

Turtle.drawPrint = function (text, id) {
  Turtle.log.push(['DP', text, id]);
};

Turtle.drawFont = function (font, size, style, id) {
  Turtle.log.push(['DF', font, size, style, id])
};

Turtle.drawCircle = function (rad, id) {
  Turtle.log.push(['DC', rad, id])
};

Turtle.beginFill = function(colour, id) {
  Turtle.log.push(['BF', colour, id])
}

Turtle.endFill = function(id) {
  Turtle.log.push(['EF', id])
}