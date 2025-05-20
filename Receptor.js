let segLength = 20;

class Receptor {

    constructor(posX, posY, size) {

        this.x = posX;
        this.y = posY;
        this.size = size;

        this.targetX=0;
        this.targetY=0;
        this.angle =[];

        this.xx = [];
        this.yy = [];

        for (let i = 0; i < size; i++) {
            this.xx[i] = 0;
            this.yy[i] = 0;
            this.angle[i] = 0;
        }
        this.initX = this.x + random(50);
        this.initY = this.y;

        this.xx[this.xx.length - 1] = this.x; // Set base x-coordinate
        this.yy[this.xx.length - 1] = this.y; // Set base y-coordinate

        this.ang = random(3);
        this.dir = random(1) < 0.5 ? -1: 1;

    }


    display() {


        this.x = this.initX + (this.dir*50) * cos(this.ang);
        this.y = (this.initY - segLength * this.size + 25) + 10 * sin(2 * this.ang);


        this.reachSegment(0, this.x, this.y);


        for (let i = 1; i < this.size; i++) this.reachSegment(i, this.targetX, this.targetY);

        for (let j = this.xx.length - 1; j >= 1; j--) this.positionSegment(j, j - 1);

        for (let k = 0; k < this.xx.length; k++) this.segment(this.xx[k], this.yy[k], this.angle[k], (k + 1) * 2);


        this.ang -= 0.05;
        //console.log(ang)
    }

    positionSegment(a, b) {
        this.xx[b] = this.xx[a] + cos(this.angle[a]) * segLength;
        this.yy[b] = this.yy[a] + sin(this.angle[a]) * segLength;
    }

    reachSegment(i, xin, yin) {

        const dx = xin - this.xx[i];
        const dy = yin - this.yy[i];

        this.angle[i] = atan2(dy, dx);

        this.targetX = xin - cos(this.angle[i]) * segLength;
        this.targetY = yin - sin(this.angle[i]) * segLength;
    }

    segment(x, y, a, sw) {
        strokeWeight(sw);
        //stroke(255, 100, 70);
        //stroke(255, 182, 193);
        //stroke(0,92,67);

        //stroke(252, 232, 190);
        //stroke(255,99,71);
        stroke(240,150,20);
        push();
        translate(x, y);
        rotate(a);
        line(0, 0, segLength, 0);
        pop();
    }
}