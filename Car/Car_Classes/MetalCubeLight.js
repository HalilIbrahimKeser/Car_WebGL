"use strict";

class MetalCubeLight {
    constructor(gl, camera, color) {
        this.gl = gl;
        this.camera = camera;
        if(!color)
            this.color={red:0.2, green:0.5, blue: 0.5, alpha:1};
        else
            this.color = color;
        this.vertexBufferCube = null;
        this.cubeVertices = null;

        this.lightDirection = [0, 20, 50];
        this.ambientLightColor = [this.color.red, this.color.green, this.color.blue];
        this.diffuseLightColor = [0.5, 0.5, 0.5];

        this.cubeNormalBuffer = null;

        this.wireFrame = false;
    }

    init(vertexShaderName, fragmentShaderName){
        let vertexShaderSource = document.getElementById(vertexShaderName).innerHTML;
        let fragmentShaderSource = document.getElementById(fragmentShaderName).innerHTML;
        this.metalCubeShaderProgram = createProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        if (!this.metalCubeShaderProgram){
            console.log('Feil ved initialisering av metalCubeShaderProgram');
        }
        else{
            console.log("Initializing MetalCube")
            this.initBuffers();
        }
    }


    initBuffers(){

        this.cubeVertices = new Float32Array([
            // Forsiden:
            -1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            -1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            // Høyre side
            1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            // Baksiden:
            1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            -1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            // Venstre siden:
            -1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            -1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            // Toppen:
            -1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            -1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            // Under:
            -1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,

            -1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha
        ]);

        this.vertexBufferCube = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCube);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cubeVertices, this.gl.STATIC_DRAW);
        this.vertexBufferCube.itemSize = 3;
        this.vertexBufferCube.numberOfItems = 36;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        /****TEST AV LYS!!****/
        // NORMALVEKTORER:
        var cubeNormals = new Float32Array([
            //Forsiden:
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,

            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,

            //H�yre side:
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,

            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,

            //Baksiden:
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,

            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,

            //Venstre side:
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,

            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,

            //Topp
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,

            //Bunn:
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,

            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0
        ]);

        this.cubeNormalBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeNormalBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, cubeNormals, this.gl.STATIC_DRAW);
        this.cubeNormalBuffer.itemSize = 3;
        this.cubeNormalBuffer.numberOfItems = 36;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        /****SLUTT AV TEST AV LYS!!****/
    }

    handleKeys(elapsed){
        // if needed
    }

    draw(elapsed, modelMatrix){
        let u_modelviewMatrix = this.gl.getUniformLocation(this.metalCubeShaderProgram, "u_modelviewMatrix");
        let u_projectionMatrix = this.gl.getUniformLocation(this.metalCubeShaderProgram, "u_projectionMatrix");
        this.gl.useProgram(this.metalCubeShaderProgram);
        this.camera.setCamera();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCube);
        let a_Position = this.gl.getAttribLocation(this.metalCubeShaderProgram, "a_Position");
        let stride = (3+4) *4;
        this.gl.vertexAttribPointer(a_Position, this.vertexBufferCube.itemSize, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(a_Position);

        let a_Color = this.gl.getAttribLocation(this.metalCubeShaderProgram, "a_Color");
        let colorOffset = 3 * 4;
        let colorVertexSize = 4;
        this.gl.vertexAttribPointer(a_Color, colorVertexSize, this.gl.FLOAT, false, stride, colorOffset);
        this.gl.enableVertexAttribArray(a_Color);

        /*******TEST AV LYS*******/
        // Normalvektor:
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeNormalBuffer);
        let a_Normal = this.gl.getAttribLocation(this.metalCubeShaderProgram, 'a_Normal');
        if (a_Normal !== -1) {  //-1 dersom a_Normal ikke er i bruk i shaderen.
            this.gl.vertexAttribPointer(a_Normal, this.cubeNormalBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(a_Normal);
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        //Lysvariabler:
        let u_DiffuseLightColor = this.gl.getUniformLocation(this.metalCubeShaderProgram, 'u_diffuseLightColor');
        let u_AmbientLightColor = this.gl.getUniformLocation(this.metalCubeShaderProgram, 'u_ambientLightColor');
        let u_lightDirection = this.gl.getUniformLocation(this.metalCubeShaderProgram, 'u_lightDirection');

        let u_normalMatrix = this.gl.getUniformLocation(this.metalCubeShaderProgram, 'u_normalMatrix');

        this.gl.uniform3fv(u_lightDirection, this.lightDirection);
        this.gl.uniform3fv(u_AmbientLightColor, this.ambientLightColor);
        this.gl.uniform3fv(u_DiffuseLightColor, this.diffuseLightColor);

        /****SLUTT AV TEST AV LYS!!****/


        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);

        this.gl.uniformMatrix4fv(u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(u_projectionMatrix, false, this.camera.projectionMatrix.elements);

        /*******TEST AV LYS*******/
        //Beregner og sender inn matrisa som brukes til å transformere normalvektorene:
         let normalMatrix = mat3.create();
         mat3.normalFromMat4(normalMatrix, modelMatrix.elements);  //NB!!! mat3.normalFromMat4! SE: gl-matrix.js
         this.gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);
        /****SLUTT AV TEST AV LYS!!****/

        if (this.wireFrame) {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.vertexBufferCube.numberOfItems);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexBufferCube.numberOfItems);
        }
    }
}