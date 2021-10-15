"use strict";

class CubeTransparent {
    constructor(gl, camera, color) {
        this.gl = gl;
        this.camera = camera;
        if(!color)
            this.color={red:0.2, green:0.5, blue: 0.5, alpha:1};
        else
            this.color = color;
        this.vertexBufferCube = null;
        this.wireFrame = false;
        this.triangleStripIndices = null;
        this.triangleStripIndices2 = null;
        this.triangleStripIndices3 = null;
        this.indexBuffer = null;
        this.indexBuffer2 = null;
        this.indexBuffer3 = null;
        this.cubeVertices = null;

        this.lightDirection = [0, -10, 0];
        //let lightDirection = [1.0, 0.0, 0.0];
        this.ambientLightColor = [1.0, 1.0, 1.0];
        this.diffuseLightColor = [1.0, 1.0, 1.0];

        this.cubeNormalBuffer = null;

    }

    init(vertexShaderName, fragmentShaderName){
        let vertexShaderSource = document.getElementById(vertexShaderName).innerHTML;
        let fragmentShaderSource = document.getElementById(fragmentShaderName).innerHTML;
        this.cubeShaderProgram = createProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        if (!this.cubeShaderProgram){
            console.log('Feil ved initialisering av metalCubeShaderProgram');
        }
        else{
            console.log("Initializing CubeTransparent")
            this.initBuffers();
        }
    }

    initBuffers(){
        this.cubeVertices = new Float32Array([
            -1, 1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, -1, 1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, 1,  this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, 1,  this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, 1, -1,  this.color.red, this.color.green, this.color.blue, this.color.alpha,
            1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, 1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha,
            -1, -1, -1, this.color.red, this.color.green, this.color.blue, this.color.alpha
        ]);

        this.triangleStripIndices = new Uint16Array([
            0, 1, 2,
            3, 4, 5,
            6, 7, 0,
            1

        ]);

        this.triangleStripIndices2 = new Uint16Array([
            0, 2, 6, 4
        ]);

        this.triangleStripIndices3 = new Uint16Array([
            7, 1, 3, 5
        ]);

        this.vertexBufferCube = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCube);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.cubeVertices, this.gl.STATIC_DRAW);
        this.vertexBufferCube.itemSize = 3;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.triangleStripIndices, this.gl.STATIC_DRAW);


        this.indexBuffer2 = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer2);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.triangleStripIndices2, this.gl.STATIC_DRAW);


        this.indexBuffer3 = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer3);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.triangleStripIndices3, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

        /****TEST AV LYS!!****/
        // NORMALVEKTORER:
        /*var cubeNormals = new Float32Array([
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
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);*/
        /****SLUTT AV TEST AV LYS!!****/
    }

    handleKeys(elapsed){
        // if needed
    }

    draw(elapsed, modelMatrix){
        let u_modelviewMatrix = this.gl.getUniformLocation(this.cubeShaderProgram, "u_modelviewMatrix");
        let u_projectionMatrix = this.gl.getUniformLocation(this.cubeShaderProgram, "u_projectionMatrix");
        this.gl.useProgram(this.cubeShaderProgram);
        this.camera.setCamera();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCube);
        let a_Position = this.gl.getAttribLocation(this.cubeShaderProgram, "a_Position");
        let stride = (3+4) *4;
        this.gl.vertexAttribPointer(a_Position, this.vertexBufferCube.itemSize, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(a_Position);

        let a_Color = this.gl.getAttribLocation(this.cubeShaderProgram, "a_Color");
        let colorOffset = 3 * 4;
        let colorVertexSize = 4;
        this.gl.vertexAttribPointer(a_Color, colorVertexSize, this.gl.FLOAT, false, stride, colorOffset);
        this.gl.enableVertexAttribArray(a_Color);

        /*******TEST AV LYS*******/
        // Normalvektor:
        /*this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.cubeNormalBuffer);
        let a_Normal = this.gl.getAttribLocation(this.gl.cubeShaderProgram, 'a_Normal');
        if (a_Normal !== -1) {  //-1 dersom a_Normal ikke er i bruk i shaderen.
            this.gl.vertexAttribPointer(a_Normal, this.cubeNormalBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(a_Normal);
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        //Lysvariabler:
        let u_DiffuseLightColor = this.gl.getUniformLocation(this.gl.cubeShaderProgram, 'u_diffuseLightColor');
        let u_AmbientLightColor = this.gl.getUniformLocation(this.gl.cubeShaderProgram, 'u_ambientLightColor');
        let u_lightDirection = this.gl.getUniformLocation(this.gl.cubeShaderProgram, 'u_lightDirection');

        let u_normalMatrix = this.gl.getUniformLocation(this.gl.cubeShaderProgram, 'u_normalMatrix');

        this.gl.uniform3fv(u_lightDirection, this.lightDirection);
        this.gl.uniform3fv(u_AmbientLightColor, this.ambientLightColor);
        this.gl.uniform3fv(u_DiffuseLightColor, this.diffuseLightColor);*/
        /****SLUTT AV TEST AV LYS!!****/


        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);


        this.gl.uniformMatrix4fv(u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(u_projectionMatrix, false, this.camera.projectionMatrix.elements);

        /*******TEST AV LYS*******/
        //Beregner og sender inn matrisa som brukes til å transformere normalvektorene:
        /*let normalMatrix = mat3.create();
        mat3.normalFromMat4(normalMatrix, modelMatrix.elements);  //NB!!! mat3.normalFromMat4! SE: gl-matrix.js
        this.gl.uniformMatrix3fv(u_normalMatrix, false, normalMatrix);*/
        /****SLUTT AV TEST AV LYS!!****/

        if (this.wireFrame){
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            this.gl.drawElements(this.gl.LINE_LOOP, this.triangleStripIndices.length, this.gl.UNSIGNED_SHORT, 0);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer2);
            this.gl.drawElements(this.gl.LINE_LOOP, this.triangleStripIndices2.length, this.gl.UNSIGNED_SHORT, 0);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer3);
            this.gl.drawElements(this.gl.LINE_LOOP, this.triangleStripIndices3.length, this.gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            this.gl.drawElements(this.gl.TRIANGLE_STRIP, this.triangleStripIndices.length, this.gl.UNSIGNED_SHORT, 0);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer2);
            this.gl.drawElements(this.gl.TRIANGLE_STRIP, this.triangleStripIndices2.length, this.gl.UNSIGNED_SHORT, 0);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer3);
            this.gl.drawElements(this.gl.TRIANGLE_STRIP, this.triangleStripIndices3.length, this.gl.UNSIGNED_SHORT, 0);

            //this.gl.clear(this.gl.COLOR_BUFFER_BIT); //
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LESS) //
            //this.gl.depthMask(false);
            this.gl.enable(this.gl.BLEND);
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
            this.gl.depthFunc(this.gl.DEPTH_TEST)
        }

    }
}