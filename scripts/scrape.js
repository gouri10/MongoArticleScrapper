//Require request and cheerios , making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
	console.log("came here 5");
	axios.get("http://www.nytimes.com/").then(function(response){
	
	var $ = cheerio.load(response.data);
	var articles = [];

	$(".theme-summary").each(function(i,element){
		var head = $(this).children(".story-heading").text().trim();
		var sum= $(this).children(".summary").text().trim();

		if(head && sum){
			var headNeat=head.replace(/(\r\n|\n|\r|\t|\s+)/gm,"").trim()
			var sumNeat=head.replace(/(\r\n|\n|\r|\t|\s+)/gm,"").trim()

			var dataToAdd={
					headline: headNeat,
					summary:sumNeat
				};
			articles.push(dataToAdd);
			}
		});
		cb(articles);
	})
	

}
	
	module.exports = scrape;

