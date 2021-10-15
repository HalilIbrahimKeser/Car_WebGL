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

        //Transparent kan styres her fra
        this.transparencyAlphaValue = 0.7;

        this.transparencyValue = 100;
    }

    initBuffers(){
        this.wheel = new RightWheel(this.gl, this.camera);
        this.wheel.initBuffers();

        this.chassis = new Chassis(this.gl, this.camera);
        this.chassis.initBuffers();

        //this.frame = new Frame(this.gl, this.camera);
        //this.frame.initBuffers();

        this.createFrameVariations();
        this.createLeftDoorVariations();

        this.leftWheel = new LeftWheel(this.gl, this.camera);
        this.leftWheel.initBuffers();

        this.seat = new Seat(this.gl, this.camera);
        this.seat.initBuffers();

        //this.leftDoor = new LeftDoor(this.gl, this.camera);
        //this.leftDoor.initBuffers();

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
            //O is pressed = lukker dør
            if(this.doorRotation !== 0){
                this.doorRotation -= 1;
            }
        }
        if (currentlyPressedKey[80]){
            //P is pressed = åpner dør
            if(this.doorRotation !== 120){
                this.doorRotation += 1;
            }
        }
        if (currentlyPressedKey[77]){
            //M is pressed = verdi for gjennomsiktighet
            if(this.transparencyValue < 100){
                this.transparencyValue += 5;
                console.log("Transparency: = %f",  this.transparencyValue);
            }
            //this.transparentFrame = true;
        }
        if (currentlyPressedKey[78]){
            //N is pressed = verdi for gjennomsiktighet
            if(this.transparencyValue > 0){
                this.transparencyValue -= 5;
                console.log("Transparency: = %f",  this.transparencyValue);
            }
            //this.transparentFrame = false;
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
        this.drawFrame(elapsed, modelMatrix);


        //Left Door
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(17,19,25)
        modelMatrix.rotate(this.doorRotation, 0, 1, 0);
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.drawLeftDoor(elapsed,modelMatrix);
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

    createFrameVariations(){
        this.frameOpaque1 = new FrameOpaque(this.gl, this.camera, 1.0);
        this.frameOpaque1.initBuffers();

        this.frameOpaque095 = new FrameOpaque(this.gl, this.camera, 0.95);
        this.frameOpaque095.initBuffers();

        this.frameOpaque09 = new FrameOpaque(this.gl, this.camera, 0.9);
        this.frameOpaque09.initBuffers();

        this.frameOpaque085 = new FrameOpaque(this.gl, this.camera, 0.85);
        this.frameOpaque085.initBuffers();

        this.frameOpaque08 = new FrameOpaque(this.gl, this.camera, 0.8);
        this.frameOpaque08.initBuffers();

        this.frameOpaque075 = new FrameOpaque(this.gl, this.camera, 0.75);
        this.frameOpaque075.initBuffers();

        this.frameOpaque07 = new FrameOpaque(this.gl, this.camera, 0.7);
        this.frameOpaque07.initBuffers();

        this.frameOpaque065 = new FrameOpaque(this.gl, this.camera, 0.65);
        this.frameOpaque065.initBuffers();

        this.frameOpaque06 = new FrameOpaque(this.gl, this.camera, 0.6);
        this.frameOpaque06.initBuffers();

        this.frameOpaque055 = new FrameOpaque(this.gl, this.camera, 0.55);
        this.frameOpaque055.initBuffers();

        this.frameOpaque05 = new FrameOpaque(this.gl, this.camera, 0.5);
        this.frameOpaque05.initBuffers();

        this.frameOpaque045 = new FrameOpaque(this.gl, this.camera, 0.45);
        this.frameOpaque045.initBuffers();

        this.frameOpaque04 = new FrameOpaque(this.gl, this.camera, 0.4);
        this.frameOpaque04.initBuffers();

        this.frameOpaque035 = new FrameOpaque(this.gl, this.camera, 0.35);
        this.frameOpaque035.initBuffers();

        this.frameOpaque03 = new FrameOpaque(this.gl, this.camera, 0.3);
        this.frameOpaque03.initBuffers();

        this.frameOpaque025 = new FrameOpaque(this.gl, this.camera, 0.25);
        this.frameOpaque025.initBuffers();

        this.frameOpaque02 = new FrameOpaque(this.gl, this.camera, 0.2);
        this.frameOpaque02.initBuffers();

        this.frameOpaque015 = new FrameOpaque(this.gl, this.camera, 0.15);
        this.frameOpaque015.initBuffers();

        this.frameOpaque01 = new FrameOpaque(this.gl, this.camera, 0.1);
        this.frameOpaque01.initBuffers();

        this.frameOpaque005 = new FrameOpaque(this.gl, this.camera, 0.5);
        this.frameOpaque005.initBuffers();

        this.frameOpaque00 = new FrameOpaque(this.gl, this.camera, 0.0);
        this.frameOpaque00.initBuffers();
    }

    createLeftDoorVariations(){
        this.leftDoor1 = new LeftDoorVariation(this.gl, this.camera, 1.0);
        this.leftDoor1.initBuffers();

        this.leftDoor095 = new LeftDoorVariation(this.gl, this.camera, 0.95);
        this.leftDoor095.initBuffers();

        this.leftDoor09 = new LeftDoorVariation(this.gl, this.camera, 0.9);
        this.leftDoor09.initBuffers();

        this.leftDoor085 = new LeftDoorVariation(this.gl, this.camera, 0.85);
        this.leftDoor085.initBuffers();

        this.leftDoor08 = new LeftDoorVariation(this.gl, this.camera, 0.8);
        this.leftDoor08.initBuffers();

        this.leftDoor075 = new LeftDoorVariation(this.gl, this.camera, 0.75);
        this.leftDoor075.initBuffers();

        this.leftDoor07 = new LeftDoorVariation(this.gl, this.camera, 0.7);
        this.leftDoor07.initBuffers();

        this.leftDoor065 = new LeftDoorVariation(this.gl, this.camera, 0.65);
        this.leftDoor065.initBuffers();

        this.leftDoor06 = new LeftDoorVariation(this.gl, this.camera, 0.6);
        this.leftDoor06.initBuffers();

        this.leftDoor055 = new LeftDoorVariation(this.gl, this.camera, 0.55);
        this.leftDoor055.initBuffers();

        this.leftDoor05 = new LeftDoorVariation(this.gl, this.camera, 0.5);
        this.leftDoor05.initBuffers();

        this.leftDoor045 = new LeftDoorVariation(this.gl, this.camera, 0.45);
        this.leftDoor045.initBuffers();

        this.leftDoor04 = new LeftDoorVariation(this.gl, this.camera, 0.4);
        this.leftDoor04.initBuffers();

        this.leftDoor035 = new LeftDoorVariation(this.gl, this.camera, 0.35);
        this.leftDoor035.initBuffers();

        this.leftDoor03 = new LeftDoorVariation(this.gl, this.camera, 0.3);
        this.leftDoor03.initBuffers();

        this.leftDoor025 = new LeftDoorVariation(this.gl, this.camera, 0.25);
        this.leftDoor025.initBuffers();

        this.leftDoor02 = new LeftDoorVariation(this.gl, this.camera, 0.2);
        this.leftDoor02.initBuffers();

        this.leftDoor015 = new LeftDoorVariation(this.gl, this.camera, 0.15);
        this.leftDoor015.initBuffers();

        this.leftDoor01 = new LeftDoorVariation(this.gl, this.camera, 0.1);
        this.leftDoor01.initBuffers();

        this.leftDoor005 = new LeftDoorVariation(this.gl, this.camera, 0.5);
        this.leftDoor005.initBuffers();

        this.leftDoor00 = new LeftDoorVariation(this.gl, this.camera, 0.0);
        this.leftDoor00.initBuffers();
    }

    drawFrame(elapsed, modelMatrix){
        switch (this.transparencyValue){
            case 100:
                this.frameOpaque1.draw(elapsed, modelMatrix);
                break;
            case 95:
                this.frameOpaque095.draw(elapsed, modelMatrix);
                break;
            case 90:
                this.frameOpaque09.draw(elapsed, modelMatrix);
                break;
            case 85:
                this.frameOpaque085.draw(elapsed, modelMatrix);
                break;
            case 80:
                this.frameOpaque08.draw(elapsed, modelMatrix);
                break;
            case 75:
                this.frameOpaque075.draw(elapsed, modelMatrix);
                break;
            case 70:
                this.frameOpaque07.draw(elapsed, modelMatrix);
                break;
            case 65:
                this.frameOpaque065.draw(elapsed, modelMatrix);
                break;
            case 60:
                this.frameOpaque06.draw(elapsed, modelMatrix);
                break;
            case 55:
                this.frameOpaque055.draw(elapsed, modelMatrix);
                break;
            case 50:
                this.frameOpaque05.draw(elapsed, modelMatrix);
                break;
            case 45:
                this.frameOpaque045.draw(elapsed, modelMatrix);
                break;
            case 40:
                this.frameOpaque04.draw(elapsed, modelMatrix);
                break;
            case 35:
                this.frameOpaque035.draw(elapsed, modelMatrix);
                break;
            case 30:
                this.frameOpaque03.draw(elapsed, modelMatrix);
                break;
            case 25:
                this.frameOpaque025.draw(elapsed, modelMatrix);
                break;
            case 20:
                this.frameOpaque02.draw(elapsed, modelMatrix);
                break;
            case 15:
                this.frameOpaque015.draw(elapsed, modelMatrix);
                break;
            case 10:
                this.frameOpaque01.draw(elapsed, modelMatrix);
                break;
            case 5:
                this.frameOpaque005.draw(elapsed, modelMatrix);
                break;
            case 0:
                this.frameOpaque00.draw(elapsed, modelMatrix);
                break;

        }
    }

    drawLeftDoor(elapsed, modelMatrix){
        switch (this.transparencyValue){
            case 100:
                this.leftDoor1.draw(elapsed, modelMatrix);
                break;
            case 95:
                this.leftDoor095.draw(elapsed, modelMatrix);
                break;
            case 90:
                this.leftDoor09.draw(elapsed, modelMatrix);
                break;
            case 85:
                this.leftDoor085.draw(elapsed, modelMatrix);
                break;
            case 80:
                this.leftDoor08.draw(elapsed, modelMatrix);
                break;
            case 75:
                this.leftDoor075.draw(elapsed, modelMatrix);
                break;
            case 70:
                this.leftDoor07.draw(elapsed, modelMatrix);
                break;
            case 65:
                this.leftDoor065.draw(elapsed, modelMatrix);
                break;
            case 60:
                this.leftDoor06.draw(elapsed, modelMatrix);
                break;
            case 55:
                this.leftDoor055.draw(elapsed, modelMatrix);
                break;
            case 50:
                this.leftDoor05.draw(elapsed, modelMatrix);
                break;
            case 45:
                this.leftDoor045.draw(elapsed, modelMatrix);
                break;
            case 40:
                this.leftDoor04.draw(elapsed, modelMatrix);
                break;
            case 35:
                this.leftDoor035.draw(elapsed, modelMatrix);
                break;
            case 30:
                this.leftDoor03.draw(elapsed, modelMatrix);
                break;
            case 25:
                this.leftDoor025.draw(elapsed, modelMatrix);
                break;
            case 20:
                this.leftDoor02.draw(elapsed, modelMatrix);
                break;
            case 15:
                this.leftDoor015.draw(elapsed, modelMatrix);
                break;
            case 10:
                this.leftDoor01.draw(elapsed, modelMatrix);
                break;
            case 5:
                this.leftDoor005.draw(elapsed, modelMatrix);
                break;
            case 0:
                this.leftDoor00.draw(elapsed, modelMatrix);
                break;

        }
    }



}