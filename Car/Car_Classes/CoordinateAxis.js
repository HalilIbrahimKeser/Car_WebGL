"use strict";


class CoordinateAxis{

    constructor(gl, camera, xColor, yColor, zColor) {
        this.gl = gl;
        this.camera = camera;

        if (!xColor){
            this.xColor = {red:1.0, green:0.0, blue: 0.0, alpha:1};
        } else {
            this.xColor = xColor;
        }
        if (!yColor){
            this.yColor = {red:0.0, green:0.0, blue: 1.0, alpha:1};
        } else {
            this.yColor = yColor;
        }
        if (!zColor){
            this.zColor = {red:0.0, green:1.0, blue: 0.0, alpha:1};
        } else {
            this.zColor = zColor;
        }

        this.coordPositionBuffer = null;
        this.coordColorBuffer = null;
        this.COORD_BOUNDARY = 1000;

    }

    init(vertexShaderName, fragmentShaderName) {
        let vertexShaderSource = document.getElementById(vertexShaderName).innerHTML;
        let fragmentShaderSource = document.getElementById(fragmentShaderName).innerHTML;
        this.shaderProgram = createProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        if (!this.shaderProgram) {
            console.log('Feil ved initialisering av shaderkoden.');
        } else {
            return this.initBuffers();
        }
    }

    initBuffers(){
        let coordPositions = new Float32Array([
            //x-aksen
            -this.COORD_BOUNDARY, 0.0, 0.0,
            this.COORD_BOUNDARY, 0.0, 0.0,

            //y-aksen:
            0.0, this.COORD_BOUNDARY, 0.0,
            0.0, -this.COORD_BOUNDARY, 0.0,

            //z-aksen:
            0.0, 0.0, this.COORD_BOUNDARY,
            0.0, 0.0, -this.COORD_BOUNDARY
        ]);

        this.coordPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordPositionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, coordPositions, this.gl.STATIC_DRAW);
        this.coordPositionBuffer.numberOfItems = 6;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        let colorArray = [];
        for (let i = 0; i<6; i++){
            if (i<2){
                colorArray.push(this.xColor.red, this.xColor.green, this.xColor.blue, this.xColor.alpha);
            } else if (i<4){
                colorArray.push(this.yColor.red, this.yColor.green, this.yColor.blue, this.yColor.alpha);
            } else{
                colorArray.push(this.zColor.red, this.zColor.green, this.zColor.blue, this.zColor.alpha);
            }
        }
        let coordColors = new Float32Array(colorArray);
        this.coordColorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordColorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, coordColors, this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    draw(elapsed){
        let u_modelviewMatrix = this.gl.getUniformLocation(this.shaderProgram, "u_modelviewMatrix");
        let u_projectionMatrix = this.gl.getUniformLocation(this.shaderProgram, "u_projectionMatrix");
        this.gl.useProgram(this.shaderProgram);

        this.camera.setCamera();

        let modelMatrix = new Matrix4();
        modelMatrix.setIdentity();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordPositionBuffer);
        let a_Position = this.gl.getAttribLocation(this.shaderProgram, "a_Position");
        this.gl.vertexAttribPointer(a_Position, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(a_Position);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.coordColorBuffer);
        let a_Color = this.gl.getAttribLocation(this.shaderProgram, "a_Color");
        this.gl.vertexAttribPointer(a_Color, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(a_Color);

        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);
        this.gl.uniformMatrix4fv(u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(u_projectionMatrix, false, this.camera.projectionMatrix.elements);
        this.gl.drawArrays(this.gl.LINES, 0, this.coordPositionBuffer.numberOfItems);

    }



}