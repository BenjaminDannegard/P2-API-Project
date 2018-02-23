//Variables that change with functions outside of skyLine()
var x = 1, y = 1, z = 10, v = 1;
var hMin = 1;
var wMin = 1;

//Main function that setsup and renders the buildings
function skyLine(){

var Building, Skyline, dt, sketch, skylines;

var mousePos;

sketch = Sketch.create(); //Initializes the sketch functions and binds them to the sketch variable

sketch.mouse.x = sketch.width / 10;
sketch.mouse.y = sketch.height;

skylines = [];

var alertTimerId = 0; //Initializes timer that keeps track of scene transition

dt = 1;

var r, g, b;


// BUILDINGS

Building = function (config) {
  return this.reset(config);
};

Building.prototype.reset = function (config) {
  this.layer = config.layer;
  this.x = config.x;
  this.y = config.y;
  this.width = config.width;
  this.height = config.height;
  this.color = config.color;
  this.slantedTop = floor(random(0, 10)) === 0;
  this.slantedTopHeight = this.width / random(2, 4);
  this.slantedTopDirection = round(random(0, 1)) === 0;
  this.spireTop = floor(random(0, 15)) === 0;
  this.spireTopWidth = random(this.width * .01, this.width * .07);
  this.spireTopHeight = random((10, 20) * y);
  this.antennaTop = !this.spireTop && floor(random(0, 10)) === 0;
  this.antennaTopWidth = this.layer / 2;
  return this.antennaTopHeight = random((5, 20) * x);
};

Building.prototype.render = function () {
  sketch.fillStyle = sketch.strokeStyle = this.color;
  sketch.lineWidth = 2;
  sketch.beginPath();
  sketch.rect(this.x, this.y, this.width, this.height);
  sketch.fill();
  sketch.stroke();
  if (this.slantedTop) {
    sketch.beginPath();
    sketch.moveTo(this.x, this.y);
    sketch.lineTo(this.x + this.width, this.y);
    if (this.slantedTopDirection) {
      sketch.lineTo(this.x + this.width, this.y - this.slantedTopHeight);
    } else {
      sketch.lineTo(this.x, this.y - this.slantedTopHeight);
    }
    sketch.closePath();
    sketch.fill();
    sketch.stroke();
  }
  if (this.spireTop) {
    sketch.beginPath();
    sketch.moveTo(this.x + (this.width / 2), this.y - this.spireTopHeight);
    sketch.lineTo(this.x + (this.width / 2) + this.spireTopWidth, this.y);
    sketch.lineTo(this.x + (this.width / 2) - this.spireTopWidth, this.y);
    sketch.closePath();
    sketch.fill();
    sketch.stroke();
  }
  if (this.antennaTop) {
    sketch.beginPath();
    sketch.moveTo(this.x + (this.width / 2), this.y - this.antennaTopHeight);
    sketch.lineTo(this.x + (this.width / 2), this.y);
    sketch.lineWidth = this.antennaTopWidth;
    return sketch.stroke();
  }
};


// SKYLINES

Skyline = function (config) {
  this.x = 0;
  this.buildings = [];
  this.layer = config.layer;
  this.width = {
    min: config.width.min,
    max: config.width.max
  };
  this.height = {
    min: config.height.min,
    max: config.height.max
  };
  this.speed = config.speed;
  this.color = config.color;
  this.populate();
  return this;
};

Skyline.prototype.populate = function () {
  var newHeight, newWidth, results, totalWidth;
  totalWidth = 0;
  results = [];
  while (totalWidth <= sketch.width + (this.width.max * 2)) {
    newWidth = round(random(this.width.min, this.width.max));
    newHeight = round(random(this.height.min, this.height.max));
    this.buildings.push(new Building({
      layer: this.layer,
      x: this.buildings.length === 0 ? 0 : this.buildings[this.buildings.length - 1].x + this.buildings[this.buildings.length - 1].width,
      y: sketch.height - newHeight,
      width: newWidth,
      height: newHeight,
      color: this.color
    }));
    results.push(totalWidth += newWidth);
  }

  return results;
};

Skyline.prototype.update = function () {
  var firstBuilding, lastBuilding, newHeight, newWidth;
  this.x -= (sketch.mouse.x * this.speed) * dt;
  firstBuilding = this.buildings[0];
  if (firstBuilding.width + firstBuilding.x + this.x < 0) {
    newWidth = round(random(this.width.min, this.width.max));
    newHeight = round(random((this.height.min, this.height.max)*hMin));
    lastBuilding = this.buildings[this.buildings.length - 1];
    firstBuilding.reset({
      layer: this.layer,
      x: lastBuilding.x + lastBuilding.width,
      y: sketch.height - newHeight,
      width: newWidth,
      height: newHeight,
      color: this.color
    });
    return this.buildings.push(this.buildings.shift());
  }
};

Skyline.prototype.render = function () {
  var i;
  i = this.buildings.length;
  sketch.save();
  sketch.translate(this.x, (sketch.height - sketch.mouse.y) / 20 * this.layer);
  while (i--) {
    this.buildings[i].render(i);
  }

  return sketch.restore();
};


// SETUP

sketch.setup = function () {
  var i, results;
  b = 220;
  i = 5;
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  results = [];
  while (i--) {
    r = (((i + 1) * 1) + 85); 
    g = (75 - (i * 28));
    results.push(skylines.push(new Skyline({
      layer: i,
      width: {
        min: (i + 1) * 30,
        max: (i + 1) * 40
      },
      height: {
        min: 250 - (i * 35),
        max: 400 - (i * 35)
      },
      speed: (i + 1) * .003,
      color: 'hsl(' + b + ', ' + r + '%, ' + g + '%)'

    })));
  }

  return results;
};


// CLEAR

sketch.clear = function () {
  return sketch.clearRect(0, 0, sketch.width, sketch.height);
};


// UPDATE

sketch.update = function () {
  var i, results, o;
  dt = sketch.dt < .1 ? .1 : sketch.dt / 16;
  dt = dt > 5 ? 5 : dt;
  i = skylines.length;
  results = [];
  while (i--) {
    results.push(skylines[i].update(i));
  }
  return results;
};


// DRAW
sketch.draw = function () {
  var i, results;
  i = skylines.length;
  results = [];
  while (i--) {
    results.push(skylines[i].render(i));
  }

  return results;
};

//Handles the mouse functions 
$(window).on('mousemove', function(e) {
  //if the pointer is within these paramaters wait 5 seconds then call the page transition function
  if(sketch.mouse.x > 1200) 
  {
    alertTimerId = setTimeout ("pgChange()", 5000 );
  }
  //If the mouse pointer is outside the previous paramaters then reset the timer
  if(sketch.mouse.x < 1199){
  clearTimeout ( alertTimerId );
  }
  //These create the animation that tracks with the mouse
  sketch.mouse.x = e.pageX;
  return sketch.mouse.y = e.pageY;
});
}

//Function for changing page, called when mouse is held in a specific area on the page
function pgChange(){
  var alertTimerId = 0;
  window.location = '../Additional pages/examples/three.html';
  console.log("Switch");
}

//All the szChange functions are for the buttons on the page to modify the buildings
function szChangeA()
{
  x++;
}

function szChangeS()
{
  y++;
}

function szChangeW()
{
  wMin++;
}

function szChangeH()
{
  hMin++;
}

//Function for reseting changes you made with the buttons
function resetChanges()
{
  x = 1;
  y = 1;
  v = 1;
  z = 1;
  hMin = 1;
  wMin = 1;
}

skyLine();