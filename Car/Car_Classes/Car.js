"use strict";

//Navn til modellene hentet fra https://innovationdiscoveries.space/understanding-the-vehicle-chassis-system/

class Car {
    constructor(gl, camera, color, doorColor, doorHandleColor) {
        this.gl = gl;
        this.camera = camera;
        this.stack = new Stack();
        if(!color)
            this.color={red:0.2, green:0.5, blue: 0.5};
        else
            this.color = color;

        if(!doorColor)
            this.doorColor={red:0.400, green: 0.0, blue: 0.0};
        else
            this.doorColor = doorColor;

        if(!doorHandleColor)
            this.doorHandleColor={red:0.3, green: 0.0, blue: 0.4};
        else
            this.doorHandleColor = doorHandleColor;

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
        this.createLeftBackDoorVariations();
        this.createRightDoorVariations();
        this.createRBDVariations();

        this.leftWheel = new LeftWheel(this.gl, this.camera);
        this.leftWheel.initBuffers();

        this.seat = new Seat(this.gl, this.camera);
        this.seat.initBuffers();

        //this.leftDoor = new LeftDoor(this.gl, this.camera);
        //this.leftDoor.initBuffers();

        //this.rightDoor = new RightDoor(this.gl, this.camera);
        //this.rightDoor.initBuffers();

        //this.leftDoorBack = new LeftDoorBack(this.gl, this.camera);
        //this.leftDoorBack.initBuffers();

        //this.rightDoorBack = new RightDoorBack(this.gl, this.camera);
        //this.rightDoorBack.initBuffers();

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
        this.drawRightDoor(elapsed,modelMatrix);

        //Left Door Back
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-8,19,24)
        modelMatrix.rotate(this.doorRotation, 0, 1, 0);
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.drawLBDoor(elapsed, modelMatrix);

        //Right Door Back
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-8,19,-24)
        modelMatrix.rotate(-this.doorRotation, 0, 1, 0);
        modelMatrix.scale(0.65, 0.7, 0.7);
        this.drawRBDoor(elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(13,38,-12)
        modelMatrix.rotate(-20, 0, 0, 1);
        modelMatrix.scale(0.5, 0.5, 0.5);
        this.steering.draw(elapsed, modelMatrix);

        this.stack.pushMatrix();
    }

    createFrameVariations(){
        this.frameOpaque1 = new FrameOpaque(this.gl, this.camera, 1.0, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque1.initBuffers();

        this.frameOpaque095 = new FrameOpaque(this.gl, this.camera, 0.95, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque095.initBuffers();

        this.frameOpaque09 = new FrameOpaque(this.gl, this.camera, 0.9, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque09.initBuffers();

        this.frameOpaque085 = new FrameOpaque(this.gl, this.camera, 0.85, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque085.initBuffers();

        this.frameOpaque08 = new FrameOpaque(this.gl, this.camera, 0.8, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque08.initBuffers();

        this.frameOpaque075 = new FrameOpaque(this.gl, this.camera, 0.75, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque075.initBuffers();

        this.frameOpaque07 = new FrameOpaque(this.gl, this.camera, 0.7, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque07.initBuffers();

        this.frameOpaque065 = new FrameOpaque(this.gl, this.camera, 0.65, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque065.initBuffers();

        this.frameOpaque06 = new FrameOpaque(this.gl, this.camera, 0.6, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque06.initBuffers();

        this.frameOpaque055 = new FrameOpaque(this.gl, this.camera, 0.55, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque055.initBuffers();

        this.frameOpaque05 = new FrameOpaque(this.gl, this.camera, 0.5, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque05.initBuffers();

        this.frameOpaque045 = new FrameOpaque(this.gl, this.camera, 0.45, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque045.initBuffers();

        this.frameOpaque04 = new FrameOpaque(this.gl, this.camera, 0.4, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque04.initBuffers();

        this.frameOpaque035 = new FrameOpaque(this.gl, this.camera, 0.35, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque035.initBuffers();

        this.frameOpaque03 = new FrameOpaque(this.gl, this.camera, 0.3, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque03.initBuffers();

        this.frameOpaque025 = new FrameOpaque(this.gl, this.camera, 0.25, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque025.initBuffers();

        this.frameOpaque02 = new FrameOpaque(this.gl, this.camera, 0.2, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque02.initBuffers();

        this.frameOpaque015 = new FrameOpaque(this.gl, this.camera, 0.15, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque015.initBuffers();

        this.frameOpaque01 = new FrameOpaque(this.gl, this.camera, 0.1, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque01.initBuffers();

        this.frameOpaque005 = new FrameOpaque(this.gl, this.camera, 0.5, {red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque005.initBuffers();

        this.frameOpaque00 = new FrameOpaque(this.gl, this.camera, 0.0,{red: this.color.red, green: this.color.green, blue: this.color.blue});
        this.frameOpaque00.initBuffers();
    }

    createLeftDoorVariations(){
        this.leftDoor1 = new LeftDoorVariation(this.gl, this.camera, 1.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor1.initBuffers();

        this.leftDoor095 = new LeftDoorVariation(this.gl, this.camera, 0.95,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor095.initBuffers();

        this.leftDoor09 = new LeftDoorVariation(this.gl, this.camera, 0.9,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor09.initBuffers();

        this.leftDoor085 = new LeftDoorVariation(this.gl, this.camera, 0.85,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor085.initBuffers();

        this.leftDoor08 = new LeftDoorVariation(this.gl, this.camera, 0.8,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor08.initBuffers();

        this.leftDoor075 = new LeftDoorVariation(this.gl, this.camera, 0.75,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor075.initBuffers();

        this.leftDoor07 = new LeftDoorVariation(this.gl, this.camera, 0.7,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor07.initBuffers();

        this.leftDoor065 = new LeftDoorVariation(this.gl, this.camera, 0.65,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor065.initBuffers();

        this.leftDoor06 = new LeftDoorVariation(this.gl, this.camera, 0.6,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor06.initBuffers();

        this.leftDoor055 = new LeftDoorVariation(this.gl, this.camera, 0.55,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor055.initBuffers();

        this.leftDoor05 = new LeftDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor05.initBuffers();

        this.leftDoor045 = new LeftDoorVariation(this.gl, this.camera, 0.45,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor045.initBuffers();

        this.leftDoor04 = new LeftDoorVariation(this.gl, this.camera, 0.4,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor04.initBuffers();

        this.leftDoor035 = new LeftDoorVariation(this.gl, this.camera, 0.35,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor035.initBuffers();

        this.leftDoor03 = new LeftDoorVariation(this.gl, this.camera, 0.3,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor03.initBuffers();

        this.leftDoor025 = new LeftDoorVariation(this.gl, this.camera, 0.25,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor025.initBuffers();

        this.leftDoor02 = new LeftDoorVariation(this.gl, this.camera, 0.2,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor02.initBuffers();

        this.leftDoor015 = new LeftDoorVariation(this.gl, this.camera, 0.15,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor015.initBuffers();

        this.leftDoor01 = new LeftDoorVariation(this.gl, this.camera, 0.1,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor01.initBuffers();

        this.leftDoor005 = new LeftDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor005.initBuffers();

        this.leftDoor00 = new LeftDoorVariation(this.gl, this.camera, 0.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.leftDoor00.initBuffers();
    }

    createLeftBackDoorVariations(){
        this.lBDoor1 = new LeftBackDoorVariation(this.gl, this.camera, 1.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor1.initBuffers();

        this.lBDoor095 = new LeftBackDoorVariation(this.gl, this.camera, 0.95,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor095.initBuffers();

        this.lBDoor09 = new LeftBackDoorVariation(this.gl, this.camera, 0.9,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor09.initBuffers();

        this.lBDoor085 = new LeftBackDoorVariation(this.gl, this.camera, 0.85,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor085.initBuffers();

        this.lBDoor08 = new LeftBackDoorVariation(this.gl, this.camera, 0.8,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor08.initBuffers();

        this.lBDoor075 = new LeftBackDoorVariation(this.gl, this.camera, 0.75,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor075.initBuffers();

        this.lBDoor07 = new LeftBackDoorVariation(this.gl, this.camera, 0.7,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor07.initBuffers();

        this.lBDoor065 = new LeftBackDoorVariation(this.gl, this.camera, 0.65,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor065.initBuffers();

        this.lBDoor06 = new LeftBackDoorVariation(this.gl, this.camera, 0.6,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor06.initBuffers();

        this.lBDoor055 = new LeftBackDoorVariation(this.gl, this.camera, 0.55,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor055.initBuffers();

        this.lBDoor05 = new LeftBackDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor05.initBuffers();

        this.lBDoor045 = new LeftBackDoorVariation(this.gl, this.camera, 0.45,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor045.initBuffers();

        this.lBDoor04 = new LeftBackDoorVariation(this.gl, this.camera, 0.4,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor04.initBuffers();

        this.lBDoor035 = new LeftBackDoorVariation(this.gl, this.camera, 0.35,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor035.initBuffers();

        this.lBDoor03 = new LeftBackDoorVariation(this.gl, this.camera, 0.3,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor03.initBuffers();

        this.lBDoor025 = new LeftBackDoorVariation(this.gl, this.camera, 0.25,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor025.initBuffers();

        this.lBDoor02 = new LeftBackDoorVariation(this.gl, this.camera, 0.2,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor02.initBuffers();

        this.lBDoor015 = new LeftBackDoorVariation(this.gl, this.camera, 0.15,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor015.initBuffers();

        this.lBDoor01 = new LeftBackDoorVariation(this.gl, this.camera, 0.1,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor01.initBuffers();

        this.lBDoor005 = new LeftBackDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor005.initBuffers();

        this.lBDoor00 = new LeftBackDoorVariation(this.gl, this.camera, 0.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.lBDoor00.initBuffers();
    }

    createRightDoorVariations(){
        this.rDoor1 = new RightDoorVariation(this.gl, this.camera, 1.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor1.initBuffers();

        this.rDoor095 = new RightDoorVariation(this.gl, this.camera, 0.95,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor095.initBuffers();

        this.rDoor09 = new RightDoorVariation(this.gl, this.camera, 0.9,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor09.initBuffers();

        this.rDoor085 = new RightDoorVariation(this.gl, this.camera, 0.85,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor085.initBuffers();

        this.rDoor08 = new RightDoorVariation(this.gl, this.camera, 0.8,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor08.initBuffers();

        this.rDoor075 = new RightDoorVariation(this.gl, this.camera, 0.75,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor075.initBuffers();

        this.rDoor07 = new RightDoorVariation(this.gl, this.camera, 0.7,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor07.initBuffers();

        this.rDoor065 = new RightDoorVariation(this.gl, this.camera, 0.65,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor065.initBuffers();

        this.rDoor06 = new RightDoorVariation(this.gl, this.camera, 0.6,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor06.initBuffers();

        this.rDoor055 = new RightDoorVariation(this.gl, this.camera, 0.55,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor055.initBuffers();

        this.rDoor05 = new RightDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor05.initBuffers();

        this.rDoor045 = new RightDoorVariation(this.gl, this.camera, 0.45,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor045.initBuffers();

        this.rDoor04 = new RightDoorVariation(this.gl, this.camera, 0.4,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor04.initBuffers();

        this.rDoor035 = new RightDoorVariation(this.gl, this.camera, 0.35,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor035.initBuffers();

        this.rDoor03 = new RightDoorVariation(this.gl, this.camera, 0.3,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor03.initBuffers();

        this.rDoor025 = new RightDoorVariation(this.gl, this.camera, 0.25,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor025.initBuffers();

        this.rDoor02 = new RightDoorVariation(this.gl, this.camera, 0.2,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor02.initBuffers();

        this.rDoor015 = new RightDoorVariation(this.gl, this.camera, 0.15,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor015.initBuffers();

        this.rDoor01 = new RightDoorVariation(this.gl, this.camera, 0.1,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor01.initBuffers();

        this.rDoor005 = new RightDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor005.initBuffers();

        this.rDoor00 = new RightDoorVariation(this.gl, this.camera, 0.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rDoor00.initBuffers();
    }

    createRBDVariations(){
        this.rbDoor1 = new RightBackDoorVariation(this.gl, this.camera, 1.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor1.initBuffers();

        this.rbDoor095 = new RightBackDoorVariation(this.gl, this.camera, 0.95,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor095.initBuffers();

        this.rbDoor09 = new RightBackDoorVariation(this.gl, this.camera, 0.9,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor09.initBuffers();

        this.rbDoor085 = new RightBackDoorVariation(this.gl, this.camera, 0.85,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor085.initBuffers();

        this.rbDoor08 = new RightBackDoorVariation(this.gl, this.camera, 0.8,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor08.initBuffers();

        this.rbDoor075 = new RightBackDoorVariation(this.gl, this.camera, 0.75,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor075.initBuffers();

        this.rbDoor07 = new RightBackDoorVariation(this.gl, this.camera, 0.7,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor07.initBuffers();

        this.rbDoor065 = new RightBackDoorVariation(this.gl, this.camera, 0.65,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor065.initBuffers();

        this.rbDoor06 = new RightBackDoorVariation(this.gl, this.camera, 0.6,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor06.initBuffers();

        this.rbDoor055 = new RightBackDoorVariation(this.gl, this.camera, 0.55,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor055.initBuffers();

        this.rbDoor05 = new RightBackDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor05.initBuffers();

        this.rbDoor045 = new RightBackDoorVariation(this.gl, this.camera, 0.45,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor045.initBuffers();

        this.rbDoor04 = new RightBackDoorVariation(this.gl, this.camera, 0.4,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor04.initBuffers();

        this.rbDoor035 = new RightBackDoorVariation(this.gl, this.camera, 0.35,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor035.initBuffers();

        this.rbDoor03 = new RightBackDoorVariation(this.gl, this.camera, 0.3,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor03.initBuffers();

        this.rbDoor025 = new RightBackDoorVariation(this.gl, this.camera, 0.25,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor025.initBuffers();

        this.rbDoor02 = new RightBackDoorVariation(this.gl, this.camera, 0.2,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor02.initBuffers();

        this.rbDoor015 = new RightBackDoorVariation(this.gl, this.camera, 0.15,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor015.initBuffers();

        this.rbDoor01 = new RightBackDoorVariation(this.gl, this.camera, 0.1,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor01.initBuffers();

        this.rbDoor005 = new RightBackDoorVariation(this.gl, this.camera, 0.5,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor005.initBuffers();

        this.rbDoor00 = new RightBackDoorVariation(this.gl, this.camera, 0.0,
            {red: this.doorColor.red, green: this.doorColor.green, blue: this.doorColor.blue},
            {red: this.doorHandleColor.red, green: this.doorHandleColor.green, blue: this.doorHandleColor.blue});
        this.rbDoor00.initBuffers();
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

    drawLBDoor(elapsed, modelMatrix){
        switch (this.transparencyValue){
            case 100:
                this.lBDoor1.draw(elapsed, modelMatrix);
                break;
            case 95:
                this.lBDoor095.draw(elapsed, modelMatrix);
                break;
            case 90:
                this.lBDoor09.draw(elapsed, modelMatrix);
                break;
            case 85:
                this.lBDoor085.draw(elapsed, modelMatrix);
                break;
            case 80:
                this.lBDoor08.draw(elapsed, modelMatrix);
                break;
            case 75:
                this.lBDoor075.draw(elapsed, modelMatrix);
                break;
            case 70:
                this.lBDoor07.draw(elapsed, modelMatrix);
                break;
            case 65:
                this.lBDoor065.draw(elapsed, modelMatrix);
                break;
            case 60:
                this.lBDoor06.draw(elapsed, modelMatrix);
                break;
            case 55:
                this.lBDoor055.draw(elapsed, modelMatrix);
                break;
            case 50:
                this.lBDoor05.draw(elapsed, modelMatrix);
                break;
            case 45:
                this.lBDoor045.draw(elapsed, modelMatrix);
                break;
            case 40:
                this.lBDoor04.draw(elapsed, modelMatrix);
                break;
            case 35:
                this.lBDoor035.draw(elapsed, modelMatrix);
                break;
            case 30:
                this.lBDoor03.draw(elapsed, modelMatrix);
                break;
            case 25:
                this.lBDoor025.draw(elapsed, modelMatrix);
                break;
            case 20:
                this.lBDoor02.draw(elapsed, modelMatrix);
                break;
            case 15:
                this.lBDoor015.draw(elapsed, modelMatrix);
                break;
            case 10:
                this.lBDoor01.draw(elapsed, modelMatrix);
                break;
            case 5:
                this.lBDoor005.draw(elapsed, modelMatrix);
                break;
            case 0:
                this.lBDoor00.draw(elapsed, modelMatrix);
                break;
        }
    }

    drawRightDoor(elapsed, modelMatrix){
        switch (this.transparencyValue){
            case 100:
                this.rDoor1.draw(elapsed, modelMatrix);
                break;
            case 95:
                this.rDoor095.draw(elapsed, modelMatrix);
                break;
            case 90:
                this.rDoor09.draw(elapsed, modelMatrix);
                break;
            case 85:
                this.rDoor085.draw(elapsed, modelMatrix);
                break;
            case 80:
                this.rDoor08.draw(elapsed, modelMatrix);
                break;
            case 75:
                this.rDoor075.draw(elapsed, modelMatrix);
                break;
            case 70:
                this.rDoor07.draw(elapsed, modelMatrix);
                break;
            case 65:
                this.rDoor065.draw(elapsed, modelMatrix);
                break;
            case 60:
                this.rDoor06.draw(elapsed, modelMatrix);
                break;
            case 55:
                this.rDoor055.draw(elapsed, modelMatrix);
                break;
            case 50:
                this.rDoor05.draw(elapsed, modelMatrix);
                break;
            case 45:
                this.rDoor045.draw(elapsed, modelMatrix);
                break;
            case 40:
                this.rDoor04.draw(elapsed, modelMatrix);
                break;
            case 35:
                this.rDoor035.draw(elapsed, modelMatrix);
                break;
            case 30:
                this.rDoor03.draw(elapsed, modelMatrix);
                break;
            case 25:
                this.rDoor025.draw(elapsed, modelMatrix);
                break;
            case 20:
                this.rDoor02.draw(elapsed, modelMatrix);
                break;
            case 15:
                this.rDoor015.draw(elapsed, modelMatrix);
                break;
            case 10:
                this.rDoor01.draw(elapsed, modelMatrix);
                break;
            case 5:
                this.rDoor005.draw(elapsed, modelMatrix);
                break;
            case 0:
                this.rDoor00.draw(elapsed, modelMatrix);
                break;
        }
    }

    drawRBDoor(elapsed, modelMatrix){
        switch (this.transparencyValue){
            case 100:
                this.rbDoor1.draw(elapsed, modelMatrix);
                break;
            case 95:
                this.rbDoor095.draw(elapsed, modelMatrix);
                break;
            case 90:
                this.rbDoor09.draw(elapsed, modelMatrix);
                break;
            case 85:
                this.rbDoor085.draw(elapsed, modelMatrix);
                break;
            case 80:
                this.rbDoor08.draw(elapsed, modelMatrix);
                break;
            case 75:
                this.rbDoor075.draw(elapsed, modelMatrix);
                break;
            case 70:
                this.rbDoor07.draw(elapsed, modelMatrix);
                break;
            case 65:
                this.rbDoor065.draw(elapsed, modelMatrix);
                break;
            case 60:
                this.rbDoor06.draw(elapsed, modelMatrix);
                break;
            case 55:
                this.rbDoor055.draw(elapsed, modelMatrix);
                break;
            case 50:
                this.rbDoor05.draw(elapsed, modelMatrix);
                break;
            case 45:
                this.rbDoor045.draw(elapsed, modelMatrix);
                break;
            case 40:
                this.rbDoor04.draw(elapsed, modelMatrix);
                break;
            case 35:
                this.rbDoor035.draw(elapsed, modelMatrix);
                break;
            case 30:
                this.rbDoor03.draw(elapsed, modelMatrix);
                break;
            case 25:
                this.rbDoor025.draw(elapsed, modelMatrix);
                break;
            case 20:
                this.rbDoor02.draw(elapsed, modelMatrix);
                break;
            case 15:
                this.rbDoor015.draw(elapsed, modelMatrix);
                break;
            case 10:
                this.rbDoor01.draw(elapsed, modelMatrix);
                break;
            case 5:
                this.rbDoor005.draw(elapsed, modelMatrix);
                break;
            case 0:
                this.rbDoor00.draw(elapsed, modelMatrix);
                break;
        }
    }



}