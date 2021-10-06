"use strict";

//TODO extends gir feil
class Frame //extends Car {
{
    constructor(gl, camera) {
        //super(gl, camera);
        this.gl = gl;
        this.camera = camera;
        this.stack = new Stack();

        this.front = null;
    }

    initBuffers(){
        this.front = new Cube(this.gl, this.camera, {red:0.478, green: 0.0, blue: 0.0, alpha: 0.9}, false);
        this.front.initBuffers();


    }

    handleKeys(currentlyPressedKey){

    }

    draw(elapsed, modelMatrix){
        // HUSK: I*T*O*R*S  der O = R * T
        modelMatrix.setIdentity();
        this.stack.pushMatrix(modelMatrix);

        //front
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(44.5, 21.5, 0);
        //modelMatrix.rotate(-80, 0, 0, 1);
        modelMatrix.scale(1, 5, 10);
        this.front.draw(elapsed, modelMatrix);
        this.stack.popMatrix();

        modelMatrix.setIdentity();
        this.stack.pushMatrix(modelMatrix);

        //front panser
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(35.5, 28.2, 0);
        modelMatrix.rotate(80, 0, 0, 1);
        modelMatrix.scale(0.2, 10, 20);
        this.front.draw(elapsed, modelMatrix);

        // //front panser
        // this.stack.peekMatrix(modelMatrix);
        // modelMatrix.translate(0, 2, -1);
        // modelMatrix.rotate(-20, 1, 0, 0);
        // modelMatrix.scale(20, 0.05, 1);
        // this.front.draw(elapsed, modelMatrix);


        this.stack.empty();
    }
}