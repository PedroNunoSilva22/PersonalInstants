let commentByDay;
let closeByDay, followersByDay, followingByDay, hashtagsByDay;
let mediaLikesByDay, commentLikesByDay;
let photosByDay, storiesByDay, directByDay, moviesByDay;
let savedByDay;
let adsByDay, chainingByDay, postsByDay, videosByDay;


let packageByDay = [];
let days = [];


function preload() {

    myFont = loadFont('fonts/FKRasterGroteskCompact.ttf');

}

function setupData() {
    dataSetup=true;
    unify(files['seen']);


    packageByDay = [];
    days = [];

/////////////////////////////////////////////////////////////////////////////
//                          COMMENTS
/////////////////////////////////////////////////////////////////////////////
    if (files['comments'])
        commentByDay = commentsByDay(files['comments'].media_comments, 'commentByDay');

/////////////////////////////////////////////////////////////////////////////
//                      CONNECTIONS
/////////////////////////////////////////////////////////////////////////////

    closeByDay = connectionsByDay(files['connections'], 'close_friends', 'closeByDay');
    followersByDay = connectionsByDay(files['connections'], 'followers', 'followersByDay');
    followingByDay = connectionsByDay(files['connections'], 'following', 'followingByDay');
    hashtagsByDay = connectionsByDay(files['connections'], 'following_hashtags', 'hashtagsByDay');

/////////////////////////////////////////////////////////////////////////////
//                          LIKES
/////////////////////////////////////////////////////////////////////////////

    if (files['likes']) {
        mediaLikesByDay = likesByDay(files['likes'].media_likes, 'mediaLikesByDay');
        commentLikesByDay = likesByDay(files['likes'].comment_likes, 'commentLikesByDay');
    }


/////////////////////////////////////////////////////////////////////////////
//                          MEDIA
/////////////////////////////////////////////////////////////////////////////

    if (files['media']) {
        photosByDay = mediaByDay(files['media'].photos, 'caption', 'path', 'photosByDay');
        moviesByDay = mediaByDay(files['media'].videos, 'caption', 'path', 'moviesByDay');
        storiesByDay = mediaByDay(files['media'].stories, 'caption', 'path', 'storiesByDay');
        directByDay = mediaByDay(files['media'].direct, undefined, 'path', 'directByDay');
    }


/////////////////////////////////////////////////////////////////////////////
//                          SAVED
/////////////////////////////////////////////////////////////////////////////

    if (files['saved'])
        savedByDay = savesByDay(files['saved'].saved_media, 'savedByDay');


/////////////////////////////////////////////////////////////////////////////
//                      SEEN CONTENT
/////////////////////////////////////////////////////////////////////////////

    if (files['seen']) {
        adsByDay = seenByDay(files['seen'].ads_seen, 'author', 'adsByDay');
        chainingByDay = seenByDay(files['seen'].chaining_seen, 'username', 'chainingByDay');
        postsByDay = seenByDay(files['seen'].posts_seen, 'author', 'postsByDay');
        videosByDay = seenByDay(files['seen'].videos_watched, 'author', 'videosByDay');
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

function commentsByDay(dataset, id) {
    var groups = {};
    if (dataset !== undefined) {
        dataset.forEach(function (val) {
            var date = val[0].split('T')[0];
            var timer = val[0].split('T')[1].substr(0, 8);

            if (date in groups) {
                groups[date].push({timer, comment: val[1], user: val[2]});
            } else {
                groups[date] = new Array({timer, comment: val[1], user: val[2]});
                days.push(date);
            }

        });
    }

    packageByDay.push([id, groups]);

    return groups;
}

function connectionsByDay(dataset, keyName, id) {
    var groups = {};
    if (dataset !== undefined) {
        for (let name in dataset[keyName]) {
            var date = dataset[keyName][name].split('T')[0];
            var timer = dataset[keyName][name].split('T')[1].substr(0, 8);

            if (date in groups) {
                groups[date].push({timer, connect: name});
            } else {
                groups[date] = new Array({timer, connect: name});
                days.push(date);
            }
        }
    }
    packageByDay.push([id, groups]);
    return groups;
}

function likesByDay(dataset, id) {
    var groups = {};
    if (dataset !== undefined) {
        dataset.forEach(function (val) {
            var date = val[0].split('T')[0];
            var timer = val[0].split('T')[1].substr(0, 8);

            if (date in groups) {
                groups[date].push({timer, profile: val[1]});
            } else {
                groups[date] = new Array({timer, profile: val[1]});
                days.push(date);
            }
        });
    }
    packageByDay.push([id, groups]);

    return groups;
}

function mediaByDay(dataset, caption, path, id) {
    var groups = {};

    if (dataset !== undefined) {


        dataset.forEach(function (val) {
            var date = val.taken_at.split('T')[0];
            var timer = val.taken_at.split('T')[1].substr(0, 8);

            if (caption === undefined) {

                if (date in groups) {
                    groups[date].push({timer, [path]: val[path]});
                } else {
                    groups[date] = new Array({timer, [path]: val[path]});
                }
            } else {
                if (date in groups) {
                    groups[date].push({timer, [caption]: val[caption], [path]: val[path]});
                } else {
                    groups[date] = new Array({timer, [caption]: val[caption], [path]: val[path]});
                    days.push(date);
                }
            }
        });
    }

    packageByDay.push([id, groups]);
    return groups;
}

function savesByDay(dataset, id) {
    var groups = {};
    if (dataset !== undefined) {
        dataset.forEach(function (val) {
            var date = val[0].split('T')[0];
            var timer = val[0].split('T')[1].substr(0, 8);

            if (date in groups) {
                groups[date].push({timer, profile: val[1]});
            } else {
                groups[date] = new Array({timer, profile: val[1]});
                days.push(date);
            }
        });
    }
    packageByDay.push([id, groups]);

    return groups;
}

function seenByDay(dataset, keyName, id) {
    var groups = {};
    if (dataset !== undefined) {
        dataset.forEach(function (val) {
            if (val.timestamp !== null) {

                var date = val.timestamp.split('T')[0];
                var timer = val.timestamp.split('T')[1].substr(0, 8);

                if (date in groups) {
                    groups[date].push({timer, [keyName]: val[keyName]});
                } else {
                    groups[date] = new Array({timer, [keyName]: val[keyName]});
                    days.push(date);
                }
            }
        });
    }

    packageByDay.push([id, groups]);

    return groups;
}

