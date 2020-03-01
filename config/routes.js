
var headlinesController=require("../controllers/headLinesController")
var notesController=require("../controllers/notesController")

module.exports=function(router){

    router.get("/",function(req,res){
        res.render("home");
    })

    router.get("/saved",function(req,res){
        res.render("saved");
    })

    router.get("/api/fetch",function(req,res){
        headlinesController.fetch(function(err,docs){
            if(!docs||docs.insertedCount===0){
                res.json({
                    message:"No new Articles Today. Check back"
                });
            }
            else{
                res.json({
                    message:"Added "+docs.insertedCount + " new articles!"
                })
            }
        })
    })
}
