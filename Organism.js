let gravity = 0.0;
let hit = false;

let sw = 3;

let alphaColor = 255;
let colorComment = [54, 156, 191];
let colorConnect = [61, 234, 209]; // [3,148,144];
let colorLike = [234, 108, 124];
let colorMedia = [40, 20, 170];//[119, 79, 53]; // azul claro 64,112,255
let colorSaved = [115, 54, 123];
let colorSeen = [249, 219, 165];

let colors = [
    [54, 156, 191],
    [61, 234, 209],
    [234, 108, 124],
    [63, 39, 218],
    [115, 54, 123],
    [249, 219, 165]
];

let bitModule = 5;
let gap = 0;
let middle = bitModule * 2, right = bitModule * 4, bottom = bitModule * 4;

class Organism {
    constructor(date, xin, yin, din, idin, dat, oin, type, pos, seq) {
        this.date = date;
        this.pos = pos;
        let x = 100 + (this.pos % column) * bitModule * 5;
        let y = 100 + int(this.pos / column) * bitModule * 5;
        this.x = x;
        this.y = y;
        this.size = seq * bitModule;

        this.ang = random(100);
        this.id = idin;
        this.data = dat;
        this.others = oin;
        this.dir = random(1) < 0.5 ? -0.005 : 0.005;
        this.type = type;
        this.visible = false;
        this.alphaColor = alphaColor;
    }

    clickedGrid() {

        if ((mouseX > this.x) && (mouseX < this.x + bitModule * 5) &&
            (mouseY > this.y) && (mouseY < this.y + bitModule * 5)) {

            $('#organismType').empty();
            $('#organismData').empty();

         

            fill(0);
            $('#organism').css("display", "inline-flex").hide().fadeIn(1000);

            let info = _.pairs(this.data);
            
            $('#organismData').append("<small>" + this.date + "</small>");
            $('#organismData').append("<small>" + info[0][1] + "</small><br>");

            for (let i = 1; i < info.length - 1; i++) {
                $('#organismData').append(info[i][1] + "<br>");
            }
            return true;
        } else {
            $('#organism').hide();
            return false;
        }
    }

    setPos() {
        let x = 100 + (this.pos % column) * (bitModule * 5 + gap);
        let y = 100 + int(this.pos / column) * (bitModule * 5 + gap);
        this.x = x;
        this.y = y;
    }

}

class Separator {
    constructor(date, pos, diff, size, sequences, data) {
        this.date = date;
        this.pos = pos;
        this.posX = 100 + (this.pos % column) * bitModule * 5;
        this.posY = 100 + int(this.pos / column) * bitModule * 5;
        this.gap = diff;
        this.size = size;
        this.sequences = sequences;
        this.data = data;
    }

    displayGrid() {

        noStroke();
        middle = bitModule * 2, right = bitModule * 4, bottom = bitModule * 4;
        //let posX = this.posX - bitModule * 4;
        this.posX = 100 + ((this.pos + 1) % column) * bitModule * 5;
        this.posY = 100 + int((this.pos + 1) / column) * bitModule * 5;

        let posX = this.posX - bitModule * 3;
        let posY = this.posY + bitModule;

        if (posX < 100 && this.posY !== 100) {
            posX = (100 + column * bitModule * 5 + bitModule) - (100 - posX + bitModule);
            posY -= bitModule * 5;
        }

        fill(242);
        rect(posX, posY, bitModule * 3, bitModule * 3);
        fill(42);
        textSize(bitModule * 1.4);
        text(" " + this.date.substr(0, 4), posX + bitModule * 0.25, posY + bitModule * 1.5);
        text(this.date.substr(5), posX + bitModule * 0.25, posY + bitModule * 3);


        fill(212);
        for (let g = 0; g < this.gap; g++) {

            // ADICIONAR VERIFICAÇÃO PARA O CASO DO GAP SER MAIOR QUE A LIHA DA JANELA

            let posX = this.posX - bitModule * 8 - bitModule * 5 * g;
            let posY = this.posY + bitModule * 2.5 - (this.size / 2);

            if (posX < 100) {
                posX = (100 + column * bitModule * 5) - (100 - posX);
                posY -= bitModule * 5;
            }
            rect(posX, posY, bitModule, bitModule);
        }
    }

    clickedGrid() {

        if ((mouseX > 100 + (this.pos % column) * (bitModule * 5)) && (mouseX < 100 + (this.pos % column) * (bitModule * 5) + bitModule * 5) &&
            (mouseY > 100 + int(this.pos / column) * (bitModule * 5)) && (mouseY < 100 + int(this.pos / column) * (bitModule * 5) + bitModule * 5)) {


            $('#organismType').empty();
            $('#organismData').empty();
          
            fill(0);

            $('#organism').css("display", "inline-flex").hide().fadeIn(1000);


            for (let d = 0; d < this.data.length; d++) {

                let info = _.pairs(this.data[d]);
               

                if(d==0)$('#organismType').append("<small>" + this.date + "</small>");
                $('#organismData').append("<br><small>" + info[0][1] + "</small>");

                for (let i = 1; i < info.length - 1; i++) {
                    $('#organismData').append(info[i][1] + "<br>---");
                }
            }


            return true;
        } else {
            $('#organism').hide();
            return false;
        }
    }

    setPos() {
        let x = 100 + (this.pos % column) * (bitModule * 5 + gap);
        let y = 100 + int(this.pos / column) * (bitModule * 5 + gap);
        this.x = x;
        this.y = y;
    }
}

class Comment extends Organism {
    constructor(date, xin, yin, din, idin, dat, oin, type, pos, seq) {
        super(date, xin, yin, din, idin, dat, oin, type, pos, seq);
    }

    displayGrid() {
        this.setPos();

        noStroke();

        fill(...colorComment, this.alphaColor);
        rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

        fill(0, this.alphaColor);
        rect(this.x, this.y + middle, bitModule, bitModule);
        rect(this.x + middle, this.y + middle, bitModule, bitModule);
        rect(this.x + right, this.y + middle, bitModule, bitModule);
    }
}

class Connection extends Organism {
    constructor(date, xin, yin, din, idin, dat, oin, type, pos, seq) {
        super(date, xin, yin, din, idin, dat, oin, type, pos, seq);
    }

    displayGrid() {
        this.setPos();

        noStroke();

        if (this.type === "closeByDay") {
            fill(...colorConnect, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);

        } else if (this.type === "followersByDay") {
            fill(...colorConnect, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x + middle, this.y + bottom, bitModule, bitModule);
        } else if (this.type === "followingByDay") {
            fill(...colorConnect, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x + middle, this.y, bitModule, bitModule);

            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);
            rect(this.x + right, this.y + bottom, bitModule, bitModule);
        } else if (this.type === "hashtagsByDay") {
            fill(...colorConnect, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x + middle, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);
            rect(this.x + middle, this.y + bottom, bitModule, bitModule);
        }
    }
}

class Like extends Organism {
    constructor(date, xin, yin, din, idin, dat, oin, type, pos, seq) {
        super(date, xin, yin, din, idin, dat, oin, type, pos, seq);

    }

    displayGrid() {
        this.setPos();
       
        noStroke();
        if (this.type === "mediaLikesByDay") {
            fill(...colorLike, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x + middle, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);
            rect(this.x + right, this.y + bottom, bitModule, bitModule);
        } else {
            fill(...colorLike, this.alphaColor);

            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);
        }


    }
}

class Media extends Organism {
    constructor(date, xin, yin, din, idin, dat, oin, type, pos, seq) {
        super(date, xin, yin, din, idin, dat, oin, type, pos, seq);
    }

    displayGrid() {
        this.setPos();
      
        noStroke();

        if (this.type === "photosByDay") {
            fill(...colorMedia, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x + middle, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);
            rect(this.x + right, this.y + bottom, bitModule, bitModule);

        } else if (this.type === "moviesByDay") {
            fill(...colorMedia, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);
            rect(this.x + right, this.y + bottom, bitModule, bitModule);

        } else if (this.type === "storiesByDay") {
            fill(...colorMedia, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x + middle, this.y, bitModule, bitModule);

            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x + middle, this.y + bottom, bitModule, bitModule);
        } else {
            fill(...colorMedia, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y, bitModule, bitModule);
            rect(this.x + middle, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x + right, this.y + bottom, bitModule, bitModule);

        }
    }
}

class Saved extends Organism {
    constructor(date, xin, yin, din, idin, dat, oin, type, pos, seq) {
        super(date, xin, yin, din, idin, dat, oin, type, pos, seq);
    }

    displayGrid() {
        this.setPos();
       

        noStroke();

        fill(...colorSaved, this.alphaColor);
        rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

        fill(0, this.alphaColor);
        rect(this.x, this.y, bitModule, bitModule);
        rect(this.x + middle, this.y, bitModule, bitModule);
        rect(this.x + right, this.y, bitModule, bitModule);

        rect(this.x, this.y + middle, bitModule, bitModule);
        rect(this.x + middle, this.y + middle, bitModule, bitModule);
        rect(this.x + right, this.y + middle, bitModule, bitModule);

        rect(this.x, this.y + bottom, bitModule, bitModule);
        rect(this.x + right, this.y + bottom, bitModule, bitModule);


    }
}

class Seen extends Organism {
    constructor(date, xin, yin, din, idin, dat, oin, type, pos, seq) {
        super(date, xin, yin, din, idin, dat, oin, type, pos, seq);
    }

    displayGrid() {
        this.setPos();

        noStroke();


        if (this.type === "adsByDay") {
            fill(...colorSeen, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x + middle, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);

        } else if (this.type === "chainingByDay") {
            fill(...colorSeen, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x + middle, this.y, bitModule, bitModule);

            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x + middle, this.y + bottom, bitModule, bitModule);
        } else if (this.type === "postsByDay") {
            fill(...colorSeen, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x + middle, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);
            rect(this.x + right, this.y + bottom, bitModule, bitModule);
        } else {
            fill(...colorSeen, this.alphaColor);
            rect(this.x + bitModule, this.y + bitModule, bitModule * 3, bitModule * 3);

            fill(0, this.alphaColor);
            rect(this.x, this.y, bitModule, bitModule);
            rect(this.x + right, this.y, bitModule, bitModule);

            rect(this.x, this.y + middle, bitModule, bitModule);
            rect(this.x + middle, this.y + middle, bitModule, bitModule);
            rect(this.x + right, this.y + middle, bitModule, bitModule);

            rect(this.x, this.y + bottom, bitModule, bitModule);
            rect(this.x + right, this.y + bottom, bitModule, bitModule);
        }


    }
}

