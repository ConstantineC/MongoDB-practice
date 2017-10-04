let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

let url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Conneced successefully to server');
    insertDocuments(db, function() {
        updateDocument(db, function() {
          removeDocument(db, function() {
            db.close();
          });
        });
    });
    
});

let insertDocuments = function(db, callback) {
    let collection = db.collection('documents');

    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        callback(result);
    });
}   

let findDocuments = function(db, callback) {
    let collection = db.collection('documents');

    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
}

let findDocumentss = function(db, callback) {
    let collection = db.collection('documents');

    collection.find({'a': 3}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
}

let updateDocument = function(db, callback) {
    let collection = db.collection('documents');

    collection.updateOne({ a : 2 }
    , {$set: { b : 1 } }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Updated the document with the field a  equal 2");
        callback(result);
    });
}

let removeDocument = function(db, callback) {
    let collection = db.collection('documents');

    collection.deleteOne({a : 3 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}