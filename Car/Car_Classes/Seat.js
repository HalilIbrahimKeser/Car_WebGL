"use strict";

class Seat{
    constructor(gl, camera) {
        this.gl = gl;
        this.camera = camera;
        this.cylinder = null;
        this.stack = new Stack();
        this.cylinderDark = null;
        this.cube = null;
    }

    initBuffers(){
        this.cylinder = new Cylinder(this.gl, this.camera, {red:0.9, green: 0.7, blue:0.1, alpha:1});
        this.cylinder.initBuffers();

        this.cylinderDark = new Cylinder(this.gl, this.camera, {red:0.3, green: 0.3, blue:0.3, alpha:1});
        this.cylinderDark.initBuffers();

        this.cube = new Cube(this.gl, this.camera, {red:0.9, green: 0.7, blue:0.1, alpha:1});
        this.cube.initBuffers();
    }

    draw(elapsed, modelMatrix){
        this.stack.pushMatrix(modelMatrix);

        modelMatrix.rotate(20, 0,0,1);
        modelMatrix.translate(0, 0, -1);
        modelMatrix.scale(4, 5, 4);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(20, 0,0,1);
        modelMatrix.translate(0, 0, 18);
        modelMatrix.scale(4, 5, 4);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(20, 0,0,1);
        modelMatrix.translate(0, 0, 9);
        modelMatrix.scale(1.7, 4.9, 6);
        this.cylinderDark.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(20, 0,0,1);
        modelMatrix.translate(-2, 0, 8);
        modelMatrix.scale(1, 15, 7);
        this.cube.draw(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(95, 0,0,1);
        modelMatrix.translate(-15, -16, -1);
        modelMatrix.scale(4, 4, 4);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(95, 0,0,1);
        modelMatrix.translate(-15, -16, 18);
        modelMatrix.scale(4, 4, 4);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(29, -13, 8.5);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(4, 3.8, 4);
        this.cylinder.draw(modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-6, 15, 8.5);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(4, 4.5, 4);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-1.6, 6, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3.5, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-0.4, 3, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3.5, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0.7, 0, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3.5, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(1.8, -3, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3.5, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(2.8, -6, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3.5, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(12, -12.1, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(15, -11.9, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(18, -11.5, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(21, -11.5, 8.3);
        modelMatrix.rotate(90, 1,0,0);
        modelMatrix.scale(1, 3, 1);
        this.cylinder.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(17, -18.5, 9);
        modelMatrix.rotate(95, 0,0,1);
        modelMatrix.scale(8, 4, 10);
        this.cylinderDark.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(10, 1, 0, 0);
        modelMatrix.rotate(5, 0, 0, 1);
        modelMatrix.translate(15.5, -19, 22);
        modelMatrix.scale(14, 7.5, 1);
        this.cube.draw(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.rotate(-10, 1, 0, 0);
        modelMatrix.rotate(5, 0, 0, 1);
        modelMatrix.translate(15.5, -21, -5);
        modelMatrix.scale(14, 9, 1);
        this.cube.draw(elapsed, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(5.5, -20, 8.5);
        modelMatrix.scale(1, 9, 9.8);
        this.cube.draw(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(31, -20, 8.7);
        modelMatrix.scale(1, 8, 9.5);
        this.cube.draw(elapsed, modelMatrix);
    }
}