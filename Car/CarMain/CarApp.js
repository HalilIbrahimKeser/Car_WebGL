/**
GRUPPE OPPGAVE AV:

    Nancy Agapito Lacsamana, Halil Ibrahim Keser og Asbjørn Bjørge.

    Oktober 2021. UIT, Campus Narvik
 -----------------------------------------------------------------
 **/


"use strict";

class CarApp{

    constructor(){
        // Kontekst og canvas:
        this.gl = null;
        this.canvas = null;
        this.camera = null;
        this.currentlyPressedKeys = [];
        this.coord = null;
        this.car = null;

        this.stack = new Stack();

        this.car2 = null;

        this.lastTime = 0.0;

        this.fpsData = new Object();

        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;

        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;

        this.car2x = -200;
        this.car2y = 0;
        this.car2z = -150;

        this.car3x = -100;
        this.car3y = 0;
        this.car3z = 150;

        this.car4x = -170;
        this.car4y = 0;
        this.car4z = -10;

        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;

        this.showOtherCars = false;

        this.trafficBtn = null;
    }

    start() {
        this.initContext();
        /*
        let vertexShaderSource = document.getElementById("my-vertex-shader").innerHTML;
        let fragmentShaderSource = document.getElementById("my-fragment-shader").innerHTML;
        if (!initShaders(this.gl, vertexShaderSource, fragmentShaderSource)) {
            console.log("Feil ved initialisering av shaderkoden - se over koden pÃ¥ nytt.");
            return;
        }*/
        /*****TEST AV LYS PÅ CUBE****/
        // let cubeVertexShaderSource = document.getElementById('metalcube-vertex-shader').innerHTML;
        // let cubeFragmentShaderSource = document.getElementById('metalcube-fragment-shader').innerHTML;
        // this.gl.cubeShaderProgram = createProgram(this.gl, cubeVertexShaderSource, cubeFragmentShaderSource);
        // if (!this.gl.cubeShaderProgram) {
        //     console.log('Feil ved initialisering av shaderkoden. Sjekk shaderkoden.');
        //     return;
        // }
        /*****TEST AV LYS PÅ CUBE*****/

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LESS);

        this.camera = new Camera(this.canvas, this.currentlyPressedKeys);
        this.camera.setCamera();

        this.coord = new CoordinateAxis(this.gl, this.camera, 0, 0, 0);
        this.coord.init('my-vertex-shader', 'my-fragment-shader');

        this.car = new Car(this.gl, this.camera, {red:0.478, green:0.0, blue: 0.0},
            {red:0.400, green: 0.0, blue: 0.0}, {red:0.3, green: 0.0, blue: 0.4});
        this.car.initBuffers();

        this.car2 = new Car(this.gl, this.camera, {red:0.0, green:0.1, blue: 0.8},
            {red:0.1, green: 0.1, blue: 0.9}, {red:0.3, green: 0.9, blue: 0.4});
        this.car2.initBuffers();

        this.car3 = new Car(this.gl, this.camera, {red:0.9, green:0.1, blue: 0.4},
            {red:0.2, green: 0.9, blue: 0.4}, {red:0.9, green: 0.6, blue: 0.1});
        this.car3.initBuffers();

        this.car4 = new Car(this.gl, this.camera, {red:0.1, green:0.1, blue: 0.1},
            {red:0.9, green: 0.9, blue: 0.9}, {red:0.9, green: 0.6, blue: 0.1});
        this.car4.initBuffers();

        this.gl.clearColor(0.4, 0.4, 0.4, 1.0); //RGBA

        this.fpsData.antallFrames = 0;
        this.fpsData.forrigeTidsstempel = 0;

        /*this.trafficBtn = document.getElementById("moreCars");
        this.trafficBtn.addEventListener("click", function(){
            console.log("clicked");
            if(this.showOtherCars){
                this.showOtherCars = false;
            } else{
                this.showOtherCars = true;
            }
            console.log("" + this.showOtherCars);
        });*/

        this.draw();
    }

    initContext() {
        this.canvas = document.getElementById("webgl");

        this.gl = this.canvas.getContext("webgl");

        if (!this.gl) {
            console.log("Fikk ikke tak i rendering context for WebGL");
            return false;
        }

        this.gl.viewport(0,0,this.canvas.width,this.canvas.height);


        document.addEventListener("keyup", this.handleKeyUp.bind(this), false);
        document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    }

    handleKeyUp(event) {
        this.currentlyPressedKeys[event.which] = false;
    }

    handleKeyDown(event) {
        this.currentlyPressedKeys[event.which] = true;
        console.log("Keydown, keycode=%d, charCode=%d", event.keyCode, event.charCode);
    }


    handleKeys(elapsed) {
        this.camera.handleKeys(elapsed);
        this.car.handleKeys(this.currentlyPressedKeys);
        this.car2.handleKeys(this.currentlyPressedKeys);
        this.car3.handleKeys(this.currentlyPressedKeys);
        this.car4.handleKeys(this.currentlyPressedKeys);

        if(this.currentlyPressedKeys[74]){
            // J is pressed = positiv rotasjon y-aksen
            if(this.currentlyPressedKeys[70]){
                this.rotateY += 1;
            }
        }
        if(this.currentlyPressedKeys[75]){
            // K is pressed = negativ rotasjon y-aksen
            if(this.currentlyPressedKeys[71]){
                this.rotateY -= 1;
            }
        }
        if (this.currentlyPressedKeys[70]){
            //F is pressed
            this.translateX +=1;
            this.car2x +=2;
            this.car3x +=2;
            this.car4x +=1;
        }
        if (this.currentlyPressedKeys[71]){
            //G is pressed = roter hjula bakover = positiv rotasjon z-aksen
            this.translateX -= 1;
            this.car2x -= 2;
            this.car3x -= 2;
            this.car4x -=1;
        }
    }

    draw(currentTime) {

        window.requestAnimationFrame(this.draw.bind(this));

        if (currentTime === undefined)
            currentTime = 0; 	//Udefinert fÃ¸rste gang.
        if (currentTime - this.fpsData.forrigeTidsstempel >= 1000) {
            this.fpsData.antallFrames = 0;
            this.fpsData.forrigeTidsstempel = currentTime;
        }

        let elapsed = 0.0;
        if (this.lastTime !== 0.0)
            elapsed = (currentTime - this.lastTime)/1000;
        this.lastTime = currentTime;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.coord.draw(elapsed);

        let modelMatrix2 = new Matrix4();
        modelMatrix2.setIdentity();
        this.stack.pushMatrix(modelMatrix2);
        //console.log("CAR LOG: " + modelMatrix2);

        modelMatrix2.setTranslate(this.translateX, this.translateY, this.translateZ);
        modelMatrix2.rotate(this.rotateY, 0, 1, 0);

        this.car.draw(elapsed, modelMatrix2);

        //onclick
        if(this.showOtherCars){
            modelMatrix2 = this.stack.peekMatrix();
            modelMatrix2.setTranslate(this.car2x, this.car2y, this.car2z);
            this.car2.draw(elapsed, modelMatrix2);

            modelMatrix2 = this.stack.peekMatrix();
            modelMatrix2.setTranslate(this.car3x, this.car3y, this.car3z);
            this.car3.draw(elapsed, modelMatrix2);

            modelMatrix2 = this.stack.peekMatrix();
            modelMatrix2.setTranslate(this.car4x, this.car4y, this.car4z);
            this.car4.draw(elapsed, modelMatrix2);
        }



        this.handleKeys(elapsed);

        this.fpsData.antallFrames++;
    }
}