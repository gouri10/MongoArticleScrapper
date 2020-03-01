
var headlinesController = require("../controllers/headLinesController")
var notesController = require("../controllers/notesController")

module.exports = function (router) {

    router.get("/", function (req, res) {
        res.render("home");
    })

    router.get("/saved", function (req, res) {
        res.render("saved");
    })

    router.get("/api/fetch", function (req, res) {
        console.log("came here 4");
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new Articles Today. Check back"
                });
            }
            else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                })
            }
        })
    })

    router.get("/api/headlines", function (req, res) {
        console.log("came here 1");
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        console.log("query",query);
        headlinesController.get(query, function (data) {
            res.json(data);
        })
    })

    router.delete("/api/headlines/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        })
    })

    router.patch("/api/headlines", function (req, res) {      
        headlinesController.update(req.body, function (data) {
            res.json(data);
        })
    })

    router.get("/api/notes/:headline_id?",function(req,res){
        var query={};
        if(req.params.headline_id){
            query._id=req.params.headline_id;
        }
        notesController.get(query,function(err,data){
            res.json(data);
        })
    })

    router.delete("/api/notes/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        })
    })

    router.post("/api/notes",function(req,res){
        notesController.save(req.body,function(data){
            res.json(data);
        })
    })

}




