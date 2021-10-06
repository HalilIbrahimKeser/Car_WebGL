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
        this.front = new Cube(this.gl, this.camera, 0, false);
        this.front.initBuffers();


    }

    handleKeys(currentlyPressedKey){

    }

    draw(elapsed, modelMatrix){
        // HUSK: I*T*O*R*S  der O = R * T
        //Navn til modellene hentet fra https://innovationdiscoveries.space/understanding-the-vehicle-chassis-system/
        modelMatrix.setIdentity();
        this.stack.pushMatrix(modelMatrix);

        // //front
        this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(0, 1, 0);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(1, 1, 1);
        this.front.draw(elapsed, modelMatrix);


        this.stack.empty();
    }
}