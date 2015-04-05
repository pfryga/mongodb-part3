var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var port = 8082;

var getLowestItemId = function (scores) {
    var lowestValue = scores[0].score;
    var lowestValueIterator = 0;

    for (var i = 0; i < scores.length; i++) {
        if (scores[i].score < lowestValue) {
            lowestValue = scores[i].score;
            lowestValueIterator = i;
        }
    }

    return lowestValueIterator;
}

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

        console.log(getLowestItemId(doc.scores));
    });

    app.listen(port, function () {
        console.log('Express server listening on port ' + port);
    });
});

