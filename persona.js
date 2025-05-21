//////////////////////////////////////////////////////////////////////////////////////////
//                              PART OF DAY LINE
//////////////////////////////////////////////////////////////////////////////////////////


function drawDayLine() {

    let north = map(stats.dayTime["dawn"], 1, stats.total, 100, w/2);
    let northVector = createVector(w / 2 + north * cos(3 * PI / 2), h / 2 + north * sin(3 * PI / 2));

    let east = map(stats.dayTime["morning"], 1, stats.total, 100, w/2);
    let eastVector = createVector(w / 2 + east * cos(0), h / 2 + east * sin(0));

    let south = map(stats.dayTime["afternoon"], 1, stats.total, 100, w/2);
    let southVector = createVector(w / 2 + south * cos(PI / 2), h / 2 + south * sin(PI / 2));

    let west = map(stats.dayTime["night"], 1, stats.total, 100, w/2);
    let westVector = createVector(w / 2 + west * cos(PI), h / 2 + west * sin(PI));


    let lastPoint = northVector; // duplicate the first point to close the line
    let firstAdditionalControlPoint = westVector;
    let lastAdditionalControlPoint = eastVector;
    let controlPoints = [];

    north = map(stats.dayTime["dawn"], 1, stats.total, 20, 400);
    east = map(stats.dayTime["morning"], 1, stats.total, 20, 400);
    south = map(stats.dayTime["afternoon"], 1, stats.total, 20, 400);
    west = map(stats.dayTime["night"], 1, stats.total, 20, 400);


    ////////////////////////////// NORTH == DAWN ////////////////////////////////////////////////////////////

    noStroke();
    for (let r = north; r > 0; --r) {
        fill(300, 20 - map(r, 0, north, 0, 20), 95);
        ellipse(northVector.x, northVector.y, r, r);
    }

    stroke(42, 100, 0);
    strokeWeight(5);
    for (let l = 0; l < 5; l++) {
        line(northVector.x - (0.25 * north) * cos(l * TWO_PI / 10),
            northVector.y - (0.25 * north) * sin(l * TWO_PI / 10),
            northVector.x + (0.25 * north) * cos(l * TWO_PI / 10),
            northVector.y + (0.25 * north) * sin(l * TWO_PI / 10));
    }

    ////////////////////////////// EAST == MORNING ////////////////////////////////////////////////////////////

    noStroke();
    for (let r = east; r > 0; --r) {
        fill(50, 60 - map(r, 0, east, 0, 60), 95);
        ellipse(eastVector.x,eastVector.y, r, r);
    }

    stroke(42, 100, 0);
    strokeWeight(5);
    for (let l = 0; l < 5; l++) {
        line(eastVector.x - (0.25 * east) * cos(l * TWO_PI / 10),
            eastVector.y - (0.25 * east) * sin(l * TWO_PI / 10),
            eastVector.x + (0.25 * east) * cos(l * TWO_PI / 10),
            eastVector.y + (0.25 * east) * sin(l * TWO_PI / 10));
    }

    ////////////////////////////// SOUTH == AFTERNOON ///////////////////////////////////////////////////////////

    noStroke();
    for (let r = south; r > 0; --r) {
        fill(30, 70 - map(r, 0, south, 0, 70), 95);
        ellipse(southVector.x, southVector.y, r, r);
    }

    stroke(42, 100, 0);
    strokeWeight(5);
    for (let l = 0; l < 5; l++) {
        line(southVector.x - (0.25 * south) * cos(l * TWO_PI / 10),
            southVector.y - (0.25 * south) * sin(l * TWO_PI / 10),
            southVector.x + (0.25 * south) * cos(l * TWO_PI / 10),
            southVector.y + (0.25 * south) * sin(l * TWO_PI / 10));
    }

    ////////////////////////////// WEST == NIGHT //////////////////////////////////////////////////////////////////

    noStroke();
    for (let r = west; r > 0; --r) {
        fill(220, 50 - map(r, 0, west, 0, 50), 95);
        ellipse(westVector.x, westVector.y, r, r);
    }

    stroke(42, 100, 0);
    strokeWeight(5);
    for (let l = 0; l < 5; l++) {
        line(westVector.x - (0.25 * west) * cos(l * TWO_PI / 10),
            westVector.y - (0.25 * west) * sin(l * TWO_PI / 10),
            westVector.x + (0.25 * west) * cos(l * TWO_PI / 10),
            westVector.y + (0.25 * west) * sin(l * TWO_PI / 10));
    }

    controlPoints.push(northVector);
    controlPoints.push(eastVector);
    controlPoints.push(southVector);
    controlPoints.push(westVector);


    controlPoints.push(lastPoint);
    controlPoints.push(lastAdditionalControlPoint);
    controlPoints.unshift(firstAdditionalControlPoint);

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                  BLACK LINE ORDERED FROM BIGGER TO SMALLER TYPE OF ACTIVITY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawLine() {
    
    let t = map(avgHourActivityPercentage, 0.3, 0.7, -15, 15);
    
    let lastPoint = sortedPoints[0][0]; // duplicate the first point to close the line
    let firstAdditionalControlPoint = sortedPoints[sortedPoints.length - 1][0].copy();
    let lastAdditionalControlPoint = sortedPoints[1][0].copy();
    let controlPoints = [];
    for (let p = 0; p < sortedPoints.length; p++) {
            controlPoints.push(sortedPoints[p][0]);
    }
    controlPoints.push(lastPoint);
    controlPoints.push(lastAdditionalControlPoint);
    controlPoints.unshift(firstAdditionalControlPoint);


    push();
    scale(1.5);
    noFill();
    stroke(42);
    strokeWeight(5);
    beginShape();
    for (let p of controlPoints) {
        curveVertex(p.x, p.y);
    }
    translate(-w / 6, -h / 6);
    endShape();
    pop();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                    FORMA COLOURED WITH ACTIVITY CENTROIDS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawCatmullRomSpline() {
   
    let t = map(avgHourActivityPercentage, 0.3, 0.7, -15, 15);
   
    let lastPoint = points[0][0]; // duplicate the first point to close the line
    let firstAdditionalControlPoint = points[points.length - 1][0].copy();
    let lastAdditionalControlPoint = points[1][0].copy();
    let controlPoints = [];
    for (let p = 0; p < points.length; p++) {

        controlPoints.push(points[p][0]);
    }
    controlPoints.push(lastPoint);
    controlPoints.push(lastAdditionalControlPoint);
    controlPoints.unshift(firstAdditionalControlPoint);


    push();
    translate(w/2,h/2);
    rotate(PI/4);
    translate(-w/2,-h/2);
    colorMode(HSB, 360, 100, 100);
    drawDayLine();
    colorMode(RGB);
    pop();

    push();
    noStroke();
    fill(finalColorR, finalColorG, finalColorB);
    beginShape();
    for (let p of controlPoints) {
        curveVertex(p.x, p.y);
    }
    endShape();
    pop();

    drawLine();
    drawControlPoints();
    persona();



}

function drawControlPoints() {

    noStroke();
    let i = 0;
    

    for (let p of points) {
        fill(cls[i++]);
        circle(p[0].x, p[0].y, p[1]);

     
        stroke(42);
        noFill();
        

        let stkDawn = map(stats[p[2]].dawn, 0, stats[p[2]].total, 0, p[1]/3);
        strokeWeight(stkDawn);
        arc(p[0].x, p[0].y, p[1]*1.2, p[1]*1.2, 1.5*PI, TWO_PI); // Dawn
        let stkMorning = map(stats[p[2]].morning, 0, stats[p[2]].total, 0, p[1]/3);
        strokeWeight(stkMorning);
        arc(p[0].x, p[0].y, p[1]*1.2, p[1]*1.2, 0, HALF_PI); // Morning
        let stkAfternoon = map(stats[p[2]].afternoon, 0, stats[p[2]].total, 0, p[1]/3);
        strokeWeight(stkAfternoon);
        arc(p[0].x, p[0].y, p[1]*1.2, p[1]*1.2, HALF_PI, PI); // Afternoon
        let stkNight = map(stats[p[2]].night, 0, stats[p[2]].total, 0, p[1]/3);
        strokeWeight(floor(stkNight));
        arc(p[0].x, p[0].y, p[1]*1.2, p[1]*1.2, PI, 1.5*PI); // Night

        noStroke();
        fill(42);
        circle(p[0].x, p[0].y, 15);
    }

}


function persona() {

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //                              MEDIAN POINT FROM DAY SEQUENCES
    ////////////////////////////////////////////////////////////////////////////////////////////////


    let pointX = 0;
    let pointY = 0;
    noStroke();

    let CommentCount = 0;
    let ConnectCount = 0;
    let LikeCount = 0;
    let MediaCount = 0;
    let SavedCount = 0;
    let SeenCount = 0;

    let seqPoints = [];

    for (let s = 0; s < seqs.length; s++) {
        
        CommentCount = 0;
        ConnectCount = 0;
        LikeCount = 0;
        MediaCount = 0;
        SavedCount = 0;
        SeenCount = 0;

        for (let i = 0; i < seqs[s].length; i++) {

            if (seqs[s][i][0] === "adsByDay" || seqs[s][i][0] === "chainingByDay" ||
                seqs[s][i][0] === "postsByDay" || seqs[s][i][0] === "videosByDay") { // TOP LEFT
                pointX += seenX;
                pointY += seenY;
                SeenCount++;
                fill(colorSeen);
            } else if (seqs[s][i][0] === "commentByDay") {                      // TOP RIGHT
                pointX += commentsX;
                pointY += commentsY;
                CommentCount++;
                fill(colorComment);
            } else if (seqs[s][i][0] === "mediaLikesByDay" || seqs[s][i][0] === "commentLikesByDay") {  // MIDDLE LEFT
                pointX += likesX;
                pointY += likesY;
                LikeCount++;
                fill(colorLike);
            } else if (seqs[s][i][0] === "closeByDay" || seqs[s][i][0] === "followersByDay" ||
                seqs[s][i][0] === "followingByDay" || seqs[s][i][0] === "hashtagsByDay") {     // MIDDLE RIGHT
                pointX += connectionsX;
                pointY += connectionsY;
                ConnectCount++;
                fill(colorConnect);
            } else if (seqs[s][i][0] === "photosByDay" || seqs[s][i][0] === "moviesByDay" ||
                seqs[s][i][0] === "storiesByDay" || seqs[s][i][0] === "directByDay") {     // BOTTOM LEFT
                pointX += mediaX;
                pointY += mediaY;
                MediaCount++;
                fill(colorMedia);
            } else if (seqs[s][i][0] === "savedByDay") {                            // BOTTOM RIGHT
                pointX += savedX;
                pointY += savedY;
                SavedCount++;
                fill(colorSaved);
            }
        }

        let finalColorR = (CommentCount * colorComment[0] + ConnectCount * colorConnect[0] + LikeCount * colorLike[0] + MediaCount * colorMedia[0] + SavedCount * colorSaved[0] + SeenCount * colorSeen[0]) / (seqs[s].length - 1);
        let finalColorG = (CommentCount * colorComment[1] + ConnectCount * colorConnect[1] + LikeCount * colorLike[1] + MediaCount * colorMedia[1] + SavedCount * colorSaved[1] + SeenCount * colorSeen[1]) / (seqs[s].length - 1);
        let finalColorB = (CommentCount * colorComment[2] + ConnectCount * colorConnect[2] + LikeCount * colorLike[2] + MediaCount * colorMedia[2] + SavedCount * colorSaved[2] + SeenCount * colorSeen[2]) / (seqs[s].length - 1);

        pointX /= (seqs[s].length);
        pointY /= (seqs[s].length);

        seqPoints.push(createVector(pointX, pointY));
        fill(finalColorR, finalColorG, finalColorB);
     
        fill(42, 150);
        circle(pointX, pointY, seqs[s].length - 1);
    }
}
