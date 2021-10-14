"use strict";

class RightDoor //extends Car {
{
    constructor(gl, camera) {
        //super(gl, camera);
        this.gl = gl;
        this.camera = camera;
        this.stack = new Stack();

    }

    initBuffers(){
        this.frontDoor = new CubeTransparent(this.gl, this.camera, {red:0.400, green: 0.0, blue: 0.0, alpha: 0.8}, false);
        this.frontDoor.init('my-vertex-shader', 'my-fragment-shader');

        this.frontDoor1 = new CubeTransparent(this.gl, this.camera, {red:0.2, green: 0.0, blue: 0.4, alpha: 0.8}, false);
        this.frontDoor1.init('my-vertex-shader', 'my-fragment-shader');
    }

    handleKeys(currentlyPressedKey){

    }

    draw(elapsed, modelMatrix){
        // HUSK: I*T*O*R*S  der O = R * T  dvs I T R T R S
        //modelMatrix.setIdentity();
        this.stack.pushMatrix(modelMatrix);

        //door frame
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(-18, 13, 0);
        modelMatrix.rotate(90, 0, 1, 0);
        modelMatrix.scale(0.9, 13, 18);
        this.frontDoor.draw(elapsed, modelMatrix);

        //door opp left
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 2, -0.9);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(1, 0.1, 1.25);
        this.frontDoor.draw(elapsed, modelMatrix);

        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 7, -0.9);
        modelMatrix.scale(1, 8, 0.1);
        this.frontDoor.draw(elapsed, modelMatrix);

        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 1.2, 8);
        modelMatrix.rotate(-1.3, 1, 0, 0);
        modelMatrix.scale(1, 0.1, 9.1);
        this.frontDoor.draw(elapsed, modelMatrix);

        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(2, -19, 1.5);
        modelMatrix.scale(0.5, 2, 0.1);
        this.frontDoor1.draw(elapsed, modelMatrix);




        this.stack.empty();
    }
}