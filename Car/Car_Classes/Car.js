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
        this.doorRotation = 0;
    }

    initBuffers(){
        this.wheel = new RightWheel(this.gl, this.camera);
        this.wheel.initBuffers();

        this.chassis = new Chassis(this.gl, this.camera);
        this.chassis.initBuffers();

        this.frame = new Frame(this.gl, this.camera);
        this.frame.initBuffers();

        this.leftWheel = new LeftWheel(this.gl, this.camera);
        this.leftWheel.initBuffers();

        this.seat = new Seat(this.gl, this.camera);
        this.seat.initBuffers();

        this.leftDoor = new LeftDoor(this.gl, this.camera);
        this.leftDoor.initBuffers();

        this.rightDoor = new RightDoor(this.gl, this.camera);
        this.rightDoor.initBuffers();

        this.leftDoorBack = new LeftDoorBack(this.gl, this.camera);
        this.leftDoorBack.initBuffers();

        this.rightDoorBack = new RightDoorBack(this.gl, this.camera);
        this.rightDoorBack.initBuffers();

        this.steering = new Steering(this.gl, this.camera);
        this.steering.initBuffers();
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
        if (currentlyPressedKey[79]){
            //O is pressed = roter hjula framover = negativ rotasjon z-aksen
            if(this.doorRotation !== 0){
                this.doorRotation -= 1;
            }
        }
        if (currentlyPressedKey[80]){
            //P is pressed = roter hjula bakover = positiv rotasjon z-aksen
            if(this.doorRotation !== 120){
                this.doorRotation += 1;
            }
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

        //Chassis
        modelMatrix = this.stack.peekMatrix();
        //modelMatrix.translate(0,5,0)
        this.chassis.draw(elapsed, modelMatrix);

        //Frame
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(45,30,0)
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.frame.draw(elapsed, modelMatrix);

        //Left Door
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(17,19,25)
        modelMatrix.rotate(this.doorRotation, 0, 1, 0);
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.leftDoor.draw(elapsed, modelMatrix);

        //Right Door
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(17,19,-25)
        modelMatrix.rotate(-this.doorRotation, 0, 1, 0);
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.rightDoor.draw(elapsed, modelMatrix);

        //Left Door Back
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-8,19,24)
        modelMatrix.rotate(this.doorRotation, 0, 1, 0);
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.leftDoorBack.draw(elapsed, modelMatrix);

        //Right Door Back
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-8,19,-24)
        modelMatrix.rotate(-this.doorRotation, 0, 1, 0);
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.rightDoorBack.draw(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(13,38,-12)
        modelMatrix.rotate(-20, 0, 0, 1);
        modelMatrix.scale(0.5, 0.5, 0.5);
        this.steering.draw(elapsed, modelMatrix);

        this.stack.pushMatrix();
    }
}