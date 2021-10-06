"use strict";

class Car{
    constructor(gl, camera) {
        this.gl = gl;
        this.camera = camera;
        this.wheel = null;

        this.stack = new Stack();

        this.swingRotation = 0;
        this.backWheelRotation = 0;

    }

    initBuffers(){
        this.wheel = new Wheel(this.gl, this.camera);
        this.wheel.initBuffers();
    }

    handleKeys(currentlyPressedKey){
        this.wheel.handleKeys(currentlyPressedKey);
        if(currentlyPressedKey[74]){
            // J is pressed = positiv rotasjon y-aksen til bikeFront
            if(this.swingRotation != 100){
                this.swingRotation += 1;
            }
        }
        if(currentlyPressedKey[75]){
            //K is pressed = negativ rotasjon y-aksen til bikeFront
            if(this.swingRotation != -100){
                this.swingRotation -= 1;
            }
        }
        if (currentlyPressedKey[70]){
            //F is pressed = roter hjula framover = negativ rotasjon z-aksen
            this.backWheelRotation -= 1;
        }
        if (currentlyPressedKey[71]){
            //G is pressed = roter hjula bakover = positiv rotasjon z-aksen
            this.backWheelRotation += 1;
        }
    }

    draw(elapsed, modelMatrix){
        this.stack.pushMatrix(modelMatrix);
        //console.log("For bikeFront " + this.stack.peekMatrix());
        /*modelMatrix.translate(15, 0, 0);
        modelMatrix.rotate(30, 0, 0, 1);
        modelMatrix.rotate(this.swingRotation, 0, 1, 0);
        this.bikeFront.draw(modelMatrix);*/


        modelMatrix = this.stack.peekMatrix();
        //modelMatrix.translate(-33, -17, 0);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.wheel.draw(0.5, modelMatrix);

    }

}