var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var port = 8082;

var removeLowestHomeworkScore = function(scores) {
    var lowestItemValue = scores[0].score;
    var lowestItemIterator = 0;
    var returnArray = [];

    for (var i = 0; i < scores.length; i++) {
        if (scores[i]['score'] < lowestItemValue && scores[i]['type'] === 'homework') {
            lowestItemValue = scores[i]['score'];
            lowestItemIterator = i;
        }
    }

    for (var i = 0; i < scores.length; i++) {
        if (i !== lowestItemIterator) {
            returnArray.push(scores[i]);
        }
    }

    return returnArray;
};

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    "use strict";
    if(err) throw err;

    var students = db.collection('students');
    var coursor = students.find();

    var lowest;

    coursor.each(function (err, doc) {
        if (doc == null) {
            return 0;
            db.close();
        }

        doc.scores = removeLowestHomeworkScore(doc.scores);
        students.update({ '_id' : doc._id }, doc, {}, function(err, result) {
            if (err) throw err;

            console.log('updated!');
        });
    });

    app.listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
});

