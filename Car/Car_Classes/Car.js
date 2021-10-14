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

        this.door = new Doors(this.gl, this.camera);
        this.door.initBuffers();
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

        //left front seat
        modelMatrix.translate(-8, 39, -18);
        modelMatrix.scale(0.6, 0.7, 0.7);
        this.seat.draw(elapsed, modelMatrix);

        //right front seat
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-8, 39, 5);
        modelMatrix.scale(0.6, 0.7, 0.7);
        this.seat.draw(elapsed, modelMatrix);

        //backseats
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-36, 35.6, 9);
        modelMatrix.scale(0.5, 0.6, 0.6);
        this.seat.draw(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-36, 35.6, -5);
        modelMatrix.scale(0.5, 0.6, 0.6);
        this.seat.draw(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-36, 35.6, -19);
        modelMatrix.scale(0.5, 0.6, 0.6);
        this.seat.draw(elapsed, modelMatrix);

        //wheels
        //FrontLeft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(39, 15, -33);
        modelMatrix.rotate(this.swingRotation, 0, 1, 0);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.leftWheel.draw(0.01, modelMatrix);
        //FrontRight
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(39, 15, 33);
        modelMatrix.rotate(this.swingRotation, 0, 1, 0);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.wheel.draw(0.01, modelMatrix);
        //BackLeft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-39, 15, -31);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.leftWheel.draw(0.01, modelMatrix);
        //BackRight
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-39, 15, 31);
        modelMatrix.rotate(this.backWheelRotation, 0, 0, 1);
        this.wheel.draw(0.01, modelMatrix);

        //this.stack.pushMatrix();

        //Chassis
        modelMatrix = this.stack.peekMatrix();
        //modelMatrix.translate(0,5,0)
        this.chassis.draw(elapsed, modelMatrix);

        this.stack.pushMatrix();

        //Frame
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(45,30,0)
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.frame.draw(elapsed, modelMatrix);

        this.stack.pushMatrix();

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(17,19,25)
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.door.draw(elapsed, modelMatrix);

        this.stack.pushMatrix();

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(17,19,25)
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.door.draw(elapsed, modelMatrix);
    }
}