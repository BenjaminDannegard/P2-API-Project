function mouseSetup(){


    var camera, scene, geometry, material, mesh, renderer = new THREE.WebGLRenderer();

    var demo = Sketch.create({

        type: Sketch.WEBGL,

        // Use existing element
        element: renderer.domElement,

        // Use existing context
        context: renderer.context,

        setup: function() {

            camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 10000 );
            camera.position.z = 1000;

            scene = new THREE.Scene();

            geometry = new THREE.CubeGeometry( 600, 600, 600 );
            material = new THREE.MeshBasicMaterial( { color: 0xFF0C7A, wireframe: true } );

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );
        },

        resize: function() {

            camera.aspect = this.width / this.height;
            camera.updateProjectionMatrix();

            renderer.setSize( this.width, this.height );
        },

        draw: function() {

//changed the speed to a very high number in order to get a new rotation effect (had bee 0.02 before)

            mesh.rotation.x += 0.030;
            mesh.rotation.y += 0.030;

            renderer.render( scene, camera );
        }
    });
    
var mousePos;

var alertTimerId1 = 0;

demo.mouse.x = demo.width / 10;

demo.mouse.y = demo.height;

$(window).on('mousemove', function(e) {
  if(demo.mouse.x < 100)
  {
    console.log("space");
    alertTimerId1 = setTimeout ("pgChange()", 5000 );
  }
  if(demo.mouse.x > 101){
  clearTimeout ( alertTimerId1 );
  console.log("cleared");
  }
});
}

mouseSetup();

function pgChange(){
  var alertTimerId = 0;
  window.location = '../../../parallax.html';
  console.log("Switch");
}