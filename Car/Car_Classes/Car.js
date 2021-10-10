"use strict";


//Navn til modellene hentet fra https://innovationdiscoveries.space/understanding-the-vehicle-chassis-system/


class Car {
    constructor(gl, camera) {
        this.gl = gl;
        this.camera = camera;

        this.stack = new Stack();

        this.wheel = null;
        this.chassis = null;
        this.frame = null;
        this.leftWheel = null;

        this.seat = null;

        this.swingRotation = 0;
        this.backWheelRotation = 0;

    }

    initBuffers(){
        this.wheel = new Wheel(this.gl, this.camera);
        this.wheel.initBuffers();

        this.chassis = new Chassis(this.gl, this.camera);
        this.chassis.initBuffers();

        this.frame = new Frame(this.gl, this.camera);
        this.frame.initBuffers();

        this.leftWheel = new LeftWheel(this.gl, this.camera);
        this.leftWheel.initBuffers();

        this.seat = new Seat(this.gl, this.camera);
        this.seat.initBuffers();

    }

    handleKeys(currentlyPressedKey){
        this.wheel.handleKeys(currentlyPressedKey);
        if(currentlyPressedKey[74]){
            // J is pressed = positiv rotasjon y-aksen til bikeFront
            if(this.swingRotation !== 50){
                this.swingRotation += 1;
            }
        }
        if(currentlyPressedKey[75]){
            //K is pressed = negativ rotasjon y-aksen til bikeFront
            if(this.swingRotation !== -50){
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

        modelMatrix.translate(0, 15, -40);
        modelMatrix.scale(0.7, 0.7, 0.7);
        this.seat.draw(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(90, 15, -40);
        modelMatrix.rotate(this.swingRotation, 0, 1, 0);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.leftWheel.draw(0.01, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(90, 15, 0);
        modelMatrix.rotate(this.swingRotation, 0, 1, 0);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.wheel.draw(0.01, modelMatrix);


        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-90, 15, -40);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.leftWheel.draw(0.01, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-90, 15, 0);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.wheel.draw(0.01, modelMatrix);





        this.stack.pushMatrix();

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0,5,0)
        this.chassis.draw(elapsed, modelMatrix);

        this.stack.pushMatrix();

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(0,5,0)
        this.frame.draw(elapsed, modelMatrix);

    }

}