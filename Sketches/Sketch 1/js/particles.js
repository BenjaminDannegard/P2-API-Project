var col;
var chk = 0;

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

function particles() {
  var Particle;

  Particle = class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.radius = 5;
      this.spurt = 0.5;
      this.color = '#fff';
      this;
    }

    update(ctx, index, ndt) {
      var dist, dx, dy, i;
      this.vx += -(random(-0.2, 1)) * this.spurt;
      this.vy += (random(-0.2, 0.2)) * this.spurt;
      this.x += this.vx * ndt;
      this.y += this.vy * ndt;
      this.vx *= 0.97;
      this.vy *= 0.95;
      if (this.spurt > 0.5) {
        this.spurt -= 0.1;
      }
      if (this.spurt <= 0.5 && !floor(random(1000))) {
        return this.spurt = random(1, 4);
      }
    }

    wrap(ctx) {
      if (!this.hasTarget) {
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
    }

  };

  var particles = Sketch.create({
    setup: function() {
      var i;
      return this.Particles = (function() {
        var j, results;
        results = [];
        for (i = j = 0; j <= 1700; i = ++j) {
          results.push(new Particle(i, random(this.height)));
        }
        return results;
      }).call(this);
    },
    update: function() {
      var i, results;
      this.ndt = max(0.001, this.dt / (1000 / 60));
      this.tick++;
      i = this.Particles.length;
      results = [];
      while (i--) {
        this.Particles[i].wrap(this);
        results.push(this.Particles[i].update(this, i, this.ndt));
      }
      return results;
    },
    draw: function() {
      var Particle, i;
      this.fillStyle = '#d33';
      this.beginPath();
      this.fillStyle = col;
      i = this.Particles.length;
      while (i--) {
        Particle = this.Particles[i];
        this.rect(~~Particle.x, ~~Particle.y, 2, 2);
      }
      this.fill();
    },
    keydown: function() {
      if ( this.keys.P ){
      changePart();
      }
    }
  });

}

particles();