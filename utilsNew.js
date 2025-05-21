let commentByDay;
let closeByDay, followersByDay, followingByDay, hashtagsByDay;
let mediaLikesByDay, commentLikesByDay;
let photosByDay, storiesByDay, directByDay, moviesByDay;
let savedByDay;
let adsByDay, chainingByDay, postsByDay, videosByDay;

let myComments, myFollow, myFollowers, myHashtags, myClose, myLikes, myLikesComments, myPosts, myStories, mySaved, myAddsView, myAPostsView, myWatched;

let packageByDay = [];
let days = [];


function preload() {
    myFont = loadFont('fonts/FKRasterGroteskCompact.ttf');

    myComments = loadJSON('JSONs/my/myComments.json');

    myFollow = loadJSON('JSONs/my/myFollow.json');
    myFollowers = loadJSON('JSONs/my/myFollowers.json');
    myHashtags = loadJSON('JSONs/my/myHashtags.json');
    myClose = loadJSON('JSONs/my/myClose.json');

    myLikes = loadJSON('JSONs/my/myLikes.json');
    myLikesComments = loadJSON('JSONs/my/myLikesComments.json');

    myPosts = loadJSON('JSONs/my/myPosts.json');
    myStories = loadJSON('JSONs/my/myStories.json');

    mySaved = loadJSON('JSONs/my/mySaved.json');

    myAddsView = loadJSON('JSONs/my/myAddsView.json');
    myAPostsView = loadJSON('JSONs/my/myPostsView.json');
    myWatched = loadJSON('JSONs/my/myWatched.json');

}

function setupData() {
    dataSetup = true;
    


    packageByDay = [];
    days = [];

/////////////////////////////////////////////////////////////////////////////
//                          COMMENTS
/////////////////////////////////////////////////////////////////////////////
    if (files['comments'])
        commentByDay = commentsByDay(files['comments'].comments_media_comments, 'commentByDay');

/////////////////////////////////////////////////////////////////////////////
//                      CONNECTIONS
/////////////////////////////////////////////////////////////////////////////

    closeByDay = connectionsByDay(files['connections'], 'relationships_close_friends', 'closeByDay');
    followersByDay = connectionsByDay(files['connections'], "relationships_followers", 'followersByDay');
    hashtagsByDay = connectionsByDay(files['connections'], "relationships_following_hashtags", 'hashtagsByDay');
    followingByDay = connectionsByDay(files['connections'], "relationships_following", 'followingByDay');

/////////////////////////////////////////////////////////////////////////////
//                          LIKES
/////////////////////////////////////////////////////////////////////////////

    if (files['likes']) {
        commentLikesByDay = likesByDay(files['likes'], "likes_comment_likes", 'commentLikesByDay');
        mediaLikesByDay = likesByDay(files['likes'], "likes_media_likes", 'mediaLikesByDay');
    }


/////////////////////////////////////////////////////////////////////////////
//                          MEDIA
/////////////////////////////////////////////////////////////////////////////

    if (files['media']) {
        moviesByDay = mediaByDay(files['media'], "ig_igtv_media", 'caption', 'moviesByDay');
        photosByDay = mediaByDay(files['media'], "0", 'caption', 'photosByDay');
        storiesByDay = mediaByDay(files['media'], "ig_stories", 'caption', 'storiesByDay');
        //directByDay = mediaByDay(files['media'].direct, undefined, 'path', 'directByDay');
    }


/////////////////////////////////////////////////////////////////////////////
//                          SAVED
/////////////////////////////////////////////////////////////////////////////

    if (files['saved'])
        savedByDay = savesByDay(files['saved'].saved_saved_media, 'savedByDay');


/////////////////////////////////////////////////////////////////////////////
//                      SEEN CONTENT
/////////////////////////////////////////////////////////////////////////////

    if (files['seen']) {

        adsByDay = seenByDay(files['seen'], "impressions_history_ads_seen", 'adsByDay');
        postsByDay = seenByDay(files['seen'], "impressions_history_posts_seen", 'postsByDay');
        videosByDay = seenByDay(files['seen'], "impressions_history_videos_watched", 'videosByDay');
    }

    days = _.uniq(days).sort();
}

function unify(dataset) {
    for (const prop in dataset) {
        dataset[prop] = _.uniq(dataset[prop], 'timestamp');
    }
}

function mergeJson(datasets) {
    let target = {};
    for (var argi = 0; argi < datasets.length; argi++) {

        var source = datasets[argi];
        for (var key in source) {
            if (!(key in target)) {
                target[key] = [];
            }
            for (var i = 0; i < source[key].length; i++) {
                target[key].push(source[key][i]);
            }
        }


    }

    return target;
}

//DONE
function commentsByDay(dataset, id) {
    var groups = {};
    if (dataset !== undefined) {
        dataset.forEach(function (val) {

            if (val.hasOwnProperty("string_list_data")) {


                var dateX = new Date(val["string_list_data"][0].timestamp * 1000).toISOString().split("T");
                var date = dateX[0];
                var timer = dateX[1].substr(0, 8);

                if (date in groups) {
                    groups[date].push({timer, comment: val["string_list_data"][0].value, user: val.title});
                } else {
                    groups[date] = new Array({timer, comment: val["string_list_data"][0].value, user: val.title});
                    days.push(date);
                }

            }
            else {

                var dateX = new Date(val.string_map_data['Comment creation time'].timestamp * 1000).toISOString().split("T");
                var date = dateX[0];
                var timer = dateX[1].substr(0, 8);

                if (date in groups) {
                    groups[date].push({timer, comment: val["string_map_data"].Comment.value, user: val.title});
                } else {
                    groups[date] = new Array({timer, comment: val["string_map_data"].Comment.value, user: val.title});
                    days.push(date);
                }
            }

        });
    }

    packageByDay.push([id, groups]);

    return groups;
}

//DONE
function connectionsByDay(dataset, dataX, id) {
    var groups = {};

    let data = undefined;
    if (dataset !== undefined) {
        for (let i = 0; i < dataset.length; i++) {
            if (Object.keys(files.connections[i]).includes(dataX)) {
                data = dataset[i][dataX];
            }
        }
    }
    if (data !== undefined) {
        data.forEach(function (val) {
            var dateX = new Date(val["string_list_data"][0].timestamp * 1000).toISOString().split("T");
            var date = dateX[0];
            var timer = dateX[1].substr(0, 8);

            if (date in groups) {
                groups[date].push({timer, connect: val["string_list_data"][0].value});
            } else {
                groups[date] = new Array({timer, connect: val["string_list_data"][0].value});
                days.push(date);
            }
        });
    }
    packageByDay.push([id, groups]);
    return groups;
}

//DONE
function likesByDay(dataset, dataX, id) {
    var groups = {};
    let data = undefined;
    if (dataset !== undefined) {
        for (let i = 0; i < dataset.length; i++) {
            if (Object.keys(files.likes[i]).includes(dataX)) {
                data = dataset[i][dataX];
            }
        }
    }
    if (data !== undefined) {
        data.forEach(function (val) {
            var dateX = new Date(val["string_list_data"][0].timestamp * 1000).toISOString().split("T");
            var date = dateX[0];
            var timer = dateX[1].substr(0, 8);

            if (date in groups) {
                groups[date].push({timer, profile: val.title});
            } else {
                groups[date] = new Array({timer, profile: val.title});
                days.push(date);
            }
        });
    }
    packageByDay.push([id, groups]);
    return groups;
}

//DONE
function mediaByDay(dataset, dataX, caption, id) {
    var groups = {};

    let data = undefined;
    if (dataset !== undefined) {
        for (let i = 0; i < dataset.length; i++) {
            if (Object.keys(files.media[i]).includes(dataX)) {
                if (dataX !== "0") { //QUESTÃO DE UMA ENTRADA NAO TER KEY VALUE
                    data = dataset[i][dataX];
                } else {
                    data = dataset[i];
                }
            }
        }
    }

    if (data !== undefined) {

        for (let i = 0; i < data.length; i++) {
            let dateX;
            if (data[i].media) {
                dateX = new Date(data[i].media[0]["creation_timestamp"] * 1000).toISOString().split("T");
            } else {
                dateX = new Date(data[i]["creation_timestamp"] * 1000).toISOString().split("T");
            }
            var date = dateX[0];
            var timer = dateX[1].substr(0, 8);
            if (caption === undefined) {

                if (date in groups) {
                    groups[date].push({timer});
                } else {
                    groups[date] = new Array({timer});
                }
            } else {
                if (date in groups) {
                    if (data[i].media)
                        groups[date].push({timer, caption: data[i].media[0].title});
                    else
                        groups[date].push({timer, caption: data[i].title});
                } else {
                    if (data[i].media)
                        groups[date] = new Array({timer, caption: data[i].media[0].title});
                    else
                        groups[date] = new Array({timer, caption: data[i].title});
                    days.push(date);
                }
            }
        }
    }

    packageByDay.push([id, groups]);
    return groups;
}

function savesByDay(dataset, id) {
    var groups = {};
    if (dataset !== undefined) {
        dataset.forEach(function (val) {

            let dateX;
            let key;
            for ([key] of Object.entries(val["string_map_data"]))
                if (key.includes("artilhado") || key.includes("Shared")) dateX = new Date(val["string_map_data"][key].timestamp * 1000).toISOString().split("T");

            var date = dateX[0];
            var timer = dateX[1].substr(0, 8);

            if (date in groups) {
                groups[date].push({timer, profile: val["string_map_data"][key].value});
            } else {
                groups[date] = new Array({timer, profile: val["string_map_data"][key].value});
                days.push(date);
            }
        });
    }
    packageByDay.push([id, groups]);

    return groups;
}

//DONE
function seenByDay(dataset, dataX, id) {
    var groups = {};

    let data = undefined;
    if (dataset !== undefined) {
        for (let i = 0; i < dataset.length; i++) {
            if (Object.keys(files.seen[i]).includes(dataX)) {
                data = dataset[i][dataX];
            }
        }
    }
    if (data !== undefined) {

        data.forEach(function (val) {
            var dateX;
            for (const [key] of Object.entries(val["string_map_data"]))
                if (key.includes("ora") || key.includes("Time")) dateX = new Date(val["string_map_data"][key].timestamp * 1000).toISOString().split("T");

            var date = dateX[0];
            var timer = dateX[1].substr(0, 8);

            if (date in groups) {
                if (val["string_map_data"].hasOwnProperty('Autor'))
                    groups[date].push({timer, profile: val["string_map_data"].Autor.value});
                else
                    groups[date].push({timer, profile: val["string_map_data"].Author.value});

            } else {
                if (val["string_map_data"].hasOwnProperty('Autor'))
                    groups[date] = new Array({timer, profile: val["string_map_data"].Autor.value});
                else
                    groups[date] = new Array({timer, profile: val["string_map_data"].Author.value});

                days.push(date);
            }
        });
    }

    packageByDay.push([id, groups]);

    return groups;
}

