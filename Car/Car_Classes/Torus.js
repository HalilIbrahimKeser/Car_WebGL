"use strict";

class Torus {
    constructor(gl, camera, color, wireFrame) {
        if (!color){
            this.color = {red:0.2, green:0.2, blue:0.2, alpha:1};
        } else {
            this.color = color;
        }

        this.gl = gl;
        this.camera = camera;
        this.slices = 8;
        this.loops = 50;
        this.inner_rad = 0.5;
        this.outer_rad = 2;
        this.vertices =[];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        this.vertexBuffer = null;
        this.indexBuffer = null;
        this.verticesFloat = null;
        this.indexFloat = null;

        this.wireFrame = wireFrame;
    }


    initBuffers(){
        for (let slice = 0; slice <= this.slices; ++slice) {
            const v = slice / this.slices;
            const slice_angle = v * 2 * Math.PI;
            const cos_slices = Math.cos(slice_angle)/2;
            const sin_slices = Math.sin(slice_angle)*1.15;
            const slice_rad = this.outer_rad + this.inner_rad * cos_slices;

            for (let loop = 0; loop <= this.loops; ++loop) {
                //   x=(R+rÂ·cos(v))cos(w)
                //   y=(R+rÂ·cos(v))sin(w)
                //             z=r.sin(v)
                const u = loop / this.loops;
                const loop_angle = u * 2 * Math.PI;
                const cos_loops = Math.cos(loop_angle);
                const sin_loops = Math.sin(loop_angle);

                const x = slice_rad * cos_loops;
                const y = slice_rad * sin_loops;
                const z = this.inner_rad * sin_slices;

                this.vertices.push(x, y, z, this.color.red, this.color.green, this.color.blue, this.color.alpha);
                this.normals.push(
                    cos_loops * sin_slices,
                    sin_loops * sin_slices,
                    cos_slices);

                this.texCoords.push(u);
                this.texCoords.push(v);
            }
        }
        const vertsPerSlice = this.loops + 1;
        for (let i = 0; i < this.slices; ++i) {
            let v1 = i * vertsPerSlice;
            let v2 = v1 + vertsPerSlice;

            for (let j = 0; j < this.loops; ++j) {

                this.indices.push(v1);
                this.indices.push(v1 + 1);
                this.indices.push(v2);

                this.indices.push(v2);
                this.indices.push(v1 + 1);
                this.indices.push(v2 + 1);

                v1 += 1;
                v2 += 1;
            }
        }

        this.verticesFloat = new Float32Array(this.vertices);
        this.indexFloat = new Uint16Array(this.indices);

        this.vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.verticesFloat, this.gl.STATIC_DRAW);
        this.vertexBuffer.itemSize = 3;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.indexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indexFloat, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }


    draw(modelMatrix){
        this.camera.setCamera();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        let a_Position = this.gl.getAttribLocation(this.gl.program, "a_Position");
        let stride = (3+4) *4;
        this.gl.vertexAttribPointer(a_Position, this.vertexBuffer.itemSize, this.gl.FLOAT, false, stride, 0);
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

        if (this.wireFrame === false){
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            this.gl.drawElements(this.gl.TRIANGLE_STRIP, this.indexFloat.length, this.gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            this.gl.drawElements(this.gl.LINE_STRIP, this.indexFloat.length, this.gl.UNSIGNED_SHORT, 0);
        }


    }


}