"use strict";


class Chassis extends Car {

    constructor(gl, camera) {
        super(gl, camera);
        this.gl = gl;
        this.camera = camera;
        //this.stack = new Stack();

        this.torus = null;
        this.propellerShaft = null;
    }

    initBuffers(){
        this.torus = new Torus(this.gl, this.camera, 0, false);
        this.torus.initBuffers();

        this.propellerShaft = new Cylinder(this.gl, this.camera,{red:0.379, green: 0.282, blue:0.282, alpha:1},  false);
        this.propellerShaft.initBuffers();

        this.slipJoint = new Cylinder(this.gl, this.camera,{red:0.227, green: 0.152, blue:0.152, alpha:1},  false);
        this.slipJoint.initBuffers();

        this.universialJoint = new Cylinder(this.gl, this.camera,{red:0.227, green: 0.152, blue:0.152, alpha:1},  false);
        this.universialJoint.initBuffers();

        this.gearBox = new Cylinder(this.gl, this.camera,{red:0.227, green: 0.152, blue:0.152, alpha:1},  false);
        this.gearBox.initBuffers();

        this.clutchBox = new Cylinder(this.gl, this.camera,{red:0.333, green: 0.105, blue:0.105, alpha:1},  false);
        this.clutchBox.initBuffers();

        this.engine = new Cube(this.gl, this.camera,{red:0.333, green: 0.235, blue:0.105, alpha:1},  false);
        this.engine.initBuffers();

        this.radiator = new Cube(this.gl, this.camera,{red:0.333, green: 0.235, blue:0.204, alpha:1},  false);
        this.radiator.initBuffers();

        this.frame = new Cube(this.gl, this.camera,{red:0.333, green: 0.235, blue:0.204, alpha:1},  false);
        this.frame.initBuffers();
    }
s
    handleKeys(currentlyPressedKey){

    }

    draw(elapsed, modelMatrix){
        // HUSK: I*T*O*R*S  der O = R * T
        //Navn til modellene hentet fra https://innovationdiscoveries.space/understanding-the-vehicle-chassis-system/
        modelMatrix.setIdentity();
        this.stack.pushMatrix(modelMatrix);

        //propellerShaft
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 15, 0);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(1.5, 13, 1.5);
        this.propellerShaft.draw(modelMatrix);

        //bak shaft
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 3, 0);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(1, 3.5, 0.1);
        this.propellerShaft.draw(modelMatrix);

        //front shaft
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 0, 60);
        this.propellerShaft.draw(modelMatrix);

        //slipJoint
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 0, -20);
        modelMatrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(1.5, 0.8, 0.4);
        this.slipJoint.draw(modelMatrix);

        //universialJoint foran
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 5, 0);
        modelMatrix.rotate(90, 0, 1, 0);
        modelMatrix.scale(1, 0.3, 1);
        this.universialJoint.draw(modelMatrix);

        //universialJoint bakre
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, -170, 0);
        modelMatrix.rotate(90, 0, 1, 0);
        this.universialJoint.draw(modelMatrix);

        this.stack.pushMatrix(modelMatrix);

        //gearBox
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 179, 0);
        modelMatrix.scale(1, 2, 1.5);
        this.gearBox.draw(modelMatrix);

        //clutchBox
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 4, 0);
        modelMatrix.scale(1, 0.5, 1.5);
        this.clutchBox.draw(modelMatrix);

        //engine
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 18, 0);
        modelMatrix.scale(1, 7, 0.7);
        this.clutchBox.draw(modelMatrix);
        //engine
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(-3.2, 0.5, 0);
        modelMatrix.scale(2, 2.5, 2);
        this.engine.draw(elapsed, modelMatrix);
        //radiator
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 2, 0);
        modelMatrix.scale(1, 0.1, 1);
        this.radiator.draw(elapsed, modelMatrix);

        this.stack.pushMatrix(modelMatrix);
        // HUSK: I*T*O*R*S  der O = R * T

        //frame
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 2, 0);
        Matrix.rotate(90, 1, 0, 0);
        modelMatrix.scale(1, 0.1, 1);
        this.frame.draw(elapsed, modelMatrix);


        //Tømmer stacken ...:
        while (this.stack.length > 0)
            matrixStack.pop();
    }

}