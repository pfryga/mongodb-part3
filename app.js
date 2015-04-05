var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var port = 8082;

MongoClient.connect('mongodb://localhost:27017/students', function(err, db) {
    "use strict";

    if(err) throw err;

    console.log(db);

    app.listen(port, function () {
        console.log('Express server listening on port' + port);
    });
});

