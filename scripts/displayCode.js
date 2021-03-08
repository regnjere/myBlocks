
function updateCode(){
  var code = Blockly.Python.workspaceToCode(myWorkspace);
  $("#displayCode").text("")
  $("#displayCode").text(code)
}
myWorkspace.addChangeListener(updateCode)

//Show the Python Code
$(displayCode = function(){
  $("#displayCode").show();
  $("#displayText").hide();
  $("#visualization").hide();
});
//Show the Turtle Window
displayTurtle = function(){
  $("#displayCode").hide();
  $("#displayText").hide();
  $("#visualization").show();
};
//Show the Turtle Window
displayText = function(){
  $("#displayCode").hide();
  $("#displayText").show();
  $("#visualization").hide();
};
//Make blocks full screen. 
makeFullscreen = function(){
  $('#myFullscreen').fullScreen(true);
  $('#fullScreen').hide()
  $('#windowView').show()
}
//Make block not full screen.
makeWindowed = function(){
  $('#myFullscreen').fullScreen(false);
  $('#windowView').hide()
  $('#fullScreen').show()
}




// Resize Boxes and turtle depending on screen size
$(window).resize(function(){
  var h = $( window ).height()
  var w = $( window ).width();
  if (w > 1200){
    w = w/2-12;
    $("#blocklyCol").css("padding-right",0); 
    $("#displayCol").css("padding-left",0);
    h = $( window ).height()-43;
  }else{
    w = w-24;
    $("#blocklyCol").css("padding-right",12);
    $("#displayCol").css("padding-left",12);
    h = h/2-43;
  }
  if (w <600){
    Turtle.Size = 12;
  }else{
    Turtle.Size = 24;
  }
  $(".col-xl").height(h)
  $("#blocklyDiv").height(h);
  $("#visualization").attr("height",h);
  $("#visualization").attr("width",w);
  $("#displayCode").height(h);
  $("#displayCode").width(w);
  $("#displayText").height(h);
  $("#displayText").width(w);
  $("#background").attr("height",h);;
  $("#background").attr("width",w);
  $("#drawing").attr("height",h);
  $("#drawing").attr("width",w);
  Turtle.HEIGHT = h;
  Turtle.WIDTH = w;
  Turtle.ctxTurtle = document.getElementById('drawing').getContext('2d');
  Turtle.ctxBackground = document.getElementById('background').getContext('2d');

  
  $(".turtles svg").attr("width",Turtle.Size);
  $(".turtles svg").attr("height",Turtle.Size);
  // Update each turtle icon's size
  Turtle.turtleIcon = '<svg version="1.1" id="turtle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width='+Turtle.Size+' height='+Turtle.Size+' transform=rotate(90)><g class="nc-icon-wrapper" fill="#444444"><path id="shape" fill="#000000" d="M16,6V4c0-2.20605-1.79395-4-4-4S8,1.79395,8,4v2H0v1c0,2.46405,1.79584,4.50519,4.14496,4.91357 c-0.21008,1.17625-0.21038,2.36893,0.12482,3.90686C2.87164,16.73322,2,18.29083,2,20c0,0.57227,0.10938,1.15625,0.32422,1.73535 l0.45215,1.21582l1.06055-0.74707c0.83258-0.58545,2.15027-0.91315,2.97577-1.05872C8.20801,22.84418,10.01575,24,12,24 s3.79199-1.15582,5.18732-2.85461c0.82544,0.14557,2.14313,0.47327,2.97577,1.05872l1.06055,0.74707l0.45215-1.21582 C21.89062,21.15625,22,20.57227,22,20c0-1.70917-0.87164-3.26685-2.26978-4.17963c0.33487-1.53639,0.33514-2.7292,0.12482-3.9068 C22.20416,11.50519,24,9.46405,24,7V6H16z M12,2c1.10254,0,2,0.89746,2,2v1.27979C13.35944,5.10358,12.69165,5,12,5 s-1.35944,0.10358-2,0.27979V4C10,2.89746,10.89746,2,12,2z M2.1709,8h3.74078c-0.4765,0.59454-0.87427,1.26001-1.18372,1.97827 C3.54443,9.87042,2.55469,9.08142,2.1709,8z M4.00293,19.86523c0.03394-0.76727,0.36438-1.47345,0.89478-1.99634 c0.2049,0.51141,0.44379,1.00739,0.70935,1.48627C5.11426,19.47455,4.55396,19.63934,4.00293,19.86523z M19.99707,19.86523 c-0.55103-0.22589-1.11133-0.39069-1.60413-0.51007c0.26556-0.47888,0.50452-0.97485,0.70941-1.48627 C19.63275,18.39178,19.96313,19.0979,19.99707,19.86523z M19.27203,9.97827C18.96259,9.26001,18.56482,8.59454,18.08832,8h3.74078 C21.44531,9.08142,20.45557,9.87042,19.27203,9.97827z"></path></g></svg>'

  Turtle.squareIcon = '<svg id="turtle" transform=rotate(90) xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+Turtle.Size+'" height="'+Turtle.Size+'" viewBox="0 0  24 24" preserveAspectRatio="xMinYMin meet" ><rect x="0" y="0" id="shape" width="24" height="24" fill="black" /></svg>'

  Turtle.triangleIcon = '<svg transform=rotate(90) id="turtle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width='+Turtle.Size+' height='+Turtle.Size+' viewBox="0 0  24 24"  ><path d="M12,0l12,20.78461h-24Z" id="shape"  fill="black"/></svg>'

  Turtle.circleIcon = '<svg transform=rotate(90)  id="turtle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width='+Turtle.Size+' height='+Turtle.Size+' viewBox="0 0  50 50"><circle id="shape" cx="25" cy="25" fill="#000000" r="24" /></svg>'
  // Re-run the current code if a turtle is present on the canvas 
  setTimeout(function(){
    if ($(".turtles svg").length > 0){
    Turtle.reset();
    Turtle.execute();
  }},250);
});