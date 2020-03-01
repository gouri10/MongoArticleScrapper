//Binding in our scrape script and make date script
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

//Bring in the headline and note mangoose models
var Headline = require("../models/Headline");

module.exports = {
    fetch: function (cb) {
        console.log("came here 7");
        scrape(function (data) {
            console.log("came here 3");
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                cb(err, docs);
            });
        });
    },
    delete: function (query, cb) {
        Headline.remove(query, cb);
    },
    get: function (query, cb) {
        console.log("came here 2");
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                cb(doc);
            });
    },
    update: function (query, cb) {
        Headline.update({ _id: query._id }, {
            $setActive: query
        }, {}, cb);
    }
};