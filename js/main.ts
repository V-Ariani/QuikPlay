declare var SC:any; // Magic - tells that there is some variable SC out there (SC is from the SoundCloud script file)
//Get elements from DOM
var pageheader = $("#page-header")[0];
var pagecontainer = $("#page-container")[0];
var usr = $("usr");
var findmusic = $("findmusic");
var refreshbtn = $("#refreshbtn")[0];

// Register event listeners
findmusic.on("click", function () {
    pageheader.innerHTML = ("Tuning it up...");
    processTime(function (time) { //this checks the extension and file
        //find a song!
        searchSong(function (time) { //here we send the API request and get the response
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
function changeUI() : void {
    //Show time inputted
    pageheader.innerHTML = ("Your free time is: ...");

    //Display song refresh button
    refreshbtn.style.display = "inline";

    //Remove offset at the top
    pagecontainer.style.marginTop = "20px";
};

//make API call to get song from SoundCloud
function searchSong(time, callback) {
    
}

// Section of code that handles the music and soundcloud

//A Song class which has the song's name and URL on soundcloud
class Song {
    title: string;
    url: string;
    constructor(songtitle : string, songurl : string) {
        this.title = songtitle;
        this.url = songurl;
    }
}

var myClientId = "0f843a58b3bcaf48ec1ebfbf087043cc";

function initSC() : void {
    // init SoundCloud
    SC.initialize({
        client_id: myClientId
    });
}

function loadPlayer(trackurl : string) : void {
    SC.oEmbed(trackurl, { auto_play: true }).then(function (oEmbed) {
        var div = $("#musicplayer")[0]; 
        div.innerHTML = oEmbed.html; // puts the soundcloud player inside the musicplayer div
    });
}

// init soundcloud
initSC();