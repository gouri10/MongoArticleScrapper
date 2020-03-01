$(document).ready(function () {
  // Setting a reference to the article-container div where all the dynamic content will go
  // Adding event listeners to any dynamically generated "save article"
  // and "scrape new article" buttons
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);
  $(".clear").on("click", handleArticleClear);

  function initPage() {
    // Run an AJAX request for any unsaved headlines
    $.get("/api/headlines?saved=false").then(function (data) {
      articleContainer.empty();
      // If we have headlines, render them to the page
      if (data && data.length) {
        renderArticles(data);
      } else {
        // Otherwise render a message explaining we have no articles
        renderEmpty();
      }
    });
  }

  function renderArticles() {
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel() {
    var panel =
      $([
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headLine,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"].join(""));

    panel.data("_id", article._id);

    return panel;
  }

  function renderEmpty() {
    var emptyAlert =

      $(["<div class='alert alert-warning text-center'>",
        "<h4> UH Oh, Looks like we dont have new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What would you like to do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrap-new'>Try scraping new articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"].join(""));

    articleContainer.append(emptyAlert);
  }

  function handleArticleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;

    $.ajax({
      method: "PATCH",
      url: "/api/headlines",
      data: articleToSave
    }).then(function (data) {
      if (data.ok) {
        initPage();
      }
    });

  }

  function handleArticleScrape() {
    console.log("clicked");
    $.get("/api/fetch").then(function (data) {
      initPage();
      bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
    });
  }

  function handleArticleClear() {
    $.get("api/clear").then(function () {
      articleContainer.empty();
      initPage();
    });
  }



  initPage();
});





  // function renderArticles(articles) {
  //   // This function handles appending HTML containing our article data to the page
  //   // We are passed an array of JSON containing all available articles in our database
  //   var articleCards = [];
  //   // We pass each article JSON object to the createCard function which returns a bootstrap
  //   // card with our article data inside
  //   for (var i = 0; i < articles.length; i++) {
  //     articleCards.push(createCard(articles[i]));
  //   }
  //   // Once we have all of the HTML for the articles stored in our articleCards array,
  //   // append them to the articleCards container
  //   articleContainer.append(articleCards);
  // }

  // function createCard(article) {
  //   // This function takes in a single JSON object for an article/headline
  //   // It constructs a jQuery element containing all of the formatted HTML for the
  //   // article card
  //   var card = $("<div class='card'>");
  //   var cardHeader = $("<div class='card-header'>").append(
  //     $("<h3>").append(
  //       $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
  //         .attr("href", article.link)
  //         .text(article.headLine),
  //       $("<a class='btn btn-success save'>Save Article</a>")
  //     )
  //   );

  //   var cardBody = $("<div class='card-body'>").text(article.summary);

  //   card.append(cardHeader, cardBody);
  //   // We attach the article's id to the jQuery element
  //   // We will use this when trying to figure out which article the user wants to save
  //   card.data("_id", article._id);
  //   // We return the constructed card jQuery element
  //   return card;
  // }
