/*
GRUPPE OPPGAVE AV:
    Nancy Agapito Lacsamana, Halil Ibrahim Keser, Asbjørn Bjørge
 */


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

        this.lastTime = 0.0;

        this.fpsData = new Object();

        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;

        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;

        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;
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
        /*let cubeVertexShaderSource = document.getElementById('cube-vertex-shader').innerHTML;
        let cubeFragmentShaderSource = document.getElementById('cube-fragment-shader').innerHTML;
        this.gl.cubeShaderProgram = createProgram(this.gl, cubeVertexShaderSource, cubeFragmentShaderSource);
        if (!this.gl.cubeShaderProgram) {
            console.log('Feil ved initialisering av shaderkoden. Sjekk shaderkoden.');
            return;
        }*/
        /*****TEST AV LYS PÅ CUBE*****/

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LESS);

        this.camera = new Camera(this.canvas, this.currentlyPressedKeys);
        this.camera.setCamera();

        this.coord = new CoordinateAxis(this.gl, this.camera, 0, 0, 0);
        this.coord.init('my-vertex-shader', 'my-fragment-shader');

        this.car = new Car(this.gl, this.camera);
        this.car.initBuffers();

        this.gl.clearColor(0.4, 0.4, 0.4, 1.0); //RGBA

        this.fpsData.antallFrames = 0;
        this.fpsData.forrigeTidsstempel = 0;

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

        if(this.currentlyPressedKeys[74]){
            // J is pressed = positiv rotasjon y-aksen til bikeFront
            if(this.currentlyPressedKeys[70]){
                this.rotateY += 1;
            }
        }
        if(this.currentlyPressedKeys[75]){
            if(this.currentlyPressedKeys[71]){
                this.rotateY -= 1;
            }
        }
        if (this.currentlyPressedKeys[70]){
            //F is pressed
            /*if (this.currentlyPressedKeys[74]){
                this.translateZ -=1;
                this.translateX -=1;
            } else {
                this.translateX += 1;
            }*/
            this.translateX +=1;
        }
        if (this.currentlyPressedKeys[71]){
            //G is pressed = roter hjula bakover = positiv rotasjon z-aksen
            this.translateX -= 1;
            /*if(this.currentlyPressedKeys[75]){
                this.translateZ += 1;
            }*/
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
        //console.log("CAR LOG: " + modelMatrix2);

        modelMatrix2.setTranslate(this.translateX, this.translateY, this.translateZ);
        //modelMatrix2.rotate(this.rotateX, 1, 0, 0);
        modelMatrix2.rotate(this.rotateY, 0, 1, 0);
        //modelMatrix2.rotate(this.rotateZ, 0, 0, 1);
        //modelMatrix2.scale(this.scaleX, this.scaleY, this.scaleZ);

        this.car.draw(elapsed, modelMatrix2);

        this.handleKeys(elapsed);

        this.fpsData.antallFrames++;
    }
}