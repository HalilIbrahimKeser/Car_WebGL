"use strict";

class LeftDoorVariation extends Car
{
    constructor(gl, camera, transparency, color, doorHandle) {
        super(gl, camera);
        this.gl = gl;
        this.camera = camera;

        if(!color)
            this.color={red:0.400, green: 0.0, blue: 0.0};
        else
            this.color = color;


        if(!doorHandle)
            this.doorHandle={red:0.3, green: 0.0, blue: 0.4};
        else
            this.doorHandle = doorHandle;

        this.transparency = transparency;
    }

    initBuffers(){
        this.frontDoor = new CubeTransparent(this.gl, this.camera, {red: this.color.red, green: this.color.green, blue: this.color.blue, alpha: this.transparency}, false);
        this.frontDoor.init('my-vertex-shader', 'my-fragment-shader');

        this.handle = new CubeTransparent(this.gl, this.camera, {red:this.doorHandle.red, green: this.doorHandle.green, blue: this.doorHandle.blue, alpha: this.transparency}, false);
        this.handle.init('my-vertex-shader', 'my-fragment-shader');
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
        modelMatrix.translate(-2, -19, 1.5);
        modelMatrix.scale(0.5, 2, 0.1);
        this.handle.draw(elapsed, modelMatrix);




        this.stack.empty();
    }
}