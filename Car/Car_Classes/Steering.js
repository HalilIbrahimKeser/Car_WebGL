"use strict";

class Steering extends Car {
    constructor(gl, camera) {
        super(gl, camera);
        this.gl = gl;
        this.camera = camera;

        this.torus = null;
        this.torusInner = null;
        this.rod = null;
        this.stack = new Stack();
        this.middleCylinder = null;
        this.roundTheMiddleTire = null;
        this.torusWire = null;


    }

    initBuffers(){
        this.torus = new Torus(this.gl, this.camera, 0, false);
        this.torus.init('my-vertex-shader', 'my-fragment-shader');

        this.torusInner = new Torus(this.gl, this.camera, {red:0.3, green: 0.3, blue: 0.3, alpha: 1}, false);
        this.torusInner.init('my-vertex-shader', 'my-fragment-shader');

        this.circle = new Cylinder(this.gl, this.camera, {red:0.3, green: 0.3, blue: 0.3, alpha: 1}, false);
        this.circle.init('my-vertex-shader', 'my-fragment-shader');

        this.steeringRot = new Cylinder(this.gl, this.camera, {red:0.2, green: 0.2, blue: 0.2, alpha: 1}, false);
        this.steeringRot.init('my-vertex-shader', 'my-fragment-shader');

        this.steeringBox = new Cube(this.gl, this.camera, {red:0.2, green: 0.2, blue: 0.2, alpha: 1});
        this.steeringBox.init('my-vertex-shader', 'my-fragment-shader');
    }

    handleKeys(currentlyPressedKey){

    }

    draw(elapsed, modelMatrix){
        this.stack.pushMatrix(modelMatrix);

        modelMatrix.rotate(90, 0, 1, 0);
        modelMatrix.scale(5, 5, 2);
        this.torus.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(9, 0.2, 9);
        this.circle.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(27, 0, 0);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(2, 9, 2);
        this.steeringRot.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(50, -7, 0);
        modelMatrix.rotate(20, 0, 0, 1);
        modelMatrix.scale(10, 10, 10);
        this.steeringBox.draw(elapsed, modelMatrix);
    }
}