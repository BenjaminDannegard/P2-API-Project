## sketch.js - Highlights

A tiny (~2kb gzipped) platform for JavaScript creative coding.

 * Sketch is an augmented drawing context (`CanvasRenderingContext2D`, `WebGLRenderingContext` or `HTMLElement`) so it has all the expected drawing methods built in.
 * The `mouse` property is also the first element of the `touches` array and vice versa, so you can code to one standard and get touch and multi-touch support for free.
 * The `update` and `draw` loops run on the browser animation frame and can `stop` and `start` whenever you like.
 * You get fast access to `Math` functions and constants, plus extras like range and array enabled `random`, `map` and `lerp`.
 * Simple and configurable. You can even bring your own `context`, so it works well with libraries like [THREE](http://threejs.org/).

<p align="center">
<a target="_blank" href="http://soulwire.github.io/sketch.js/examples/drawing.html"><img width="24.5%" src="http://soulwire.github.io/sketch.js/examples/img/drawing.jpg"></a>
<a target="_blank" href="http://soulwire.github.io/sketch.js/examples/particles.html"><img width="24.5%" src="http://soulwire.github.io/sketch.js/examples/img/particles.jpg"></a>
<a target="_blank" href="http://soulwire.github.com/Plasmatic-Isosurface/"><img width="24.5%" src="http://soulwire.github.io/sketch.js/examples/img/plasma.jpg"></a>
<a target="_blank" href="http://soulwire.github.com/Muscular-Hydrostats/"><img width="24.5%" src="http://soulwire.github.io/sketch.js/examples/img/tentacles.jpg"></a>
</p>

A few examples from the [showcase](http://soulwire.github.com/sketch.js/)

### What is Sketch JS?

Sketch.js is one of the recommended libraries to enter in the canvas world. 
sketch.js lets you get straight to the fun parts of creative coding, without ever having to worry about shims or boilerplate code.

It gives you a graphics context, an animation loop, normalised input events and a host of useful callbacks to hook into.

Here's an example:
````js
Sketch.create({
  setup() {
    this.r = this.g = this.b = random(100, 200)
  },
  mousemove() {
    this.r = 255 * (this.mouse.x / this.width)
    this.g = 255 * (this.mouse.y / this.height)
    this.b = 255 * abs(cos(PI * this.mouse.y / this.width))
  },
  draw() {
    this.fillStyle = `rgb(${~~this.r},${~~this.g},${~~this.b})`
    this.fillRect(0, 0, this.width, this.height)
  }
})
````
[See it in action](http://jsfiddle.net/soulwire/7wtbm/)


### Code Faster

You can simply hook onto methods like setup, draw and mousemove to start playing:
````js
var ctx = Sketch.create();

ctx.draw = function() {
	ctx.beginPath();
	ctx.arc( random( ctx.width ), random( ctx.height ), 10, 0, TWO_PI );
	ctx.fill();
}
````

Mouse, touch and keyboard events are augmented and certain properties can be used outside event handlers:

````js
ctx.mousemove = function( e ) {
	ctx.lineTo( e.x, e.y );
}
````
Touch events

For touches, just handle them - on the desktop, the 0th element will be the mouse so your code will work the same accross devices and platforms:

````js
ctx.mousemove = function( e ) {
	for ( var i = 0, n = e.touches.length; i < n; i++ ) {
		ctx.arc( e.touches[i].x, e.touches[i].y, 10, 0, TWO_PI );
	}
}
````

### The Rest

For more information, check out the [getting started guide](https://github.com/soulwire/sketch.js/wiki/Getting-Started), the [API](https://github.com/soulwire/sketch.js/wiki/API), the many examples in the [showcase](http://soulwire.github.com/sketch.js/) and the full [source](https://github.com/soulwire/sketch.js/blob/master/js/sketch.js).
