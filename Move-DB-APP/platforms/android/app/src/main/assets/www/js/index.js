$("#ClearfromList").hide(); //hides popup
$("#CleactActivites").hide();//hides popup
$("#ClearALL").hide();//hides popup
$("#ClearALLHistory").hide();//hides popup

//This function locates the current location in the browser, waits and then changes the location 
/*if (window.location.hash === "" || window.location.hash === "#faidoutPage" || window.location.hash === "#") {
    setTimeout(() => {
        $(location).attr('href', '#mainPage');
        $("#faidoutPage").remove();
    }, 5000);
} else {
    setTimeout(() => {
        $(location).attr('href', '#mainPage');
        $("#faidoutPage").remove();
    }, 5000);

}*/

var inject,
    all,
    num;

var count = localStorage.getItem("count"); // Stores the item count

if (count === null) { // checks if the item counts has any value, if not, gives it value
    count = 0;
    localStorage.setItem("count", count);
    document.getElementById("itemsInList").innerHTML = localStorage.getItem("count");
    document.getElementById("totalCount").innerHTML = "<b>Total Items in yout List:</b> " + localStorage.getItem("count");

} else {
    document.getElementById("itemsInList").innerHTML = localStorage.getItem("count");
    document.getElementById("totalCount").innerHTML = "<b>Total Items in yout List:</b> " + localStorage.getItem("count");
}
var countSearch = localStorage.getItem("Scount"); // checks if the search count has any value, if not, gives it value
if (countSearch === null) {
    countSearch = 0;
    localStorage.setItem("Scount", countSearch);
    document.getElementById("totalsearches").innerHTML = "<b>Total Searches:<b> " + localStorage.getItem("Scount");
} else {
    document.getElementById("totalsearches").innerHTML = "<b>Total Searches:<b> " + localStorage.getItem("Scount");
}

$(document).ready(function () { // this function makes it sure that the page is ready before anyone can use the panels in the upp er corners

    //for loop that injects all list times in the personal list into the HTML file
    for (let i = 0; i <= localStorage.length; i++) {
        if (localStorage.key(i) !== "count" && localStorage.key(i) !== "PreAct" && localStorage.key(i) !== "PrevActList" && localStorage.key(i) !== "lastDelete" && localStorage.key(i) !== "Scount" && localStorage.key(i) !== "History") {
            var memory = localStorage.getItem(localStorage.key(i));
            $('.movieList').append(memory);
        }
    }
    setTimeout(function () { // refreshes the personal list making it render properly 
        $('#peronalList').listview("refresh");
    }, 70)
});

// API search parameters
var searchBySeries = "s";
var searchByTitle = "t";
var searchByID = "i";
var type = "";
// asynchronous function to call the API and resolve a promise.
async function getMovie(request, search, year, page) { // parameters for the API used depending on search request.
    const key = "237f1e2a"; // the API key to be able to fetch data.
    let getThisMovie;

    if (year >= 1850) {
        getThisMovie = `https://www.omdbapi.com/?${request}=${search}&y=${year}&plot=fullt&apikey=${key}`; // the URL to fech data. depending on the action what parameters will be used
    } else {
        getThisMovie = `https://www.omdbapi.com/?${request}=${search}&page=${page}&plot=full&type=${type}&apikey=${key}`;
    }
    try {
        const results = await fetch(getThisMovie); // fetching data from the omdbapi API
        data = await results.json(); // wrapes the promise into JSON
        return data; // retuns the data
    } catch (error) { // catches errors
        alert(error);
    }
}

// This function fetches  poster data to display on the main page.
function getMainMoviePoster(MovieOfDay) {

    getMovie(searchByTitle, MovieOfDay, 0).then(data => {
        // calling the API function by searching for a movie title using the parameter from this function


        document.getElementById("TempID").id = data.imdbID;
        document.getElementById("frontPageAdd").innerHTML = "Add " + data.Title + "To MY List";
        document.getElementById("frontPageAdd").id = data.imdbID;
        let moviePost = document.querySelector(".mainImg");
        moviePost.src = data.Poster // instering the data into the HTML file
    });
}
// creating variables from the local storage
var preActivity = localStorage.getItem("PreAct");
var preListSearh = localStorage.getItem("PrevActList");
var preDelete = localStorage.getItem("lastDelete");

// checks if the variables have any value, if not, give them values
if (preActivity === null) {
    document.getElementById("lastSearch").innerHTML = "<b>Last Search:</b>";
} else {
    document.getElementById("lastSearch").innerHTML = "<b>Last Search:</b> <br> " + localStorage.getItem("PreAct");
}

if (preListSearh === null) {
    document.getElementById("latestList").innerHTML = "<b>Last Item Added To List:</b>";
} else {
    document.getElementById("latestList").innerHTML = "<b>Last Item Added To List:</b> <br> " + localStorage.getItem("PrevActList");
}

if (preDelete === null) {
    document.getElementById("latesDelet").innerHTML = "<b>Last Item Deleted From List:</b>";
} else {
    document.getElementById("latesDelet").innerHTML = "<b>Last Item Deleted From List:</b> <br> " + localStorage.getItem("lastDelete");
}

let movies = [ // String array containing movie titles for the main page
    'Star Wars',
    'Bond',
    'Shrek',
    'Rocky',
    'Die Hard',
    'This',
    'Not',
    'i',
    'joker',
    'Jones',
    'low',
    'man',
    "Spider man: far from home",
    'number',
    "Wonder woman 1984",
    'order',
    'some',
    'Rambo',
    'Han',
    'time',
    'under',
    'turtles',
    'When',
    'Alien',
    'Mars',
    "halloween",
    "Jaws",
    "Mortal Kombat",
    "Mother",
    "Kill",
    "John",
    "Space",
    "Scream"
];

var date = new Date(); // new date object created
date = date.getDate();
getMainMoviePoster(movies[date]); // the movie title array used as an parameter with the date object as an index

function searchMovie(page) { // the main function for searching for movies, Tv Shows or video games. The parameter has an int value depening on the page

    let year = 0;
    let newFilerArray = [];
    let searchInput = document.getElementById("seachInput").value;

    searchInput = searchInput.trim(); // deletes any empty spaces at the end of the String
    localStorage.setItem("PreAct", searchInput); // Stores the search String into local storage
    document.getElementById("lastSearch").innerHTML = "<b>Last Search:</b> <br> " + localStorage.getItem("PreAct"); // injects the value into the HTML file

    let movieFilter = document.getElementById("movieFilter") // variable equal to the movie filter 
    let serieFilter = document.getElementById("serieFilter")// variable equal to the series filter 
    let gameFilter = document.getElementById("gameFilter")// variable equal to the video game filter 
    const yearFilter = document.getElementById("yearFilter").value; // takes the value from the year filter 
    if (yearFilter != 0 || yearFilter != "year") { // checks if the is any value in the year filter
        year = yearFilter;
    }

    // creates an array 
    let filterArray = [movieFilter, serieFilter, gameFilter]; // array containing each id from the filters on the search page
    for (let i = 0; i < filterArray.length; i++) {
        if (filterArray[i].checked === true) { // checking if the filter is on
            newFilerArray[i] = filterArray[i].value;
            filterArray[i] = filterArray[i].checked // creating a new array with fitler that are active
        }
    }

    getMovie(searchBySeries, searchInput, year, page).then(data => { // calls the API function using the search parameter

        if (data.totalResults !== undefined) { // cheking 
            document.getElementById("results").style = " padding: 10px; text-align: center; border: 1px solid;  border-color:rgb(53, 52, 52); background:rgb(41, 41, 41); border-radius: 5px;"
            document.getElementById("results").innerHTML = searchInput + ": " + data.totalResults + " results"
        }

        if (data.Response === "False") { // if the API does not find anything
            //clear the search results
            document.getElementById("searchContainor").innerHTML = "";
            document.getElementById("searchContainor").innerHTML = `<div class= "SearchImg-Text">` + `</div>`; // inject the silly goose
            $('.SearchImg-Text').prepend(`<img class= "sillyImg"  src=${"sillygoose.png"} />`);
            $('.SearchImg-Text').prepend(`<h4
       class = "sillyText">` + "whoops! <br> I didn't catch that!<br>  Either the movie does not exist or you are a silly goose!" + "</h4>");
        }

        try { // try to inject data to the HTML file

            $.each(data.Search, function (index, value) { // goes through each object that the API returns
                if (filterArray.includes(true)) { // if any filters are active
                    if (value.Poster && value.Poster != "N/A") {
                        if (newFilerArray.includes(value.Type)) { // checking the the type of the API results matches the filter
                            $('.SearchImg-Text').append(htmlText(value)); // injecting the results into the HTML file
                            $(document).ready(function () {
                                $("#list1 ul").append(htmlTextList(value));
                            });
                        }
                    }
                } else { // if there are not filters active
                    if (value.Poster && value.Poster != "N/A") { // making sure that no results that does not contain a poster gets through
                        $('.SearchImg-Text').append(htmlText(value)); // injecting the results into the HTML file
                        $(document).ready(function () {
                            $("#list1 ul").append(htmlTextList(value));

                        });
                    }
                }
            });

            let maxPages = 40;
            let totRes = data.totalResults; // setting the variable to int value total results from the API
            totRes = Math.floor(totRes / 10); // deviding totRes with 10

            if (page < totRes && page < maxPages) { // recursion if the page coming through the function parameter is less than totRes and MaxPages
                page++;
                searchMovie(page);
            }

            function htmlText(value) {

                let ifExist = document.getElementById(value.imdbID + "thisB") // getting an id from a item in the personal list
                let plusOrCheck = "fire ui-btn ui-icon-plus ui-btn-icon-right"
                if (ifExist) { // if the ID exist 
                    plusOrCheck = "fire ui-btn ui-icon-check ui-btn-icon-left" // change the icon in the add to list button
                } else {// if it does not exist
                    plusOrCheck = "fire ui-btn ui-icon-plus ui-btn-icon-right" // stay the same
                }

                // a variable containg HTML code that get injected into the HTML file when searching
                inject = ` 
               <li class ="SearchLI">  <div class="searchOutputCard" style ="padding-bottom: 20px; ">
      <div> 
       <div 15px; class = "movieSearch" id = "${
                    value.imdbID
                    }card">  </6>
      <div class = "ImgSearch">
      <div id="SearchTitleMain">
      <h4 style="text-align: center;">${
                    value.Title
                    } </h4>
    </div> <img id = "posterSearch" src= ${
                    value.Poster
                    }> 
     <div class ="searchMovieText"> 
                      </div>
                </div>  
           </div>
      <div class ="addtoListButton ">
        <button id = "${
                    value.imdbID
                    }" data-role="popup"style="margin-bottom: -30px;"  class="${plusOrCheck}">Add ${
                    value.Title
                    } To My List</button>  
        </div >
         <button style="margin-bottom: 0.1px;" class="ui-btn ui-icon-arrow-r ui-btn-icon-right"> <a href="#infoPage" data-transition="slideup"  data-rel="dialog" class = "moreInfoAboutMovie" id = "${
                    value.imdbID
                    }1" style="color: white; text-decoration:none; "> ${
                    whatType() // gets what kind of type the results are: movie, tv show or a video game
                    }</a> </button>
             </div>
          </div>
      </li>
      `
                function whatType() { // returns what kind of type the results are
                    let outPutText = "";
                    if (value.Type === "movie") {
                        outPutText = "More Info About This Movie"
                    } else if (value.Type === "series") {
                        outPutText = "More Info About This Show"
                    } else if (value.Type === "game") {
                        outPutText = "More Info About This Game"
                    } else {
                        outPutText = "More Info About Movie"
                    }
                    return outPutText; // returns the String
                }
                return inject; // returns the HTML code
            }
            function htmlTextList(value) {

                let inject = `<li class = "mInfoAboutMovie" id = "${
                    value.imdbID
                    }" ><a href="#infoPage">${
                    value.Title
                    }</a></li>`
                return inject;
            }
        } catch (error) { // if an error occurs the silly goose showes up
            if (searchInput === "") {
                document.getElementById("searchContainor").innerHTML = "";
                document.getElementById("searchContainor").innerHTML = `<div class= "SearchImg-Text" > ` + `</div > `;
                $('.SearchImg-Text').prepend(`<img class= "sillyImg"  src = ${"sillygoose.png"} />`);
                $('.SearchImg-Text').prepend(`<h4
   class = "sillyText">` + "You need to write in the search box you silly goose..." + "</h4>");
            }
        };
    });
}

// clears the search input and search filters
function clearDiv() {
    document.getElementById("searchContainor").innerHTML = "";
    document.getElementById("searchContainor").innerHTML = `<div class= "SearchImg-Text">` + `</div>`;
}

$(document).on("click", ".fire", function (e) { // on click function when a item gets added to the list
    vibration(); // function that turins on the vibrator on the phone when an item gets added
    function vibration() {
        var time = 100;
        navigator.vibrate(time);
    }
})
$(document).on("click", ".moreInfoAboutMovie", function (e) { // activades when the more info button is pushed
    let movieID;
    movieID = e.target.id.slice(0, 9);
    const plot = "full";
    getMovie(searchByID, movieID, plot).then(data => {
        Object.keys(data).forEach(function (item) {
            if (data[item] === "N/A") {
                data[item] = "Not Available"
            }
        });
        // splits up strings that were to long
        let actors = data.Actors.split(",");
        let director = data.Director.split(",");
        let genre = data.Genre.split(",");
        let language = data.Language.split(",");
        let writers = data.Writer.split(",");
        let plot = data.Plot;
        let awards = data.Awards.split(". ");

        chunk = function (ary, len) { // creates chuncks from the plot to make it fit better
            var i = 0,
                res = [];
            for (var i = 0; i < ary.length; i += len)
                res.push(ary.slice(i, i + len));



            return res;
        }
        let arrayPlot = chunk(plot.split(/\s+/), 10);



        /********** injects the data into the popup information window********* */
        for (let i = 0; i < arrayPlot.length; i++) {
            arrayPlot[i] = arrayPlot[i].join(" ");
        }

        let infoPoster = document.querySelector(".InfoPoster");
        infoPoster.src = data.Poster;

        document.getElementById("movieInfoHeader").innerHTML = "<p>" + data.Title + "</p>";
        document.getElementById("infoTitle").innerHTML = "<b>Title</b>: " + data.Title;
        document.getElementById("infoYear").innerHTML = "<b>Year</b>: " + data.Year;
        document.getElementById("infoReleased").innerHTML = "<b>Release date:</b> " + data.Released;
        document.getElementById("infoRuntime").innerHTML = "<b>Runtime:</b> " + data.Runtime;

        for (let i = actors.length - 1; i >= 0; i--) {
            $('#allActers').prepend(`<li class="actorsName" >${
                actors[i]
                }</li> `);
        }
        for (let i = director.length - 1; i >= 0; i--) {
            $('#dicetorIfno').prepend(`<li class="actorsName" >${
                director[i]
                }</li> `);
        }

        document.getElementById("infoRatings").innerHTML;
        if (data.Ratings.length > 0) {
            document.getElementById("infoIMDB-Raiting").innerHTML = data.Ratings[0].Source + ": " + data.Ratings[0].Value;
        }
        if (data.Ratings.length > 1) {
            document.getElementById("infoRotten-Tomatop-Raiting").innerHTML = data.Ratings[1].Source + ": " + data.Ratings[1].Value;
        }
        if (data.Ratings.length > 2) {
            document.getElementById("infoMetacritic-Raiting").innerHTML = data.Ratings[2].Source + ": " + data.Ratings[2].Value;
        }

        if (awards.length > 1) {
            for (let i = awards.length - 1; i >= 0; i--) {
                $('#awardInfo').prepend(`<li class="awards" >${
                    awards[i]
                    }</li> `);
            }
        } else {
            $('#awardInfo').prepend(`<li class="awards" >${awards}</li> `);
        }
        document.getElementById("BoxOffice").innerHTML = "<b>Box office</b> " + data.BoxOffice
        document.getElementById("infoCountry").innerHTML = "<b>Country:</b> " + data.Country;
        if (genre.length > 1) {
            for (let i = genre.length - 1; i >= 0; i--) {
                $('#genreInfo').prepend(`<li class="genreInfo" >${
                    genre[i]
                    }</li> `);
            }
        } else {
            document.getElementById("genreInfo").innerHTML = data.Genre;
        }
        $('#fullPlotInfo').prepend(`<li class="PlotInfo" >${
            data.Plot
            }</li> `);

        document.getElementById("infoMetascore").innerHTML = "<b>Metascore:</b> " + data.Metascore;

        for (let i = language.length - 1; i >= 0; i--) {

            $('#languageInfo').prepend(`<li class="language" >${
                language[i]
                }</li> `);
        }
        document.getElementById("infoRated").innerHTML = "<b>Rated:</b> " + data.Rated;
        for (let i = writers.length - 1; i >= 0; i--) {
            $('#writerInfo').prepend(`<li class="writers" >${
                writers[i]
                }</li> `);
        }
        document.getElementById("infoimdbVotes").innerHTML = "I<b>MDB Votes:</b> " + data.imdbVotes;
        if (data.Type === "series") {
            document.getElementById("infototalSeasons").innerHTML = "<b>Total Seasons:</b> " + data.totalSeasons;
        }
    })


    $(document).on('click', ".ui-icon-delete", function (e) { // this function clears the inner html of the popup info

        document.getElementById("infoTitle").innerHTML = "";
        document.getElementById("infoYear").innerHTML = "";
        document.getElementById("infoReleased").innerHTML = "";
        document.getElementById("infoRuntime").innerHTML = "";
        document.getElementById("infoRatings").innerHTML;
        document.getElementById("infoIMDB-Raiting").innerHTML = "";
        document.getElementById("infoRotten-Tomatop-Raiting").innerHTML = "";
        document.getElementById("infoMetacritic-Raiting").innerHTML = "";
        document.getElementById("infoCountry").innerHTML = "";
        document.getElementById("infoMetascore").innerHTML = "";
        document.getElementById("infoRated").innerHTML = "";
        document.getElementById("infoimdbVotes").innerHTML = "";
        document.getElementById("infototalSeasons").innerHTML = "";
        document.getElementById("fullPlotInfo").innerHTML = "";
        $("#fullPlotInfo").empty();
        $("#writerInfo").empty();
        $("#languageInfo").empty();
        $("#genreInfo").empty();
        $("#dicetorIfno").empty();
        $("#allActers").empty();
        $("#awardInfo").empty();

    });
});

// list page
$(document).on('click', ".fire", function (e) { // function that adds a item to the list and local storage from the search page
    const movieID = e.target.id // extracts the ID from the movie
    const plot = "full"; // setting the plott to full;
    getMovie(searchByID, movieID, plot).then(data => { // calling the API
        if (document.getElementById(e.target.id).className === "fire ui-btn ui-icon-check ui-btn-icon-left") { // if the add to list button has the check icon
            if (localStorage.getItem("count") <= 0) { // if local storage count is less or the same as zero
                document.getElementById("itemsInList").innerHTML = 0;
                localStorage.setItem("count", 0);
            } else {
                count--; // decrease the count;
                localStorage.setItem("count", count);
                document.getElementById("itemsInList").innerHTML = localStorage.getItem("count");
                document.getElementById("totalCount").innerHTML = "<b>Total Items in yout List:</b> " + localStorage.getItem("count");
            }
            localStorage.removeItem(data.Title); // deletes the item from local storage
            let del = e.target.id + "thisB"
            $(`#${del}`).remove(); // delete the item from the list
            // deleteItemFromList(del);
        } else { // else if the icon is a gear
            count++; // increase the count by 1

            localStorage.setItem("count", count);
            document.getElementById("itemsInList").innerHTML = localStorage.getItem("count");
            document.getElementById("totalCount").innerHTML = "<b>Total Items in yout List:</b> " + localStorage.getItem("count");
            localStorage.setItem("PrevActList", data.Title);
            document.getElementById("latestList").innerHTML = "<b>Last Movie Added To List:</b> </br> " + localStorage.getItem("PrevActList");
            var list,
                temp;
            let movieData = {
                Poster: data.Poster,
                Title: data.Title,
                ID: data.imdbID,
                Rating: data.imdbRating,
                Runtime: data.Runtime
            }
            temp = `<li id=${ // create a variable that contains the HTML code for the list item
                movieData.ID + "thisB"
                } class="xsa">
    <a href="#infoPage" class ="moreInfoAboutMovie" id=${
                data.imdbID
                }1> 
    <img class="listPoster" id=${
                data.imdbID
                } src= ${
                movieData.Poster
                } style = "width: auto;"/> <h4 id=${
                movieData.ID
                }>${
                movieData.Title
                }</h4> <p id=${
                movieData.ID
                } style="margin-bottom = -20px;">Rating: ${
                movieData.Rating
                }  &nbsp &nbsp   Runtime: ${
                movieData.Runtime
                }</p> </a>
    <a href= "#"  data-rel="popup" data-position-to="window" data-transition="pop" class=" a deleteThisElementList ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-delete ui-btn-icon-left ui-btn-b" id=${
                movieData.ID + "this"
                } data-transition="slideup"></a>

    </li>  `
            $('.movieList').prepend(temp); // inject the item into the HTML code
            setTimeout(function () {
                $('#peronalList').listview("refresh"); // refresh the list so it renders
            }, 20)

            localStorage.setItem(movieData.Title, temp) // store the item in local storage with the key value of the title

            title = data.Title;
        }
    });
});

var value;
/**********************************************************************************************************************************************/

$(document).on('click', ".a", function (e) { // Function for deleting an item from the list from the list page.
    let del = "";
    let mid = "";
    mid = e.target.id.slice(0, 9);
    del = document.getElementById(e.target.id).id + "B";
    getMovie(searchByID, mid, 0).then(data => { // calls the API
        $("#popupDialog").popup(); // gets the pop up ready
        document.getElementById("PopUpDelete").innerHTML = "Are you sure you want to delete <br>" + data.Title;
        +"from your list?" // inject html code into the popup window with the title of the item
        $("#popupDialog").popup("open"); // opens up the popup window 
        $('.deleteButton').unbind().click(function () { // the delete buttons
            $('#peronalList').listview("refresh");
            let value = $(this).val(); // stores the value of the buttons
            if (value === "yes") {// if the value is "yes"
                document.getElementById(mid).className = "fire ui-btn ui-icon-plus ui-btn-icon-right";
                //update local storage
                if (localStorage.getItem("count") <= 0) {
                    document.getElementById("itemsInList").innerHTML = 0;
                    localStorage.setItem("count", 0);
                } else {
                    count--;
                    localStorage.setItem("count", count);
                    document.getElementById("itemsInList").innerHTML = localStorage.getItem("count");
                    document.getElementById("totalCount").innerHTML = "<b>Total Items in yout List:</b>" + localStorage.getItem("count");
                }
                $("#popupDialog").popup("close"); // close the popup window
                localStorage.removeItem(data.Title); // remove the item from local storage

                $(`#${mid}thisB`).remove(); // delete the item from the list

                setTimeout(function () {
                    $('#peronalList').listview("refresh"); // refresh the list
                }, 20)

                // deleteItemFromList(del);

                localStorage.setItem("lastDelete", data.Title);
                document.getElementById("latesDelet").innerHTML = "<b>Last Movie Deleted From List:</b> <br> " + localStorage.getItem("lastDelete");

                vale = "";
            } else {
                vale = "";
                $("#popupDialog").popup("close");
            }
        });
    });
});

$(document).on("click", ".fire", function (e) { // function that updates the search results if an item get's deleted from list page
    getMovie(searchByID, e.target.id, 0).then(data => { // calls the API

        if (document.getElementById(e.target.id).className === "fire ui-btn ui-icon-check ui-btn-icon-left") { // removeFromList(e.target.id, data.Title);
            if (document.getElementById(e.target.id).className !== null) {
                removeFromList(e.target.id, data.Title);
            }
        } else {
            document.getElementById(e.target.id).className = `fire ui-btn ui-icon-check ui-btn-icon-left`
            document.getElementById(e.target.id).innerHTML = "On My List";
        }
    });
});
var temp;
function removeFromList(id, Title) {
    document.getElementById(id).className = "fire ui-btn ui-icon-plus ui-btn-icon-right"
    document.getElementById(id).innerHTML = `Add ${Title} To My List`;
}


$("#itemsInList").click(function () { // function popups how many items you have in your list
    let item = "";
    if (localStorage.getItem("count") != 1) {
        item = "Items"
    } else {
        item = "Item";
    }
    document.getElementById("countPopUp").innerHTML = `You Have ${
        localStorage.getItem("count")
        } ${item} In Your List `;
    $("#positionSelector").popup();

    $("#positionSelector").popup("open");
    setTimeout(function () {
        $("#positionSelector").popup("close");
    }, 2000);

});
$("#searchButton").click(function () { // function that updates total searches eachtime the search buttons is pushed
    countSearch++
    localStorage.setItem("Scount", countSearch);
    document.getElementById("totalsearches").innerHTML = "<b>Total Searches:<b> " + localStorage.getItem("Scount");
});
$(".ClearList").click(function () { // this function clears the whole list
    $("#ClearfromList").popup(); // gets the popup ready
    $("#ClearfromList").show(); // stops hiding the popup
    $("#ClearfromList").popup("open"); // opens up the popup
    $(".deleteList").unbind().click(function () {
        let value = $(this).val(); // checks the value of the popup buttons

        if (value === "yes") { // if the value is yes
            $("#ClearfromList").popup("close"); // close popup
            $("#ClearfromList").hide(); // hide the popup
            var k = 0;
            while (localStorage.length > 5 || k < 300) { // deletes every list item in the list
                k++;
                for (let i = 0; i < localStorage.length; i++) {
                    if (localStorage.getItem(localStorage.key(i)).length !== null && localStorage.getItem(localStorage.key(i)).length > 20) {
                        localStorage.removeItem(localStorage.key(i));
                    }
                }
            }
            // updates the list count
            count = 0;
            localStorage.setItem("count", count);
            document.getElementById("itemsInList").innerHTML = localStorage.getItem("count");
            document.getElementById("totalCount").innerHTML = "<b>Total Items in yout List:</b> " + localStorage.getItem("count");
            document.getElementById("peronalList").innerHTML = ""
        } else { // else do nothing 
            $("#ClearfromList").popup("close");
            $("#ClearfromList").hide();
        }
    });
});

$(".Clearhistory").click(function () { // this functions clears the history
    $("#CleactActivites").popup();
    $("#CleactActivites").show();
    $("#CleactActivites").popup("open");
    $(".deleteList1").click(function () {
        let value = $(this).val(); // checks the value 
        if (value === "yes") {
            $("#CleactActivites").popup("close");
            $("#CleactActivites").hide();
            localStorage.removeItem("Scount")
            localStorage.removeItem("PrevActList")
            localStorage.removeItem("lastDelete")
            localStorage.removeItem("PreAct")
            document.getElementById("totalsearches").innerHTML = "<b>Total Searches:<b> " + 0;
            document.getElementById("lastSearch").innerHTML = "<b>Last Search:</b>";
            document.getElementById("latestList").innerHTML = "<b>Last Movie Added To List:</b>";
            document.getElementById("latesDelet").innerHTML = "<b>Last Movie Deleted From List:</b>";

        } else {
            $("#CleactActivites").popup("close");
            $("#CleactActivites").hide();
        }
    });
});
$(".ClearItemCount").click(function () { // this function clears the total searches 
    $("#ClearALL").popup();
    $("#ClearALL").show();
    $("#ClearALL").popup("open");
    $(".deleteList2").click(function () {
        let value = $(this).val();
        if (value === "yes") {
            $("#ClearALL").popup("close");
            $("#ClearALL").hide();
            localStorage.clear();
            document.getElementById("totalsearches").innerHTML = "<b>Total Searches:<b> " + 0
            document.getElementById("lastSearch").innerHTML = "<b>Last Search:</b>";
            document.getElementById("latestList").innerHTML = "<b>Last Movie Added To List:</b>";
            document.getElementById("latesDelet").innerHTML = "<b>Last Movie Deleted From List:</b>";
            count = 0;
            localStorage.setItem("count", count);
            document.getElementById("itemsInList").innerHTML = localStorage.getItem("count");
            document.getElementById("totalCount").innerHTML = "<b>Total Items in yout List:</b> " + localStorage.getItem("count");
            document.getElementById("peronalList").innerHTML = ""
            document.getElementById(`historyList`).innerHTML = "";
            document.getElementById(`historyList`).innerHTML = `<li id="noHistory" style=" text-align: center; ">You Have No History! </li>`;
            $('#historyList').listview("refresh");
        } else {
            $("#ClearALL").popup("close");
            $("#ClearALL").hide();
        }
    });
});

$(".ClearAllhistory").click(function () { // this function clears the whole application
    $("#ClearALLHistory").popup();
    $("#ClearALLHistory").show();
    $("#ClearALLHistory").popup("open");
    $(".deleteList3").click(function () {
        let value = $(this).val();
        if (value === "yes") {
            $("#ClearALLHistory").popup("close");
            $("#ClearALLHistory").hide();
            localStorage.removeItem("PreAct");
            localStorage.removeItem("History");
            document.getElementById(`historyList`).innerHTML = "";
            document.getElementById(`historyList`).innerHTML = `<li id="noHistory" style=" text-align: center; ">You Have No History! </li>`;
            $('#historyList').listview("refresh");
            document.getElementById("lastSearch").innerHTML = "<b>Last Search:</b>";
        } else {
            $("#ClearALLHistory").popup("close");
            $("#ClearALLHistory").hide();
        }
    });
});

const history = () => { // this function creates the history and stores it 
    let searchInput = document.getElementById("seachInput").value;
    let date = new Date();
    let clock = new Date();
    date = date.getDate() + '-' + (
        date.getMonth() + 1
    ) + '-' + date.getFullYear();
    clock = "  at " + clock.getHours() + ":" + (
        clock.getMinutes()
    );
    let historySearch = localStorage.getItem("PreAct");
    if (historySearch === null) {
        $('#historyList').listview("refresh");
    } else {
        let tempHis = ` <li class="date"><b>Title:</b> ${historySearch} <br> <b>Date:</b> ${date}${clock} </li>`
        $(`#historyList`).prepend(tempHis)
        if (localStorage.getItem("History") === null) {
            localStorage.setItem("History", tempHis);
            document.getElementById("noHistory").innerHTML = "";
            $('#historyList').listview("refresh");
        } else {
            localStorage.setItem("History", localStorage.getItem("History") + "," + tempHis);
            document.getElementById("noHistory").innerHTML = "";
            $('#historyList').listview("refresh");
        }

        $('#historyList').listview("refresh");
    }
    $('#historyList').listview("refresh");
}

const insjectHistory = () => { // this function inject the data into the HTML file.
    var history = [];
    $(`#historyList`).prepend(` <li id="noHistory" style="text-align: center;">You Have No History! </li>`)
    if (localStorage.getItem("History") === null) { } else {
        $("#noHistory").remove();
        history = localStorage.getItem("History").split(",");

        for (let i = 0; i < history.length; i++) {
            $(`#historyList`).prepend(history[i]);
        }
        $('#historyList').listview("refresh");
    }
}
insjectHistory(); // calls the inject history method 
