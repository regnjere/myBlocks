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
  Turtle.pid = window.setTimeout(Turtle.animate, 500);
};

//Animate the turtle's movements
Turtle.animate = function () {
  // All tasks should be complete now.  Clean up the PID list.
  Turtle.pid = 0;
  
  var commands = Turtle.log.shift();
  if (!commands) {
    myWorkspace.highlightBlock(null);
    return;
  }
  var turtleAction = commands.shift();
  if (turtleAction != "BG"){
    var turtId = Turtle.turtles[commands[0]];
    var speed = Turtle.speed[turtId];
    if (speed == 0){
      speed = 100; 
    }else if (speed > 10 || speed < 0) {
      speed = 10;
    } else{
      speed = 5;
    }
  }
  highlightBlock(commands.pop());
  Turtle.step(turtleAction, commands);
  Turtle.pid = window.setTimeout(Turtle.animate, 1000/speed);
};

//Reset the turtles' values and clear the drawing area
Turtle.reset = function () {
  // Starting location and heading of the turtle.
  $(".turtles").html("")
  //clear text area
  $("#displayText").html("")
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
      $(".turtles").append(Turtle.turtleIcon)
      $("#turtle").attr("id","turtle"+Turtle.Id)
      Turtle.strokeStyle.push('#000000');
      Turtle.fillStyle.push('#000000');
      Turtle.x.push(Turtle.HEIGHT/2);
      Turtle.y.push(Turtle.HEIGHT/2);
      Turtle.lineWidth.push(1);
      Turtle.penDownValue.push(true);
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

      Turtle.speed.push(5);
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
      Turtle.ctxTurtle.strokeStyle = Turtle.strokeStyle[turtId];
      Turtle.ctxTurtle.fillStyle = Turtle.fillStyle[turtId];
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
      Turtle.ctxTurtle.strokeStyle = Turtle.strokeStyle[turtId];
      Turtle.ctxTurtle.fillStyle = Turtle.fillStyle[turtId];
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
      var shape = Turtle.shape[turtId];
      switch (shape){
        case "turtle":
          $(".turtles").append(Turtle.turtleIcon)
          break;
        case "square":
          $(".turtles").append(Turtle.squareIcon)
          break;
        case "triangle":
          $(".turtles").append(Turtle.triangleIcon)
          break;
        case "circle":
          $(".turtles").append(Turtle.circleIcon)
          break;
      }
      $("#turtle").attr("id","turtle"+"_"+Turtle.stampNum+turtId)
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
      var currentAngle = parseInt($("#turtle"+turtId).attr("transform").split("(")[1].split(")")[0])-90;
      rotateTurtle("_"+Turtle.stampNum+turtId,currentAngle)
      Turtle.stampNum += 1
      break
    case 'TS': //Set Turtle Speed
      var turtId = Turtle.turtles[values[0]];
      Turtle.speed[turtId]= values[1];
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
      $("#turtle"+turtId+" #shape").attr("fill",Turtle.fillStyle[turtId])
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
      //Find the original turtle's angle
      var currentAngle = parseInt($("#turtle"+turtId).attr("transform").split("(")[1].split(")")[0])-90;
      var curX = $("#turtle"+turtId).css("left");
      var curY = $("#turtle"+turtId).css("top");
      switch (values[1]){
        case "turtle":
          $("#turtle"+turtId).replaceWith(Turtle.turtleIcon)
          break;
        case "square":
          $("#turtle"+turtId).replaceWith(Turtle.squareIcon)
          break;
        case "triangle":
          $("#turtle"+turtId).replaceWith(Turtle.triangleIcon)
          break;
        case "circle":
          $("#turtle"+turtId).replaceWith(Turtle.circleIcon)
          break;
      }
      $("#turtle").attr("id","turtle"+turtId)
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
Turtle.beginFill = function(name, id) {
  Turtle.log.push(['BF', name, id])
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



Turtle.turtleIcon = '<svg version="1.1" id="turtle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24" transform=rotate(90)><g class="nc-icon-wrapper" fill="#444444"><path id="shape" fill="#000000" d="M16,6V4c0-2.20605-1.79395-4-4-4S8,1.79395,8,4v2H0v1c0,2.46405,1.79584,4.50519,4.14496,4.91357 c-0.21008,1.17625-0.21038,2.36893,0.12482,3.90686C2.87164,16.73322,2,18.29083,2,20c0,0.57227,0.10938,1.15625,0.32422,1.73535 l0.45215,1.21582l1.06055-0.74707c0.83258-0.58545,2.15027-0.91315,2.97577-1.05872C8.20801,22.84418,10.01575,24,12,24 s3.79199-1.15582,5.18732-2.85461c0.82544,0.14557,2.14313,0.47327,2.97577,1.05872l1.06055,0.74707l0.45215-1.21582 C21.89062,21.15625,22,20.57227,22,20c0-1.70917-0.87164-3.26685-2.26978-4.17963c0.33487-1.53639,0.33514-2.7292,0.12482-3.9068 C22.20416,11.50519,24,9.46405,24,7V6H16z M12,2c1.10254,0,2,0.89746,2,2v1.27979C13.35944,5.10358,12.69165,5,12,5 s-1.35944,0.10358-2,0.27979V4C10,2.89746,10.89746,2,12,2z M2.1709,8h3.74078c-0.4765,0.59454-0.87427,1.26001-1.18372,1.97827 C3.54443,9.87042,2.55469,9.08142,2.1709,8z M4.00293,19.86523c0.03394-0.76727,0.36438-1.47345,0.89478-1.99634 c0.2049,0.51141,0.44379,1.00739,0.70935,1.48627C5.11426,19.47455,4.55396,19.63934,4.00293,19.86523z M19.99707,19.86523 c-0.55103-0.22589-1.11133-0.39069-1.60413-0.51007c0.26556-0.47888,0.50452-0.97485,0.70941-1.48627 C19.63275,18.39178,19.96313,19.0979,19.99707,19.86523z M19.27203,9.97827C18.96259,9.26001,18.56482,8.59454,18.08832,8h3.74078 C21.44531,9.08142,20.45557,9.87042,19.27203,9.97827z"></path></g></svg>'

Turtle.squareIcon = '<svg id="turtle" transform=rotate(90) xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0  24 24" preserveAspectRatio="xMinYMin meet" ><rect x="0" y="0" id="shape" width="24" height="24" fill="black" /></svg>'

Turtle.triangleIcon = '<svg transform=rotate(90) id="turtle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0  24 24"  ><path d="M12,0l12,20.78461h-24Z" id="shape"  fill="black"/></svg>'

Turtle.circleIcon = '<svg transform=rotate(90)  id="turtle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0  50 50"><circle id="shape" cx="25" cy="25" fill="#000000" r="24" /></svg>'
