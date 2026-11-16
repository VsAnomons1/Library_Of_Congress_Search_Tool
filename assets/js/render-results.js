var resultContainer = $("#result-content");
var searchBtn = $("#search-btn");
var term = $("#search-input");
var filter = $("#format-input");
var resultText = $("#result-text");
var resultText = $("#result-text");

// gets the search and format query parameter values from the url.
var search = document.location.search.split("=")[1];
var format = document.location.search.split("=")[3];
//checks for values
if(search && format){
    getSearchAndFormat(search, format);
}
else {
    getSearch(search);
}
// gets response upon the search term
function getSearch(search){
    var searchUrl = "https://www.loc.gov/search/?q=" + search + "&fo=json";
    fetch(searchUrl)
        .then(function(response){
            return response.json()
            .then(function(data){
                renderResults(data);
            })
        })
    }
// gets response upon the search term and format ex: maps, audio, newpaper
function getSearchAndFormat(search, format){
    var searchUrl = "https://www.loc.gov/"+ format + "/?q=" + search + "&fo=json";
    fetch(searchUrl)
        .then(function(response){
            return response.json()
            .then(function(data){
                renderResults(data);
            })
        })
    }
// use the response's data and create and render the list of the results
function renderResults(data){
    var results = data.results;
    var listResults = $("<ul>");
    listResults.css({"list-style-type": "none"});
    for(var i = 0; i < results.length; i++){
    // <div class="card" style="max-width: 320px;">
    // <div class="card-body">
    //     <h4 class="card-title">Example card title</h4>
    //     <p class="card-subtitle fg-3">With a card subtitle</p>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    //     <a href="#">Card link</a>
    // </div>
    // </div>
        var li = $("<li>");
        li.addClass("card col-md-10 text-primary bg-light");
        li.css({"padding": "0.5em", "border-radius": "0.5em", "margin-bottom": "1em"});
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        var title = $("<h3>");
        title.addClass("card-title");
        var date = $("<p>");
        var subTitle = $("<h5>");
        subTitle.addClass("card-subtitle fg-3");
        subTitle.text("Subject: ")
        subTitle.css({"font-weight": "bolder"});
        var subject = $("<p>");
        var descrTitle = $("<h5>");
        descrTitle.addClass("card-text");
        descrTitle.text("Description: ");
        descrTitle.css({"font-weight": "bolder"});
        var description = $("<p>");
        description.addClass("card-text");
        var link = $("<button>");
        link.addClass("btn btn-info");
        var url = $("<a>");
        url.attr("target", "_blank");
        url.addClass("text-primary");
        title.text(results[i].title);
        if(results[i].date){
        date.text("Date: " + results[i].date);
        } else {
            date.text("Date: Unknown");
        }
        if(results[i].subject && results[i].description){
            subject.text(results[i].subject);
            description.text(results[i].description);
        }
        else if(results[i].description){
            subject.text("No subject for this entry.");
            description.text(results[i].description);
        }
        else if(results[i].subject){
            subject.text(results[i].subject);
            description.text("No description for this entry.");
        }
        else {
            subject.text("No subject for this entry.");
            description.text("No description for this entry.");
        }
        url.text("Read More");
        url.attr("href", results[i].url);
        link.append(url);
        cardBody.append(title);
        cardBody.append(date);
        cardBody.append(subTitle);
        cardBody.append(subject);
        cardBody.append(descrTitle);
        cardBody.append(description);
        cardBody.append(link);
        li.append(cardBody);
        listResults.append(li);
    }
    resultContainer.append(listResults);
}
// retrieve a new response and renders the new search term
searchBtn.on("click", function(e){
    e.preventDefault();
    var termVal = term.val();
    var formatVal = filter.val();
    console.log(termVal);
    console.log(formatVal);
    if(termVal && formatVal){
        resultContainer.text("");
        getSearchAndFormat(termVal, formatVal);
    }
    else if(termVal){
        resultContainer.text("");
        getSearch(termVal);
    }
});
