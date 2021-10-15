"use strict";

class Frame extends Car {

    constructor(gl, camera) {
        super(gl, camera);
        this.gl = gl;
        this.camera = camera;
        this.gl = gl;
        this.camera = camera;

        this.carFrame = null;
        this.chassisOverlag = null;
        this.frontLight = null;
        this.doorHinges = null;
    }

    initBuffers(){
        this.carFrame = new CubeTransparent(this.gl, this.camera, {red:0.478, green: 0.0, blue: 0.0, alpha: this.transparencyAlphaValue}, false);
        this.carFrame.init('my-vertex-shader', 'my-fragment-shader');

        this.chassisOverlag = new CubeTransparent(this.gl, this.camera, {red:0.372, green: 0.239, blue: 0.420, alpha: this.transparencyAlphaValue}, false);
        this.chassisOverlag.init('my-vertex-shader', 'my-fragment-shader');

        this.frontLight = new Cylinder(this.gl, this.camera, {red:0.9, green: 0.7, blue:0.1, alpha:1}, false);
        this.frontLight.init('my-vertex-shader', 'my-fragment-shader');

        this.doorHinges = new Cylinder(this.gl, this.camera, {red:0.9, green: 0.7, blue:0.1, alpha:1}, false);
        this.doorHinges.init('my-vertex-shader', 'my-fragment-shader');

    }

    handleKeys(currentlyPressedKey){

    }

    draw(elapsed, modelMatrix){
        // HUSK: I*T*O*R*S  der O = R * T
        //modelMatrix.setIdentity();
        this.stack.pushMatrix(modelMatrix);

        //front
        //this.stack.peekMatrix(modelMatrix);
        //modelMatrix.translate(44.5, 21.5, 0);
        //modelMatrix.rotate(-80, 0, 0, 1);
        modelMatrix.translate(10, -3, 0);
        modelMatrix.rotate(8, 0, 0, 1);
        modelMatrix.scale(0.9, 15, 30);
        this.carFrame.draw(elapsed, modelMatrix);

        //frontsideright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-16, -5, 32);
        modelMatrix.rotate(7, 0, 1, 0);
        modelMatrix.scale(27, 15, 0.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //frontsideleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-16, -5, -32);
        modelMatrix.rotate(-6, 0, 1, 0);
        modelMatrix.scale(27, 15, 0.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //fronttopleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-18, 11, -18);
        modelMatrix.rotate(-6, 1, 0, 0);
        modelMatrix.rotate(-8, 0, 1, 0);
        modelMatrix.scale(27, 0.5, 15);
        this.carFrame.draw(elapsed, modelMatrix);

        //fronttopright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-18, 11, 18);
        modelMatrix.rotate(5, 1, 0, 0);
        modelMatrix.rotate(8, 0, 1, 0);
        modelMatrix.scale(27, 0.5, 15);
        this.carFrame.draw(elapsed, modelMatrix);

        //fronttopmiddle
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-19.5, 12.5, 0);
        //modelMatrix.rotate(-1, 0, 0, 1);
        modelMatrix.scale(27, 0.5, 7);
        this.carFrame.draw(elapsed, modelMatrix);

        this.stack.pushMatrix(modelMatrix);
        this.stack.popMatrix();

        //windshieldframeright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-42.7, 24.5, 33);
        modelMatrix.rotate(15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //windshieldframeleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-42.7, 24.5, -33);
        modelMatrix.rotate(15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //roofright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-86, 41, 18);
        modelMatrix.rotate(5, 1, 0, 0);
        modelMatrix.scale(40, 0.5, 18);
        this.carFrame.draw(elapsed, modelMatrix);

        //roofright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-86, 41, -18);
        modelMatrix.rotate(-5, 1, 0, 0);
        modelMatrix.scale(40, 0.5, 18);
        this.carFrame.draw(elapsed, modelMatrix);

        //backshieldframeright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-129.7, 24.9, 33);
        modelMatrix.rotate(-15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //backshieldframeleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-129.7, 24.7, -33);
        modelMatrix.rotate(-15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //backsideright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-153, -5, 32);
        modelMatrix.rotate(-8, 0, 1, 0);
        modelMatrix.scale(20, 15, 0.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //backsideleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-153, -5, -32);
        modelMatrix.rotate(8, 0, 1, 0);
        modelMatrix.scale(20, 15, 0.5);
        this.carFrame.draw(elapsed, modelMatrix);

        //backtopleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-151, 11, -18);
        modelMatrix.rotate(-5, 1, 0, 0);
        modelMatrix.rotate(8, 0, 1, 0);
        modelMatrix.scale(20, 0.5, 15);
        this.carFrame.draw(elapsed, modelMatrix);

        //backtopright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-151, 11, 18);
        modelMatrix.rotate(5, 1, 0, 0);
        modelMatrix.rotate(-8, 0, 1, 0);
        modelMatrix.scale(20, 0.5, 15);
        this.carFrame.draw(elapsed, modelMatrix);

        //backtopmiddle
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-150, 12.5, 0);
        //modelMatrix.rotate(-1, 0, 0, 1);
        modelMatrix.scale(20, 0.5, 7);
        this.carFrame.draw(elapsed, modelMatrix);

        //backside
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-173, -5, 0);
        modelMatrix.scale(0.5, 15, 30);
        this.carFrame.draw(elapsed, modelMatrix);

        //frontLights
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(11, -3, 18);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(7, 0.5, 7);
        this.frontLight.draw(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(11, -3, -18);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(7, 0.5, 7);
        this.frontLight.draw(modelMatrix);

        //chassis overlag
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-80, -19, 0);
        modelMatrix.scale(90, 1, 27);
        this.chassisOverlag.draw(elapsed, modelMatrix);

        //side pole right
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-80, 10, 32);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(30, 2, 1);
        this.carFrame.draw(elapsed, modelMatrix);
        //side pole left
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-80, 10, -32);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(30, 2, 1);
        this.carFrame.draw(elapsed, modelMatrix);

        //side pole down right
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-85, -18, 32);
        modelMatrix.scale(65, 3, 1);
        this.carFrame.draw(elapsed, modelMatrix);
        //side pole down left
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-85, -18, -32);
        modelMatrix.scale(65, 3, 1);
        this.carFrame.draw(elapsed, modelMatrix);

        //door hinge right
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-43, -11, 36);
        this.doorHinges.draw(modelMatrix)
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-43, 2, 36);
        this.doorHinges.draw(modelMatrix)

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-82, -11, 33);
        this.doorHinges.draw(modelMatrix)
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-82, 2, 33);
        this.doorHinges.draw(modelMatrix)

        //door hinge left
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-43, -11, -36);
        this.doorHinges.draw(modelMatrix)
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-43, 2, -36);
        this.doorHinges.draw(modelMatrix)

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-82, -11, -33);
        this.doorHinges.draw(modelMatrix)
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-82, 2, -33);
        this.doorHinges.draw(modelMatrix)

        //back side of the back-right door
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-121.7, -2, 34);
        modelMatrix.scale(12, 13, 1);
        this.carFrame.draw(elapsed, modelMatrix);

        //back side of the back-left door
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-121.7, -2, -34);
        modelMatrix.scale(12, 13, 1);
        this.carFrame.draw(elapsed, modelMatrix);


        this.stack.empty();
    }
}