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
        this.front.init('my-vertex-shader', 'my-fragment-shader');

        this.frontLight= new Cylinder(this.gl, this.camera, {red:0.9, green: 0.7, blue:0.1, alpha:1});
        this.frontLight.init('my-vertex-shader', 'my-fragment-shader');


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
        this.front.draw(elapsed, modelMatrix);

        //frontsideright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-16, -5, 32);
        modelMatrix.rotate(7, 0, 1, 0);
        modelMatrix.scale(27, 15, 0.5);
        this.front.draw(elapsed, modelMatrix);

        //frontsideleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-16, -5, -32);
        modelMatrix.rotate(-6, 0, 1, 0);
        modelMatrix.scale(27, 15, 0.5);
        this.front.draw(elapsed, modelMatrix);

        //fronttopleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-18, 11, -18);
        modelMatrix.rotate(-6, 1, 0, 0);
        modelMatrix.rotate(-8, 0, 1, 0);
        modelMatrix.scale(27, 0.5, 15);
        this.front.draw(elapsed, modelMatrix);

        //fronttopright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-18, 11, 18);
        modelMatrix.rotate(5, 1, 0, 0);
        modelMatrix.rotate(8, 0, 1, 0);
        modelMatrix.scale(27, 0.5, 15);
        this.front.draw(elapsed, modelMatrix);

        //fronttopmiddle
        modelMatrix = this.stack.peekMatrix();///////////
        modelMatrix.translate(-19.5, 12.5, 0);
        //modelMatrix.rotate(-1, 0, 0, 1);
        modelMatrix.scale(27, 0.5, 7);
        this.front.draw(elapsed, modelMatrix);

        this.stack.pushMatrix(modelMatrix);
        this.stack.popMatrix();

        //windshieldframeright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-42.7, 24.5, 33);
        modelMatrix.rotate(15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.front.draw(elapsed, modelMatrix);

        //windshieldframeleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-42.7, 24.5, -33);
        modelMatrix.rotate(15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.front.draw(elapsed, modelMatrix);

        //roofright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-86, 41, 18);
        modelMatrix.rotate(5, 1, 0, 0);
        modelMatrix.scale(40, 0.5, 18);
        this.front.draw(elapsed, modelMatrix);

        //roofright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-86, 41, -18);
        modelMatrix.rotate(-5, 1, 0, 0);
        modelMatrix.scale(40, 0.5, 18);
        this.front.draw(elapsed, modelMatrix);

        //backshieldframeright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-129.7, 24.9, 33);
        modelMatrix.rotate(-15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.front.draw(elapsed, modelMatrix);

        //backshieldframeleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-129.7, 24.7, -33);
        modelMatrix.rotate(-15, 0, 0, 1);
        modelMatrix.scale(0.5, 15, 1.5);
        this.front.draw(elapsed, modelMatrix);

        //backsideright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-153, -5, 32);
        modelMatrix.rotate(-8, 0, 1, 0);
        modelMatrix.scale(20, 15, 0.5);
        this.front.draw(elapsed, modelMatrix);

        //backsideleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-153, -5, -32);
        modelMatrix.rotate(8, 0, 1, 0);
        modelMatrix.scale(20, 15, 0.5);
        this.front.draw(elapsed, modelMatrix);

        //backtopleft
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-151, 11, -18);
        modelMatrix.rotate(-5, 1, 0, 0);
        modelMatrix.rotate(8, 0, 1, 0);
        modelMatrix.scale(20, 0.5, 15);
        this.front.draw(elapsed, modelMatrix);

        //backtopright
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-151, 11, 18);
        modelMatrix.rotate(5, 1, 0, 0);
        modelMatrix.rotate(-8, 0, 1, 0);
        modelMatrix.scale(20, 0.5, 15);
        this.front.draw(elapsed, modelMatrix);

        //backtopmiddle
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-150, 12.5, 0);
        //modelMatrix.rotate(-1, 0, 0, 1);
        modelMatrix.scale(20, 0.5, 7);
        this.front.draw(elapsed, modelMatrix);

        //backside
        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-173, -5, 0);
        modelMatrix.scale(0.5, 15, 30);
        this.front.draw(elapsed, modelMatrix);

        //frontLight
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

        //this.stack.popMatrix();

        //modelMatrix.setIdentity();
        //this.stack.pushMatrix(modelMatrix);

        //front panser
        /*this.stack.peekMatrix(modelMatrix);
        modelMatrix.translate(35.5, 28.2, 0);
        modelMatrix.rotate(80, 0, 0, 1);
        modelMatrix.scale(0.2, 10, 20);
        this.front.draw(elapsed, modelMatrix);*/

        // //front panser
        // this.stack.peekMatrix(modelMatrix);
        // modelMatrix.translate(0, 2, -1);
        // modelMatrix.rotate(-20, 1, 0, 0);
        // modelMatrix.scale(20, 0.05, 1);
        // this.front.draw(elapsed, modelMatrix);


        this.stack.empty();
    }
}