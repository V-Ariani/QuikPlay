// Get jquery objects from DOM
var pageheader = $("#page-header")[0];
var pagecontainer = $("#page-container")[0];
var usr = $("usr");
var findmusic = $("findmusic");
var refreshbtn = $("#refreshbtn");

// Register event listeners
findmusic.on("click", function () {
    pageheader.html("Tuning it up...");
    processTime(function (time) { //this checks the extension and file
        //find a song!
        searchSong(function (time) { //here we send the API request and get the response
            changeUI(); //update web app with song!
        });
    });
});

refreshbtn.on("click", function () {
    // Load random song based on mood
    alert("You clicked the button"); //can demo with sweetAlert plugin
});

//processing input and converting for API call
function processTime(callback) {
    var time = $("usr").val();
    if (time) {
        time *= 60000; //convert user's minutes to miliseconds for SoundCloud
        callback(time);
    }
    else {
        console.log("Invalid input");
    }
}

//make API call to get song from SoundCloud
function searchSong(searchTime) {
    var chosenSong;

}

// Manipulate the DOM
function changeUI() {
    //Show detected mood
    pageheader.html("Your mood is: ...");

    //Display song refresh button
    refreshbtn.css("display", "inline");

    //Remove offset at the top
    pagecontainer.css("marginTop", "20px");
};

function searchSong(time, callback) {
    
}