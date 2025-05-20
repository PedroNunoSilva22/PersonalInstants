let canvas;
let w;
let h;
let myFont;
let index = 0;


let organisms = [];

let mode = "grid";

let pos = 0;
let gridShift = 0;
let column = 0;

let info = false;

let radio; // substituir por checkboxes
let val;

let likesPointsX = [];
let likesPointsY = [];

let connectionsPointsX = [];
let connectionsPointsY = [];

let seenPointsX = [];
let seenPointsY = [];

let savedPointsX = [];
let savedPointsY = [];

let loads = false;
let dataSetup = false;
let stats = {};
let statsDay = {};

let type = "All";

let start = "";
let ends = "";

let avgHourActivityPercentage = 0;

let cls = [];
let points = [];
let sortedPoints;

let seenX;
let seenY;

let commentsX;
let commentsY;

let connectionsX;
let connectionsY;

let savedX;
let savedY;

let mediaX;
let mediaY;

let likesX;
let likesY;

function setup() {

    w = windowWidth;
    h = w;

    if (loads) {
        if (!dataSetup) setupData();

        console.log("defaulting");

        column = ceil((windowWidth - 200) / (bitModule * 5));

        organisms = [];
        index = 0;
        pos = 0;
        today = "";
        last = "";
        gridShift = 0;
        maxSequence = 1;
        seqs = [];
        times = 0;
        points = [];
        cls = [];

        stats = {
            "comments":
                {comments: 0, dawn: 0, morning: 0, afternoon: 0, night: 0, total: 0},
            "connections":
                {
                    close: 0,
                    followers: 0,
                    following: 0,
                    hashtags: 0,
                    dawn: 0,
                    morning: 0,
                    afternoon: 0,
                    night: 0,
                    total: 0
                },
            "likes":
                {mediaLikes: 0, commentLikes: 0, dawn: 0, morning: 0, afternoon: 0, night: 0, total: 0},
            "media":
                {photos: 0, movies: 0, stories: 0, direct: 0, dawn: 0, morning: 0, afternoon: 0, night: 0, total: 0},
            "saved":
                {saved: 0, dawn: 0, morning: 0, afternoon: 0, night: 0, total: 0},
            "seen":
                {ads: 0, chaining: 0, posts: 0, videos: 0, dawn: 0, morning: 0, afternoon: 0, night: 0, total: 0},
            "total":
                0,
            "dayTime":
                {dawn: 0, morning: 0, afternoon: 0, night: 0}
        };



        if (mode == "grid") for (let d = 0; d < days.length; activityByDay(d++, start, ends)) ;
        //console.log(new Date(times / stats.total));

        /*  PERCENTAGEM DO DIA PASSADO

        let avgHourActivity = new Date(new Date(times / stats.total));
        avgHourActivityPercentage = (avgHourActivity.getHours() * 3600 + avgHourActivity.getMinutes() * 60 + avgHourActivity.getSeconds() + avgHourActivity.getMilliseconds() / 1000) / 86400;
        console.log(avgHourActivityPercentage);
        */

        clear();
        if (mode == "grid") canvas = createCanvas(windowWidth, 100 + organisms[organisms.length - 1].y + bitModule * 5);
        else canvas = createCanvas(windowWidth, windowWidth);

        canvas.position(0, 90);
        textFont(myFont);
        textAlign(CENTER);
        fill(23, 13, 123);
    }
    if (mode == "grid") noLoop(); else loop();


}

function ff() {
    saveCanvas('myCanvas', 'png');
    //save();
}

function windowResized() {
    if (mode == "grid") {
        console.log("resizing");
        column = ceil((windowWidth - 200) / (bitModule * 5));
        console.log(windowWidth);

        if (loads) {
            organisms[organisms.length - 1].setPos();
            let hh = organisms[organisms.length - 1].y;
            resizeCanvas(windowWidth, 100 + hh + bitModule * 5);
        }
    }
}

let finalColorR, finalColorG, finalColorB;
let switchInterval = 1;
let timeOfLastSwitch = 0;

function draw() {
    if (loads) {
        $('body').delay(5000).css('background-color', 'rgb(242,242,242)');

        if (mode == "grid") {
            background(242);

            render();

            let daysDisplayed = organisms.filter(o => o.constructor.name == "Separator");
            $("#currentDays").text(daysDisplayed.length + " of " + days.length + " days");

            $("#statsComments").text(stats.comments.total + " Comments");
            $("#statsConnections").text(stats.connections.total + " Connections");
            $("#statsLikes").text(stats.likes.total + " Likes");
            $("#statsMedia").text(stats.media.total + " Posts");
            $("#statsSaved").text(stats.saved.total + " Saved");
            $("#statsSeen").text(stats.seen.total + " Seen");
        } else {


            if (millis() - timeOfLastSwitch > switchInterval && loads) {

                finalColorR = (stats.comments.total * colorComment[0] + stats.connections.total * colorConnect[0] + stats.likes.total * colorLike[0] + stats.media.total * colorMedia[0] + stats.saved.total * colorSaved[0] + stats.seen.total * colorSeen[0]) / (stats.total);
                finalColorG = (stats.comments.total * colorComment[1] + stats.connections.total * colorConnect[1] + stats.likes.total * colorLike[1] + stats.media.total * colorMedia[1] + stats.saved.total * colorSaved[1] + stats.seen.total * colorSeen[1]) / (stats.total);
                finalColorB = (stats.comments.total * colorComment[2] + stats.connections.total * colorConnect[2] + stats.likes.total * colorLike[2] + stats.media.total * colorMedia[2] + stats.saved.total * colorSaved[2] + stats.seen.total * colorSeen[2]) / (stats.total);

                if (index < days.length) {
                    background(242);
                    activityByDay(index, start, ends);

                    drawit();

                    let daysDisplayed = organisms.filter(o => o.constructor.name == "Separator");
                    $("#currentDays").text(daysDisplayed.length + " of " + days.length + " days");

                    $("#statsComments").text(stats.comments.total + " Comments");
                    $("#statsConnections").text(stats.connections.total + " Connections");
                    $("#statsLikes").text(stats.likes.total + " Likes");
                    $("#statsMedia").text(stats.media.total + " Posts");
                    $("#statsSaved").text(stats.saved.total + " Saved");
                    $("#statsSeen").text(stats.seen.total + " Seen");

                    timeOfLastSwitch = millis();
                } else {
                    console.log("TERMINOU");
                    noLoop();
                }
            }
        }
    }

}

function drawit() {
    mode = "persona";

    points = [];
    cls = [];
    if (existingFiles.includes("seen")) {

        let parTotal = map(stats.seen.total, 1, stats.total, 100, w / 2 - 100);
        points.push([createVector(
            seenX = w / 2 + parTotal * cos(4 * TWO_PI / 6),
            seenY = h / 2 + parTotal * sin(4 * TWO_PI / 6)),
            //map(stats.seen.total, 1, stats.total, 20, 400),
            Math.sqrt((stats.seen.total / PI)) * 5,
            "seen"]);

        cls.push(color(colorSeen));
    }
    if (existingFiles.includes("comments")) {

        let parTotal = map(stats.comments.total, 1, stats.total, 100, w / 2 - 100);
        points.push([createVector(
            commentsX = w / 2 + parTotal * cos(5 * TWO_PI / 6),
            commentsY = h / 2 + parTotal * sin(5 * TWO_PI / 6)),
            //map(stats.comments.total, 1, stats.total, 20, 400),
            Math.sqrt((stats.comments.total / PI)) * 5,
            "comments"]);

        cls.push(color(colorComment));
    }
    if (existingFiles.includes("connections")) {

        let parTotal = map(stats.connections.total, 1, stats.total, 100, w / 2 - 100);
        points.push([createVector(
            connectionsX = w / 2 + parTotal,
            connectionsY = h / 2),
            //map(stats.connections.total, 1, stats.total, 20, 400),
            Math.sqrt((stats.connections.total / PI)) * 5,
            "connections"]);

        cls.push(color(colorConnect));
    }
    if (existingFiles.includes("saved")) {

        let parTotal = map(stats.saved.total, 1, stats.total, 100, w / 2 - 100);
        points.push([createVector(
            savedX = w / 2 + parTotal * cos(TWO_PI / 6),
            savedY = h / 2 + parTotal * sin(TWO_PI / 6)),
            //map(stats.saved.total, 1, stats.total, 20, 400),
            Math.sqrt((stats.saved.total / PI)) * 5,
            "saved"]);

        cls.push(color(colorSaved));
    }
    if (existingFiles.includes("media")) {

        let parTotal = map(stats.media.total, 1, stats.total, 100, w / 2 - 100);
        points.push([createVector(
            mediaX = w / 2 + parTotal * cos(2 * TWO_PI / 6),
            mediaY = h / 2 + parTotal * sin(2 * TWO_PI / 6)),
            //map(stats.media.total, 1, stats.total, 20, 400),
            Math.sqrt((stats.media.total / PI)) * 5,
            "media"]);

        cls.push(color(colorMedia));
    }
    if (existingFiles.includes("likes")) {

        let parTotal = map(stats.likes.total, 1, stats.total, 100, w / 2 - 100);
        points.push([createVector(
            likesX = w / 2 - parTotal,
            likesY = h / 2),
            //map(stats.likes.total, 1, stats.total, 20, 400),
            Math.sqrt((stats.likes.total / PI)) * 5,
            "likes"]);

        cls.push(color(colorLike));
    }

    sortedPoints = [...points];
    sortedPoints = sortedPoints.sort(function (a, b) {
        return b[1] - a[1];
    });


    drawCatmullRomSpline();
}


function render() {
    mode = "grid";

    console.log("rendering");


    let visible = $(".checks").not('.hide');
    visibleOrganismTypes = [];

    for (let e = 0; e < visible.length; e++) {
        visibleOrganismTypes.push(visible[e].id);
    }
    //visibleOrganismTypes.push("Separator");
    console.log(visibleOrganismTypes);

    for (let o = 0; o < organisms.length; o++) {

        if (visibleOrganismTypes.includes(organisms[o].constructor.name)) {
            organisms[o].visible = true;
            organisms[o].alphaColor = 255;
        } else {
            organisms[o].visible = false;
            organisms[o].alphaColor = 25;
        }
        organisms[o].displayGrid();
    }
}

function mousePressed() {

    if (loads && mode == "grid" && !info) {
        for (let o = 0; o < organisms.length; o++) {
            if (organisms[o].visible || organisms[o].constructor.name == "Separator") {
                if (organisms[o].clickedGrid()) {
                    console.log(organisms[o])
                    $('#organismType').prepend(organisms[o].constructor.name + "<br><br>");
                    break;
                }
            }
        }
    }
}

function keyPressed() {
    if (keyCode === 83) { // s
        //save();
    }

    if (keyCode === UP_ARROW) {
        background(242);
        activityByDay(index, start, ends);

        drawit();
        index++;

    } else if (keyCode === DOWN_ARROW) {
        background(242);
        activityByDay(index, start, ends);

        drawit();
        index--;
    }
}

let aggregateByDay = [];
let today = "";
let last = "";
let seqs = [];

let maxSequence = 1;
let times = 0;

let idx = 1;

function activityByDay(i, sd, ed) {

    aggregateByDay = [];
    last = today;
    today = days[i];
    let daySeqs = [];

    let sequence = 1;

    let lastOrganismType = "Separator";

    if (sd == "") sd = days[0];
    if (ed == "") ed = days[days.length - 1];

    if (days[i] >= sd && days[i] <= ed) {

        daySeqs.push(days[i]);
        let time = days[i] + " ";

        packageByDay.forEach(function (val) {

            if (_.propertyOf(val[1])(days[i]) !== undefined) {
                let daily = _.propertyOf(val[1])(days[i]);
                for (let d = 0; d < daily.length; d++) {
                    daily[d].type = val[0];
                    aggregateByDay.push(daily[d]);
                }
            }
        });

        aggregateByDay = aggregateByDay.flat();
        aggregateByDay = _.sortBy(aggregateByDay, 'timer');

        console.log(aggregateByDay);


        const todayDate = new Date(today);
        const lastDate = new Date(last);
        const diffTime = Math.abs(todayDate - lastDate);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let lastSeparator = addDaySector(diffDays, null, aggregateByDay); // index + 4;

        if (!isNaN(diffDays)) gridShift += diffDays;

        let timeOfDay = "";

        aggregateByDay.forEach((data, index, array) => {
            //if (lastOrganismType !== "Separator") {
            time += data.timer;

            time = new Date(time);
            let dayElapsed = (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds() + time.getMilliseconds() / 1000) / 86400;
            //console.log(index + " " + dayElapsed + " " + data.timer);
            if (dayElapsed <= 0.25) {
                stats.dayTime.dawn += 1;
                timeOfDay = "dawn";
                // stats[data.type].dawn +=1;
            } else if (dayElapsed <= 0.5) {
                stats.dayTime.morning += 1;
                timeOfDay = "morning";
                // stats[data.type].morning +=1;
            } else if (dayElapsed <= 0.75) {
                stats.dayTime.afternoon += 1;
                timeOfDay = "afternoon";
                // stats[data.type].afternoon +=1;
            } else {
                stats.dayTime.night += 1;
                timeOfDay = "night";
                // stats[data.type].night +=1;
            }
            dayElapsed *= 86400000;
            times += dayElapsed;

            time = days[i] + " ";
            if (data.type === lastOrganismType) {
                //console.log(data.type, lastOrganismType, sequence);
                sequence++;

            } else if (lastOrganismType !== "Separator") {
                daySeqs.push([lastOrganismType, sequence]);
                // createSymbol(data.type, data, null, pos,sequence);
                if (maxSequence < sequence) maxSequence = sequence;
                sequence = 1;
            }
            // }
            if (index === array.length - 1) daySeqs.push([data.type, sequence]);

            createSymbol(today, data.type, data, idx, pos, sequence, timeOfDay);
            lastOrganismType = data.type;
            //console.log(data.type, lastOrganismType);
            pos++;
            idx++;
        });

        seqs.push(daySeqs);
        lastSeparator.sequences = daySeqs;
        sequence = 1;
    }
    index++;
}

let files = {};
let existingFiles = undefined;

function readFiles(uploaderInput) {

    let uploader = uploaderInput;
    existingFiles = undefined;
    files = {
        "comments": [],
        "connections": [],
        "likes": [],
        "media": [],
        "saved": [],
        "seen": []
    };

    if (uploader && uploader.files.length > 0) {
        var reader = new FileReader();
        let i = 0;


        // função agrupar jsons para as casas com array maior que 1

        reader.addEventListener('load', function () {

            let nome = uploader.files[i].name;
            if (nome.includes("post_comments")) {
                files.comments.push(JSON.parse(reader.result));
            } else if (nome.includes("follow") || nome.includes("close")) {
                files.connections.push(JSON.parse(reader.result));
            } else if (nome.includes("liked")) {
                files.likes.push(JSON.parse(reader.result));
            } else if (nome.includes("posts_1") || nome.includes("stories") || nome.includes("igtv")) {
                files.media.push(JSON.parse(reader.result));
            } else if (nome.includes("saved")) {
                files.saved.push(JSON.parse(reader.result));
            } else if (nome.includes("_viewed") || nome.includes("_watched")) {
                files.seen.push(JSON.parse(reader.result));
            }

            i++;

            if (i < uploader.files.length)
                reader.readAsText(uploader.files[i]);
            else {
                for (let key in files) {
                    if (files[key].length > 1) {
                        console.log(key, files[key]);
                        //files[key] = mergeJson(files[key]);

                    } else if (files[key][0] == "You have no data in this section") {
                        files[key] = undefined;
                    } else {
                        files[key] = files[key][0];
                    }
                }

                for (let f in files) if (files[f] == undefined) delete files[f];
                existingFiles = Object.keys(files);

                //console.log(files);

                loads = true;
                dataSetup = false;

                setup();
                draw();
                document.getElementById("startDate").min = days[0];
                document.getElementById("startDate").max = days[days.length - 2];

                document.getElementById("endDate").min = days[1];
                document.getElementById("endDate").max = days[days.length - 1];
            }

        });

        reader.readAsText(uploader.files[i]);
    } else {


        files.comments.push(myComments);

        files.connections.push(myFollow);
        files.connections.push(myFollowers);
        files.connections.push(myHashtags);
        files.connections.push(myClose);

        files.likes.push(myLikes);
        files.likes.push(myLikesComments);

        files.media.push(myPosts);
        files.media.push(myStories);

        files.saved.push(mySaved);

        files.seen.push(myAddsView);
        files.seen.push(myAPostsView);
        files.seen.push(myWatched);


        for (let key in files) {
            if (files[key].length > 1) {
                console.log(key, files[key]);
                //files[key] = mergeJson(files[key]);

            } else if (files[key][0] == "You have no data in this section") {
                files[key] = undefined;
            } else {
                files[key] = files[key][0];
            }
        }

        for (let f in files) if (files[f] == undefined) delete files[f];
        existingFiles = Object.keys(files);

        //console.log(files);

        loads = true;
        dataSetup = false;

        setup();
        draw();
        document.getElementById("startDate").min = days[0];
        document.getElementById("startDate").max = days[days.length - 2];

        document.getElementById("endDate").min = days[1];
        document.getElementById("endDate").max = days[days.length - 1];


    }
}


$(document).ready(function () {

    let randColor = colors[Math.floor(Math.random() * colors.length)];

    $('body').css('background-color', 'rgb(' + randColor + ')');
    $('.modes').css('background-color', 'rgb(' + randColor + ')');
    $('#title').css('background-color', 'rgb(' + randColor + ')');
    $('#info').css('background-color', 'rgb(' + randColor + ',0.75)');
    $('#stats').css('background-color', 'rgb(' + randColor + ',0.75)');
    $('input[type=range]').css('background', 'rgb(' + randColor + ')');
    $('#organism').css('background-color', 'rgb(' + randColor + ')');
    $('#canvasButton').css('background-color', 'rgb(' + randColor + ')');

    $('.centered').css('background-color', 'rgb(' + randColor + ')');
    $('.centered').delay(2000).fadeOut(1000);
    $('#header').css("display", "inline-flex").hide().delay(2000).fadeIn(1000);
    $('#title').css("display", "inline-flex").hide().delay(2000).fadeIn(1000);

    $('#about').css('background-color', 'rgb(' + randColor + ')');

    $('#about').css("display", "inline-flex").hide().delay(3000).fadeIn(1000);


    $('#startUpload label').css('color', 'rgb(' + randColor + ')');
    $(' #start').css('color', 'rgb(' + randColor + ')');

    $('#start').click(function () {
        $('#about').fadeOut("slow");
        $('#startUpload').css("display", "inline-flex").hide().delay(1000).fadeIn(1000);
        $('#myUpload').css("display", "inline-flex").hide().delay(1000).fadeIn(1000);
        $('#uploadInfo').css("display", "inline-flex").hide().delay(1000).fadeIn(1000);
        // $('#files').css("display", "inline-flex").hide().delay(1000).fadeIn(1000);

    });


    $("#menu").click(function () {
        $('#controls').toggleClass("flex");

        // if ($('#controls').hasClass("flex")) canvas.position(300, 90);
        // else canvas.position(0, 90);

        // $('#info').toggleClass("flex");
        info = !info;
    });

    $("#go").click(function () {
        seqs = [];
        start = $("#startDate").val();
        ends = $("#endDate").val();
        console.log(start);
        console.log(ends);

        if (start == "") start = days[0];
        if (ends == "") ends = days[days.length - 1];
        console.log(start);
        console.log(ends);
        if (start < ends) {
            setup();
            draw();
        }

    });

    $("#canvasButton").click(function () {
        ff();
    });

    let slider = document.getElementById("myRange");

    slider.onchange = function () {

        bitModule = int(this.value);
        setup();
        draw();
    };


    $(".modes").on('click', function () {
        mode = $(this).attr('id');
        console.log($(this).attr('id'));
        console.log(mode);


        if (mode == "grid") { //¤
            $("#title").text("Personal▒Instants");
        } else {
            $("#title").text("Personal•¤*Instants");
        }

        setup();
        draw();
    });


    $(".checks").on('click', function () {

        //type = $(this).attr('id');  // ADICIONAR VARIAVEIS DE ENTRADA [INITIAL DATE, FINAL DATE]
        $(this).toggleClass('hide');
        //console.log(type);
        background(242);
        render();

    });

    let uploader;
    $("#fileUpload, #startFileUpload").on('change', function () {
        uploader = event.target;
        $("#goLoad").fadeIn(1000);
    });

    $("#loadInfo").on('click', function () {
        $("#files").css('background-color', 'rgb(' + randColor + ')');
        $("#files").toggle();
    });

    $("#close").on('click', function () {
        $("#files").toggle();
    });

    $("#infoPI").on('click', function () {
        $("#filesInfoPI").css('background-color', 'rgb(' + randColor + ')');
        $("#filesInfoPI").toggle();
    });

    $("#closeInfoPI").on('click', function () {
        $("#filesInfoPI").toggle();
    });

    $("#goLoad, #myLoad").on('click', function () {
        $('#options').show();
        $('#startUpload').fadeOut("slow");
        $('#myUpload').fadeOut("slow");

        $('.p5Canvas').fadeIn(1000);
        $('#stats').css("display", "inline-flex").hide().delay(1000).fadeIn(1000);
        setTimeout(readFiles(uploader), 1000);
        $("#title").text("Personal▒Instants");

        $('#menu').css("display", "inline-flex").hide().delay(2000).fadeIn(1000);
        $('#infoPI').css("display", "inline-flex").hide().delay(2000).fadeIn(1000);

    });

});