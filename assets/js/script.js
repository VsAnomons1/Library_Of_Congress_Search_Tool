var searchBtn = $(".btn");
var searchTerm = $("#search-input");
var options = $("#format-input");
// takes search term and filter values on to the url
searchBtn.on("click", function(e){
    var search = searchTerm.val();
    var filter = options.val();
    if(search && filter){
        document.location.replace(`././search-results.html?search=${search}=format=${filter}`);
    }
    else if(search){
        document.location.replace(`././search-results.html?search=${search}`);
    }
})
