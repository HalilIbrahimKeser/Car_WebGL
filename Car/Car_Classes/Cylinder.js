"use strict";

class Cylinder{
    constructor(gl, camera, color) {
        if (!color){
            this.color = {red:0.9, green:0.2, blue:0.3, alpha:1};
        } else{
            this.color = color;
        }
        this.gl = gl;
        this.camera = camera;

        this.vertices = null;
        this.circleFloat32Vertices = null;
        this.vertexBuffer = null;
        this.noVertsCircle = 0;
        this.circleVertices = [];
        this.torsoIndexes= [];
        this.circleIndexes1 = [];
        this.circleIndexes2 = [];
        this.floatCircleIndexes1 = null;
        this.floatCircleIndexes2 = null;
        this.floatTorsoIndexes = null;
        this.circleIndexBuffer1 = null;
        this.circleIndexBuffer2 = null;
        this.torsoIndexBuffer = null;
    }

    init(vertexShaderName, fragmentShaderName){
        let vertexShaderSource = document.getElementById(vertexShaderName).innerHTML;
        let fragmentShaderSource = document.getElementById(fragmentShaderName).innerHTML;
        this.cylinderShaderProgram = createProgram(this.gl, vertexShaderSource, fragmentShaderSource);
        if (!this.cylinderShaderProgram){
            console.log('Feil ved initialisering av metalCubeShaderProgram');
        }
        else{
            console.log("Initializing cube")
            this.initBuffers();
        }
    }

    getCircleVertices(yPos){
        let toPI = 2*Math.PI;
        //let circleVertices = [];	//Tegnes vha. TRIANGLE_FAN
        let stepGrader = 10;
        let step = (Math.PI / 180) * stepGrader;

        // Senterpunkt:
        let x=0, y=yPos, z=0;
        this.circleVertices = this.circleVertices.concat(x,y,z, this.color.red,this.color.green,this.color.blue,this.color.alpha); //NB! bruk av concat!!
        this.noVertsCircle++;
        for (let phi = 0.0; phi <= toPI; phi += step)
        {
            x = Math.cos(phi);
            y = yPos;
            z = Math.sin(phi);
            this.circleVertices = this.circleVertices.concat(x,y,z, this.color.red,this.color.green,this.color.blue,this.color.alpha);
            this.noVertsCircle++;
        }
    }


    getTorsoIndexes(){
        let halfIndexes = this.noVertsCircle/2;
        for (let i = 1, j = halfIndexes + 1; i < halfIndexes && j< this.noVertsCircle; i++, j++){
            this.torsoIndexes.push(i);
            this.torsoIndexes.push(j);
        }
    }
    getCircleIndexes (){
        let halfIndexes = this.noVertsCircle/2;
        for(let i = 0, j = halfIndexes; i < halfIndexes && j< this.noVertsCircle; i++, j++){
            this.circleIndexes1.push(i);
            this.circleIndexes2.push(j);
        }
    }

    initBuffers(){
        this.getCircleVertices(3);
        this.getCircleVertices(-3);
        this.getTorsoIndexes();
        this.getCircleIndexes();

        console.log(this.circleVertices);
        console.log(this.torsoIndexes);
        console.log(this.circleIndexes1);
        console.log(this.circleIndexes2);

        this.circleFloat32Vertices = new Float32Array(this.circleVertices);
        this.floatCircleIndexes1 = new Uint16Array(this.circleIndexes1);
        this.floatCircleIndexes2 = new Uint16Array(this.circleIndexes2);
        this.floatTorsoIndexes = new Uint16Array(this.torsoIndexes);


        this.vertexBuffer= this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.circleFloat32Vertices, this.gl.STATIC_DRAW);
        this.vertexBuffer.itemSize=3;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.circleIndexBuffer1 = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.circleIndexBuffer1);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.floatCircleIndexes1, this.gl.STATIC_DRAW);

        this.circleIndexBuffer2 = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.circleIndexBuffer2);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.floatCircleIndexes2, this.gl.STATIC_DRAW);

        this.torsoIndexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.torsoIndexBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.floatTorsoIndexes, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }

    draw(modelMatrix){
        let u_modelviewMatrix = this.gl.getUniformLocation(this.cylinderShaderProgram, "u_modelviewMatrix");
        let u_projectionMatrix = this.gl.getUniformLocation(this.cylinderShaderProgram, "u_projectionMatrix");
        this.gl.useProgram(this.cylinderShaderProgram);

        this.camera.setCamera();


        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        let a_Position = this.gl.getAttribLocation(this.cylinderShaderProgram, "a_Position");
        let stride = (3+4) *4;
        this.gl.vertexAttribPointer(a_Position, this.vertexBuffer.itemSize, this.gl.FLOAT, false, stride, 0);
        this.gl.enableVertexAttribArray(a_Position);

        let a_Color = this.gl.getAttribLocation(this.cylinderShaderProgram, "a_Color");
        let colorOffset = 3 * 4;
        let colorVertexSize = 4;
        this.gl.vertexAttribPointer(a_Color, colorVertexSize, this.gl.FLOAT, false, stride, colorOffset);
        this.gl.enableVertexAttribArray(a_Color);

        let modelviewMatrix = this.camera.getModelViewMatrix(modelMatrix);


        this.gl.uniformMatrix4fv(u_modelviewMatrix, false, modelviewMatrix.elements);
        this.gl.uniformMatrix4fv(u_projectionMatrix, false, this.camera.projectionMatrix.elements);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.circleIndexBuffer1);
        this.gl.drawElements(this.gl.TRIANGLE_FAN, this.floatCircleIndexes1.length, this.gl.UNSIGNED_SHORT, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.circleIndexBuffer2);
        this.gl.drawElements(this.gl.TRIANGLE_FAN, this.floatCircleIndexes2.length, this.gl.UNSIGNED_SHORT, 0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.torsoIndexBuffer);
        this.gl.drawElements(this.gl.TRIANGLE_STRIP, this.floatTorsoIndexes.length, this.gl.UNSIGNED_SHORT, 0);
    }


}