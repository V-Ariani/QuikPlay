//Get elements from DOM
var pageheader = $("#page-header")[0];
var pagecontainer = $("#page-container")[0];
var usr = $("usr");
var findmusic = $("findmusic");
var refreshbtn = $("#refreshbtn")[0];
// Register event listeners
findmusic.on("click", function () {
    pageheader.innerHTML = ("Tuning it up...");
    processTime(function (time) {
        //find a song!
        searchSong(function (time) {
            changeUI(); //update web app with song!
        });
    });
});
refreshbtn.addEventListener("click", function () {
    // TODO: redirect back to home page
    alert("Back home please!"); //can demo with sweetAlert plugin
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
// Manipulate the DOM
function changeUI() {
    //Show time inputted
    pageheader.innerHTML = ("Your free time is: ...");
    //Display song refresh button
    refreshbtn.style.display = "inline";
    //Remove offset at the top
    pagecontainer.style.marginTop = "20px";
}
;
//make API call to get song from SoundCloud
function searchSong(time, callback) {
}
