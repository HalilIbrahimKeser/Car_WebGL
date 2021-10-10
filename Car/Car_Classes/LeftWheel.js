"use strict";

class LeftWheel{
    constructor(gl, camera) {
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
        this.torus.initBuffers();

        this.torusInner = new Torus(this.gl, this.camera, {red:0.3, green: 0.3, blue: 0.3, alpha: 1}, false);
        this.torusInner.initBuffers();

        this.torusWire = new Torus(this.gl, this.camera, {red:0.3, green: 0.3, blue: 0.3, alpha: 1}, true);
        this.torusWire.initBuffers();

        this.middleCylinder = new Cylinder(this.gl, this.camera, {red:0.0, green: 0.2, blue:0.45, alpha:1});
        this.middleCylinder.initBuffers();

        this.roundTheMiddleTire = new Cube(this.gl, this.camera, {red:0.5, green: 0.5, blue:0.5, alpha:1});
        this.roundTheMiddleTire.initBuffers();

        this.rod = new Cylinder(this.gl, this.camera, {red:0.3, green:0.9, blue:0.5, alpha:1});
        this.rod.initBuffers();
    }

    handleKeys(currentlyPressedKey){

    }

    draw(elapsed, modelMatrix){
        this.stack.pushMatrix(modelMatrix);

        modelMatrix.scale(5.5, 5.5, 10);
        this.torus.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(5.55, 5.55, 10);
        this.torusWire.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(5, 5, 8);
        this.torusInner.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, 0, -5);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(3, 1, 3);
        this.middleCylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0, 6, -5);
        modelMatrix.rotate(20, 1, 0, 0);
        modelMatrix.scale(3, 5.8, 0.5);
        this.roundTheMiddleTire.draw(0, modelMatrix);

        for (let i = 360/5; i < 360; i+=360/5){
            modelMatrix = this.stack.peekMatrix();
            modelMatrix.rotate(i, 0, 0, 1);
            modelMatrix.translate(0, 6, -5);
            modelMatrix.rotate(20, 1, 0, 0);
            modelMatrix.scale(3, 5.8, 0.5);
            this.roundTheMiddleTire.draw(0, modelMatrix);
        }

    }

}