function createSymbol(today, type, data, id, pos, seq, tod) {

/////////////////////////////////////////////////////////////////////////////
//                          COMMENTS
/////////////////////////////////////////////////////////////////////////////


    if (type === "commentByDay") {
        organisms.push(new Comment(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.comments.comments +=1;
        stats.comments.total +=1;
        stats.comments[tod] +=1;
        stats.total++;
    }


/////////////////////////////////////////////////////////////////////////////
//                      CONNECTIONS
/////////////////////////////////////////////////////////////////////////////

    else if (type === "closeByDay") {
        organisms.push(new Connection(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.connections.close +=1;
        stats.connections[tod] +=1;
        stats.total++;

        connectionsPointsX.push(organisms[organisms.length-1].x);
        connectionsPointsY.push(organisms[organisms.length-1].y);
    }

    else if (type === "followersByDay") {
        organisms.push(new Connection(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.connections.followers +=1;
        stats.connections.total +=1;
        stats.connections[tod] +=1;
        stats.total++;

        connectionsPointsX.push(organisms[organisms.length-1].x);
        connectionsPointsY.push(organisms[organisms.length-1].y);
    }
    else if (type === "followingByDay") {
        organisms.push(new Connection(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.connections.following +=1;
        stats.connections.total +=1;
        stats.connections[tod] +=1;
        stats.total++;

        connectionsPointsX.push(organisms[organisms.length-1].x);
        connectionsPointsY.push(organisms[organisms.length-1].y);

    }

    else if (type === "hashtagsByDay") {
        organisms.push(new Connection(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.connections.hashtags +=1;
        stats.connections.total +=1;
        stats.connections[tod] +=1;
        stats.total++;

        connectionsPointsX.push(organisms[organisms.length-1].x);
        connectionsPointsY.push(organisms[organisms.length-1].y);
    }



/////////////////////////////////////////////////////////////////////////////
//                          LIKES
/////////////////////////////////////////////////////////////////////////////

    else if (type === "mediaLikesByDay") {

        organisms.push(new Like(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.likes.mediaLikes +=1;
        stats.likes.total +=1;
        stats.likes[tod] +=1;
        stats.total++;

        likesPointsX.push(organisms[organisms.length-1].x);
        likesPointsY.push(organisms[organisms.length-1].y);
    }

    else if (type === "commentLikesByDay") {
        organisms.push(new Like(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.likes.commentLikes +=1;
        stats.likes.total +=1;
        stats.likes[tod] +=1;
        stats.total++;

        likesPointsX.push(organisms[organisms.length-1].x);
        likesPointsY.push(organisms[organisms.length-1].y);
    }

/////////////////////////////////////////////////////////////////////////////
//                          MEDIA
/////////////////////////////////////////////////////////////////////////////

    else if (type === "photosByDay") {

        organisms.push(new Media(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.media.photos +=1;
        stats.media.total +=1;
        stats.media[tod] +=1;
        stats.total++;
    }

    else if (type === "moviesByDay") {

        organisms.push(new Media(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.media.movies +=1;
        stats.media.total +=1;
        stats.media[tod] +=1;
        stats.total++;
    }

    else if (type === "storiesByDay") {
        organisms.push(new Media(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.media.stories +=1;
        stats.media.total +=1;
        stats.media[tod] +=1;
        stats.total++;
    }

    else if (type === "directByDay") {
        organisms.push(new Media(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.media.direct +=1;
        stats.media.total +=1;
        stats.media[tod] +=1;
        stats.total++;
    }

/////////////////////////////////////////////////////////////////////////////
//                          SAVED
/////////////////////////////////////////////////////////////////////////////

    else if (type === "savedByDay") {
        organisms.push(new Saved(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.saved.saved +=1;
        stats.saved.total +=1;
        stats.saved[tod] +=1;
        stats.total++;

        savedPointsX.push(organisms[organisms.length-1].x);
        savedPointsY.push(organisms[organisms.length-1].y);
    }

/////////////////////////////////////////////////////////////////////////////
//                      SEEN CONTENT
/////////////////////////////////////////////////////////////////////////////

    else if (type === "adsByDay") {
        organisms.push(new Seen(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.seen.ads +=1;
        stats.seen.total +=1;
        stats.seen[tod] +=1;
        stats.total++;

        seenPointsX.push(organisms[organisms.length-1].x);
        seenPointsY.push(organisms[organisms.length-1].y);
    }
    else if (type === "chainingByDay") {
        organisms.push(new Seen(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.seen.chaining +=1;
        stats.seen.total +=1;
        stats.seen[tod] +=1;
        stats.total++;

        seenPointsX.push(organisms[organisms.length-1].x);
        seenPointsY.push(organisms[organisms.length-1].y);
    }
    else if (type === "postsByDay") {
        organisms.push(new Seen(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.seen.posts +=1;
        stats.seen.total +=1;
        stats.seen[tod] +=1;
        stats.total++;

        seenPointsX.push(organisms[organisms.length-1].x);
        seenPointsY.push(organisms[organisms.length-1].y);
    }
    else if (type === "videosByDay") {
        organisms.push(new Seen(
            today,
            random(0,width),
            random(0,height),
            random(5, 10),
            id,
            data,
            organisms,
            type,
            pos,
            seq,
            tod));

        stats.seen.videos +=1;
        stats.seen.total +=1;
        stats.seen[tod] +=1;
        stats.total++;

        seenPointsX.push(organisms[organisms.length-1].x);
        seenPointsY.push(organisms[organisms.length-1].y);
    }

    else {
        console.log("ohh shouts...");
    }
}


function addDaySector(diffDays,sequence,data) {

    let newDiffDays;
    let size = 0;


    if(isNaN(diffDays))pos++; //console.log("1ºcaso");

    else if(diffDays == 1){
        pos+=diffDays;
        newDiffDays=diffDays;
    }
    else if(diffDays <7){   //  < 1 semana
        size=bitModule/2;
        pos += diffDays;
        newDiffDays = diffDays-1;
    }
    else if(diffDays <31){  //  < 1 mes -> faz grupos de semanas
        size=bitModule;
        let weeks = int(diffDays/7);
        let days = diffDays%7;
        newDiffDays = weeks+days-1;
        pos+=diffDays;
    }
    else{
        size=bitModule*2;
        pos+=diffDays;
        newDiffDays = diffDays-1;
    }


     organisms.push(new Separator(today, pos-1, diffDays-1,size,sequence,data));
    return organisms[organisms.length-1];
}
