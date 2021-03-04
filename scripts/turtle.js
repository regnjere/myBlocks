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

//Initialization function
$(function () {
  
  //var toolbox = document.getElementById('toolbox');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = 'checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Turtle,code');
  Turtle.Id = 0;
  var blocklyDiv = document.getElementById('blocklyDiv');
  //var visualization = document.getElementById('visualization');
  Turtle.HEIGHT = document.getElementById('drawing').clientHeight;
  Turtle.WIDTH = document.getElementById('drawing').clientHeight;
  Turtle.x = [Turtle.HEIGHT / 2];
  Turtle.y = [Turtle.HEIGHT / 2];
  Turtle.lineWidth = [];
  Turtle.ctxTurtle = document.getElementById('drawing').getContext('2d');
  Turtle.ctxTurtle.font = 'normal 18pt Arial';
  Turtle.ctxBackground = document.getElementById('background').getContext('2d');
  Turtle.stampNum = 0;
  Turtle.strokeStyle=[];
  Turtle.fillStyle=[];
  Turtle.speed = [];
  Turtle.penDownValue = true;
  Turtle.beginFillValue = false;
  Turtle.turtles = {}; //all turtles will have key/value pairs of name and Turtle.Id
});

//Execute the user's code
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
  // To Do update speed
  Turtle.reset();
  Turtle.pid = window.setTimeout(Turtle.animate, Turtle.speed[Turtle.Id]);
};

//Animate the turtle's movements
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
  Turtle.pid = window.setTimeout(Turtle.animate, 500);
};

//Reset the turtles' values and clear the drawing area
Turtle.reset = function () {
  // Starting location and heading of the turtle.
  $(".turtles").html("")
  //Reset Turtle.Id and kill turtles, resetting all turtle values
  Turtle.Id = 0;
  Turtle.turtles = {};
  Turtle.speed = [];
  Turtle.shape = [];
  Turtle.lineWidth = [];
  Turtle.x = [];
  Turtle.y = [];
  Turtle.heading = 0;
  Turtle.ctxTurtle.moveTo(Turtle.x[Turtle.Id],Turtle.y[Turtle.Id])
  Turtle.penDownValue = [true];
  Turtle.beginFillValue = false;
  //Clear and reset the canvas
  Turtle.ctxTurtle.canvas.width = Turtle.ctxTurtle.canvas.width;
  Turtle.ctxTurtle.strokeStyle = '#000000';
  Turtle.ctxTurtle.fillStyle = '#000000';
  Turtle.ctxTurtle.lineWidth = 1;
  Turtle.ctxTurtle.lineCap = 'round';
  Turtle.ctxTurtle.font = 'normal 18pt Arial';
  Turtle.ctxBackground.canvas.width = Turtle.ctxTurtle.canvas.width;
  Turtle.ctxBackground.strokeStyle = '#000000';
  Turtle.ctxBackground.fillStyle = '#FFFFFF';
  Turtle.strokeStyle=[];
  Turtle.fillStyle=[];
  Turtle.ctxBackground.lineWidth = 1;
  Turtle.ctxBackground.lineCap = 'round';
  Turtle.ctxBackground.font = 'normal 18pt Arial';

  // Kill any task.
  if (Turtle.pid) {
    window.clearTimeout(Turtle.pid);
  }
  Turtle.pid = 0;
};

//Rotate the turtle the required number of degrees
function rotateTurtle(turtId,angle){
  var tt = $("#turtle"+turtId);
  var currentAngle = parseInt(tt.attr("transform").split("(")[1].split(")")[0]);
  angle = angle + currentAngle;
  tt.attr("transform","rotate("+angle+")")
}

Turtle.step = function (command, values) {
  switch (command) {
    //Turtle Commands
    case 'CR':
      //Add new turtle to the Turtle.turtles object  
      Turtle.turtles[values[0]] = Turtle.Id
      Turtle.shape.push("turtle");
      $.ajax({
        url : "../icons/turtle.txt",
        type : "get",
        async: false,
        success : function(data) {
          data = data.split("*")[0] + Turtle.Id + data.split("*")[1];
          $(".turtles").append(data.toString());
        },
      });
      Turtle.strokeStyle.push('#000000');
      Turtle.fillStyle.push('#000000');
      Turtle.x.push(Turtle.HEIGHT/2);
      Turtle.y.push(Turtle.HEIGHT/2);
      Turtle.lineWidth.push(1);
      Turtle.penDownValue.push(true);
      rotateTurtle(Turtle.Id,90)
      $("#turtle"+Turtle.Id+" #shape").attr("fill","#000000")
      $("#turtle"+Turtle.Id).css({
        "position": "absolute",
        "left": (Turtle.HEIGHT/2-12)+"px",
        "top": (Turtle.HEIGHT/2-12)+"px"
      });
      $("#turtle"+Turtle.Id + " #shape").css({  
        "stroke": "#000000",
        "stroke-width": "0.75px",
        "stroke-linejoin": "round",
      });

      Turtle.speed.push(500);
      Turtle.Id += 1;

      break;
    case 'FD':  // Forward
      var turtId = Turtle.turtles[values[0]];
      Turtle.ctxTurtle.lineWidth = Turtle.lineWidth[turtId];
      Turtle.ctxTurtle.strokeStyle = Turtle.strokeStyle[turtId];
      Turtle.ctxTurtle.fillStyle = Turtle.fillStyle[turtId];
      if (! Turtle.beginFillValue){
        Turtle.ctxTurtle.beginPath();
        if (Turtle.penDownValue[turtId]) {
          Turtle.ctxTurtle.lineTo(Turtle.x[turtId],Turtle.y[turtId]);
        } else{
          Turtle.ctxTurtle.moveTo(Turtle.x[turtId],Turtle.y[turtId]);
        }
      }
      var dist = values[1];
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
      
      if (Turtle.penDownValue[turtId] && ! Turtle.beginFillValue) {
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId],Turtle.y[turtId]);
        Turtle.ctxTurtle.stroke(); 
      } else if (! Turtle.penDownValue[turtId] && ! Turtle.beginFillValue){
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
      var turtId = Turtle.turtles[values[0]];
      rotateTurtle(turtId,values[1])
      break;
    case 'MT': // Move 
      var turtId = Turtle.turtles[values[0]];
      var newX = values[1];
      var newY = -values[2];
      var tt = $("#turtle"+turtId);
      tt.css("left",(newX+Turtle.HEIGHT/2-12).toString()+"px");
      tt.css("top",(newY+Turtle.HEIGHT/2-12).toString()+"px");
      if (! Turtle.beginFillValue){
        if (Turtle.penDownValue[turtId]) {
          Turtle.ctxTurtle.beginPath();
          Turtle.ctxTurtle.lineTo(Turtle.x[turtId],Turtle.y[turtId]);
        } else{
          Turtle.ctxTurtle.moveTo(Turtle.x[turtId],Turtle.y[turtId]);
        }
        Turtle.x[turtId] = newX + Turtle.HEIGHT/2;
        Turtle.y[turtId] = newY + Turtle.HEIGHT/2; 
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
        if (Turtle.penDownValue[turtId]){
          Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
          Turtle.ctxTurtle.stroke();
        }else{
          Turtle.ctxTurtle.moveTo(Turtle.x[turtId], Turtle.y[turtId]);  
        }
        
      } else {
        Turtle.x[turtId] = newX + Turtle.HEIGHT/2;
        Turtle.y[turtId] = newY + Turtle.HEIGHT/2; 
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
      }
      break;
    case 'DC': //Draw a Circle
      var turtId = Turtle.turtles[values[0]];
      var rad = values[1];
      var tt = $("#turtle"+turtId.toString());
      var currentAngle = (parseInt(tt.attr("transform").split("(")[1].split(")")[0]))*Math.PI/180;
      // Adjust where circle is drawn based off of current turtle angle
      var startY = Turtle.y[turtId]-rad*Math.sin(currentAngle);
      var startX = Turtle.x[turtId]+rad*Math.cos(currentAngle);
      Turtle.ctxTurtle.beginPath();
      if (Turtle.penDownValue[turtId]) {
        Turtle.ctxTurtle.arc(startX, startY, rad, 0,2 * Math.PI);
        Turtle.ctxTurtle.stroke();
      } else {
        Turtle.ctxTurtle.arc(startX, startY, rad, 0, 2 * Math.PI);
      }
      break;
    case 'DS': // Stamp
      var turtId = Turtle.turtles[values[0]];
      var shape = Turtle.turtles[turtId]
      $.ajax({
        url : "../icons/"+shape+".txt",
        type : "get",
        async: false,
        success : function(data) {
          data = data.split("*")[0] + "_"+Turtle.stampNum+turtId + data.split("*")[1];
          $(".turtles").append(data.toString());
        },
      });
      $("#turtle"+"_"+Turtle.stampNum+turtId).css({
        "position": "absolute",
        "left": Turtle.x[turtId]-12+"px",
        "top": Turtle.y[turtId]-12+"px"
      });
      $("#turtle"+"_"+Turtle.stampNum+turtId+" #shape").attr("fill",Turtle.fillStyle[turtId]);
      $("#turtle"+"_"+Turtle.stampNum+turtId + " #shape").css({  
        "stroke": Turtle.strokeStyle[turtId],
        "stroke-width": "0.75px",
        "stroke-linejoin": "round",
      });
      var currentAngle = parseInt($("#turtle"+turtId).attr("transform").split("(")[1].split(")")[0]);
      rotateTurtle("_"+Turtle.stampNum+turtId,currentAngle)
      Turtle.stampNum += 1
      break
    case 'TS': //Set Turtle Speed
      var turtId = Turtle.turtles[values[0]];
      Turtle.speed.push(values[1])
      break
    
    //Pen Control
    case 'PU':  // Pen Up
      var turtId = Turtle.turtles[values[0]];
      Turtle.penDownValue[turtId] = false;
      break;
    case 'PD':  // Pen Down
      var turtId = Turtle.turtles[values[0]];
      Turtle.penDownValue[turtId] = true;
      break;
    case 'PW':  // Pen Width
      var turtId = Turtle.turtles[values[0]];
      console.log(values[1])
      Turtle.lineWidth[turtId]  = values[1];
      break;

    //Color Control
    case 'PC':  // Pen Color
      var turtId = Turtle.turtles[values[0]];
      Turtle.strokeStyle[turtId] = values[1];
      $("#turtle"+turtId+" path").css("stroke",values[1])
      break;
    case 'FC': //Fill Color
      var turtId = Turtle.turtles[values[0]];
      Turtle.fillStyle[turtId] = values[1];
      $("#turtle"+turtId+" #shape").attr("fill",values[1]);
      break;
    case 'BF': //Begin fill
      Turtle.beginFillValue = true;
      var turtId = Turtle.turtles[values[0]];
      $("#turtle"+turtId+" #shape").attr("fill",values[1])
      Turtle.ctxTurtle.fillStyle = values[1];
      Turtle.ctxTurtle.beginPath();
      if (Turtle.penDownValue){
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
      }
      else{
        Turtle.ctxTurtle.lineWidth = 0.000001;
        Turtle.ctxTurtle.lineTo(Turtle.x[turtId], Turtle.y[turtId]);
        Turtle.penDownValue = true;
      }
      break;
    case 'EF': //End fill
      var turtId = Turtle.turtles[values[0]];
      Turtle.ctxTurtle.closePath();
      Turtle.ctxTurtle.stroke();
      Turtle.ctxTurtle.fill();
      Turtle.beginFillValue = false;
      if (Turtle.lineWidth[turtId] != Turtle.ctxTurtle.lineWidth){
        Turtle.ctxTurtle.lineWidth = Turtle.lineWidth[turtId];
        Turtle.penDownValue = false;
      }
      break;

    //Text Control
    case 'DP':  // Draw Print
      var turtId = Turtle.turtles[values[0]];
      var tt = $("#turtle"+turtId);
      var currentAngle = parseInt(tt.attr("transform").split("(")[1].split(")")[0])
      Turtle.ctxTurtle.save();
      Turtle.ctxTurtle.translate(Turtle.x[turtId], Turtle.y[turtId]);
      Turtle.ctxTurtle.rotate(2 * Math.PI * (currentAngle) / 360);
      Turtle.ctxTurtle.fillStyle = $("#turtle"+turtId+" path").attr("fill").toString();
      Turtle.ctxTurtle.fillText(values[1], 0, 0);
      Turtle.ctxTurtle.restore();
      break;
    
    //Turtle Appearance
    case 'SH': //Set Turtle shape
      var turtId = Turtle.turtles[values[0]];
      Turtle.shape[turtId] = values[1];
      var currentAngle = parseInt($("#turtle"+turtId).attr("transform").split("(")[1].split(")")[0]);
      var curX = $("#turtle"+turtId).css("left");
      var curY = $("#turtle"+turtId).css("top");
      $.ajax({
        url : "../icons/"+values[1]+".txt",
        type : "get",
        async: false,
        success : function(data) {
          data = data.split("*")[0] + turtId + data.split("*")[1];
          $("#turtle"+turtId).replaceWith(data.toString())
        },
      });
      $("#turtle"+turtId+" #shape").attr("fill",Turtle.fillStyle[turtId])
      $("#turtle"+turtId).css({
        "position": "absolute",
        "left": curX,
        "top": curY,
      });
      $("#turtle"+turtId+" #shape").css({
        "stroke": Turtle.strokeStyle[turtId],
        "stroke-width": "0.75px",
        "stroke-linejoin": "round",
      });
      rotateTurtle(turtId,currentAngle);
      break;
    case 'HT':  // Hide Turtle
      var turtId = Turtle.turtles[values[0]];
      $("#turtle"+turtId).hide() 
      break;
    case 'ST':  // Show Turtle
      var turtId = Turtle.turtles[values[0]];
      $("#turtle"+turtId).show()
      break;
    //Background Control
    case 'BG': //change set background colour
      Turtle.ctxBackground.fillStyle = values[0];
      Turtle.ctxBackground.fillRect(0, 0, Turtle.HEIGHT, Turtle.WIDTH);
      break;
  }
};



//Code to run when run is clicked
Turtle.runButtonClick = function () {
  Turtle.reset();
  Turtle.execute();
};
//Turtle Commands
Turtle.createTurtle = function (name, id) {
  Turtle.log.push(['CR', name, id]);
};
Turtle.forward = function (name, distance, id) {
  Turtle.log.push(['FD', name, distance, id]);
};
Turtle.backward = function (name, distance, id) {
  Turtle.log.push(['FD', name, -distance, id]);
};
Turtle.moveTo = function (name, xpos, ypos, id) {
  Turtle.log.push(['MT', name, xpos, ypos, id]);
};
Turtle.right = function (name, angle, id) {
  Turtle.log.push(['RT', name, angle, id]);
};
Turtle.left = function (name, angle, id) {
  Turtle.log.push(['RT', name, -angle, id]);
};
Turtle.drawCircle = function (name, rad, id) {
  Turtle.log.push(['DC', name, rad, id])
};
Turtle.drawStamp = function(name, id) {
  Turtle.log.push(['DS',name,id])
}
Turtle.turt_speed = function(name, speed, id) {
  Turtle.log.push(['TS',name, speed,id])
}

//Pen Control
Turtle.penup = function (name, id) {
  Turtle.log.push(['PU', name, id]);
};
Turtle.pendown = function (name, id) {
  Turtle.log.push(['PD', name,  id]);
};
Turtle.penWidth = function (name, width, id) {
  Turtle.log.push(['PW', name, Math.max(width, 0), id]);
};

//Color Control
Turtle.penColour = function (name, colour, id) {
  Turtle.log.push(['PC', name, colour, id]);
};
Turtle.fillColour = function (name, colour, id) {
  Turtle.log.push(['FC', name, colour, id]);
};
Turtle.beginFill = function(name, colour, id) {
  Turtle.log.push(['BF', name, colour, id])
};
Turtle.endFill = function(name, id) {
  Turtle.log.push(['EF', name, id])
};

//Write Control
Turtle.drawPrint = function (name, text, id) {
  Turtle.log.push(['DP', name, text, id]);
};

//Turtle Appearance
Turtle.set_shape = function (name, shape, id){
  Turtle.log.push(['SH', name, shape, id]);
};
Turtle.hideturtle = function (name, id) {
  Turtle.log.push(['HT', name, id]);
};
Turtle.showturtle = function (name, id) {
  Turtle.log.push(['ST', name, id]);
};

//Screen()
Turtle.bgColor = function (colour, id) {
  Turtle.log.push(['BG', colour, id]);
};







