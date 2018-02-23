Produce a Markdown-formatted "README.md" file. It should introduce the API/Library, link to useful resources, and describe
what your deno doesm how to set it up and how it works. The readme should support your demo if someone is unable to hear your
live presentation.

Sketch.js is a lightweight 2D image creation API. It allows for animations and can be combined with the library Three.js to handle 3D objects. It can also be used to simulate physics.
It uses the canvas element to create drawings and then has its own pre built functions for helping the user with animating these drawings.

To set up the demo you simply have to run it as a live server from visual code or something similar. The node.js are not set so it is not possible to launch with npm.
The Final Demo folder is where the demo is located and the Parallax.html is the main html so start your live server from that html file.

The Demo we have created uses the sketch.js API to animate a background and to animate particles. The background animations is tied to mouse movement, and so is the speed of the background movement.
The particles are self controlled. Pressing the P key will change the color of the particles. At the top of the page there are buttons that modify the buildings in some aspect.
This to show how easy it is to modify single aspects of a drawing, when compared to just using a canvas. The buttons increase the size of antenas, which are the lines on top of some
buildings. The increase size of spires works in a similar way, the spires are also ontop of some buildings. The increase height of buildings raises all the building in the next render passes
height, the ammount is set to something high for ease of demonstration, but could easily be changed. And finaly there is the reset changes button, this reverts everything to normmal
in the next render pass.

Keeping your mouse at the far right of the page for 5 seconds will transition your page to another. It will bring up the three.js example. Keeping your mouse at the far left side
of the three.js example page for 5 seconds will bring you back to the previous page.

Sketch.js github: https://github.com/soulwire/sketch.js

Our github repository: https://github.com/BenjaminDannegard/P2-API-Project

