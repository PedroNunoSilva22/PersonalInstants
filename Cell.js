class Cell {


    constructor(rad) {
        this.cx = width / 2;
        this.cy = height / 2;
        this.radius = rad;
        this.offset = 50;
        this.cellPoints = [];
    }

    display() {
        push();
        stroke(115,54,123);
        fill(55, 50, 145);
        strokeWeight(5);

        beginShape();

        this.cellPoints = [];


        for (let a = 0; a < TWO_PI; a += 0.05) {
            let xoff = map(cos(a), -1, 1, 0, 2);
            let yoff = map(sin(a), -1, 1, 0, 2);
            let r = map(noise(xoff, yoff, zoff), 0, 1, this.radius, this.radius + this.offset);
            let x = width / 2 + r * cos(a);
            let y = height / 2 + r * sin(a);
            curveVertex(x,y);
            this.cellPoints.push(createVector(x, y));
        }
        endShape(CLOSE);
        pop();
        zoff += 0.0005;

    }

    growth(){
        this.radius+=10;
    }

    getPoints(){
        return this.cellPoints;
    }

}

class Core extends Cell{
    constructor(rad){
        super();
        this.radius = rad;
    }

    display() {
        push();
        stroke(226, 123, 156);
        fill(252, 232, 190);
        strokeWeight(5);

        beginShape();

        this.cellPoints = [];


        for (let a = 0; a < TWO_PI; a += 0.05) {
            let xoff = map(cos(a), -1, 1, 0, 2);
            let yoff = map(sin(a), -1, 1, 0, 2);
            let r = map(noise(xoff, yoff, zoff), 0, 1, this.radius, this.radius + this.offset);
            let x = width / 2 + r * cos(a);
            let y = height / 2 + r * sin(a);
            curveVertex(x,y);
            this.cellPoints.push(createVector(x, y));
        }
        endShape(CLOSE);
        pop();
        zoff += 0.0005;

    }
}
