//These two variables keep track of what color the particles should have
var col;
var chk = 0;

//Function that changes color of the particles
function changePart(){
  chk++;
  if(chk == 1)
  col = '#fff';
  if(chk == 2)
  col = '#000000';
  if(chk == 3)
  col = '#0000FF';
  if(chk == 4)
  chk = 0;
}

//Function that creates the particles
function particles() {
  var Particle;

  //Class and constructor to give each particle its own x, y values, velocity values. Dash is there to make the movement a little more dynamic
  Particle = class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.radius = 5;
      this.dash = 0.5;
      this.color = '#fff';
      this;
    }

    //Update function that calculates and gives the particles speed. Allowing for the animation
    update(ctx, index, ndt) {
      var dist, dx, dy, i;
      this.vx += -(random(-0.2, 1)) * this.dash;
      this.vy += (random(-0.2, 0.2)) * this.dash;
      this.x += this.vx * ndt;
      this.y += this.vy * ndt;
      this.vx *= 0.97;
      this.vy *= 0.95;
      if (this.dash > 0.5) {
        this.dash -= 0.1;
      }
      if (this.dash <= 0.5 && !floor(random(1000))) {
        return this.dash = random(1, 4);
      }
    }

    //Calculations to keep the particles moving and have them be reacuring
    calc(ctx) {
        if (this.x > ctx.width + this.radius) {
          this.x = -this.radius;
        } else if (this.x < -this.radius) {
          this.x = ctx.width + this.radius;
        }
        if (this.y > ctx.height + this.radius) {
          return this.y = -this.radius;
        } else if (this.y < -this.radius) {
          return this.y = ctx.height + this.radius;
        }
    }

  };

  //Create the sketch element and bind it to particles
  var particles = Sketch.create({
    setup: function() {
      var i;
      return this.Particles = (function() {
        var j, results;
        //Loop to create all the particles
        results = [];
        for (i = j = 0; j <= 1700; i = ++j) {
          results.push(new Particle(i, random(this.height)));
        }
        return results;
      }).call(this);
    },
    update: function() {
      var i, results;
      //Handles the speed
      this.ndt = max(0.001, this.dt / (1000 / 60));
      this.tick++;
      i = this.Particles.length;
      results = [];
      //Loop for updating all particles
      while (i--) {
        this.Particles[i].calc(this);
        results.push(this.Particles[i].update(this, i, this.ndt));
      }
      return results;
    },
    draw: function() {
      var Particle, i;
      //Sets the look of the particles
      this.fillStyle = '#d33';
      this.beginPath();
      this.fillStyle = col;
      i = this.Particles.length;
      while (i--) {
        Particle = this.Particles[i];
        this.rect(Particle.x, Particle.y, 2, 2);
      }
      this.fill();
    },
    //Sketches function for knowing if keyboard buttons are pressed
    keydown: function() {
      if ( this.keys.P ){
      //calls the color change function if P is pressed
      changePart();
      }
    }
  });

}

particles();