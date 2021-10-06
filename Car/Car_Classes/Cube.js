"use strict";

class Cube {
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
            0, 2, 4, 6
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
    }

    handleKeys(currentlyPressedKey){
        // if needed
    }

    draw(elapsed, modelMatrix){
        this.camera.setCamera();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferCube);
        let a_Position = this.gl.getAttribLocation(this.gl.program, "a_Position");
        let stride = (3+4) *4;
        this.gl.vertexAttribPointer(a_Position, this.vertexBufferCube.itemSize, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(a_Position);

        let a_Color = this.gl.getAttribLocation(this.gl.program, "a_Color");
        let colorOffset = 3 * 4;
        let colorVertexSize = 4;
        this.gl.vertexAttribPointer(a_Color, colorVertexSize, this.gl.FLOAT, false, stride, colorOffset);
        this.gl.enableVertexAttribArray(a_Color);

        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);
        let u_modelviewMatrix = this.gl.getUniformLocation(this.gl.program, "u_modelviewMatrix");
        let u_projectionMatrix = this.gl.getUniformLocation(this.gl.program, "u_projectionMatrix");

        this.gl.uniformMatrix4fv(u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(u_projectionMatrix, false, this.camera.projectionMatrix.elements);

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
        }

    }
}