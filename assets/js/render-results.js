var resultContainer = $("#result-content");
var searchBtn = $("#search-btn");
var term = $("#search-input");
var filter = $("#format-input");
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
    for(var i = 0; i < results.length; i++){
        var li = $("<li>");
        li.addClass("text-primary bg-light");
        li.css({"padding": "0.5em", "border-radius": "0.5em", "margin-bottom": "1em"});
        var title = $("<h2>");
        var date = $("<p>");
        var subTitle = $("<h5>");
        subTitle.text("Subject: ")
        subTitle.css({"font-weight": "bolder"});
        var subject = $("<p>");
        var descrTitle = $("<h5>");
        descrTitle.text("Description: ");
        descrTitle.css({"font-weight": "bolder"});
        var description = $("<p>");
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
        li.append(title);
        li.append(date);
        li.append(subTitle);
        li.append(subject);
        li.append(descrTitle);
        li.append(description);
        li.append(link);
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
