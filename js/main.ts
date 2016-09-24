declare var SC:any; // Magic - tells that there is some variable SC out there (SC is from the SoundCloud script file)

var TimetoListen: Duration;

//Get elements from DOM
var pageheader = $("#page-header")[0];
var pagecontainer = $("#page-container")[0];

var question = $("#question")[0];
var usr : HTMLInputElement = <HTMLInputElement> $("#usr")[0];
var findmusic = $("#findmusic")[0];
var refreshbtn = $("#refreshbtn")[0];
var fbsharebutton = $("#fb-share-button")[0];

// Register event listeners
findmusic.addEventListener("click", function () {
    pageheader.innerHTML = ("Tuning it up...");
    processTime(function (time) { //process user input to check for correct types
        TimetoListen = getTypeDuration(time) //get the type of duration for finding song!
        changeUI(); //update web app with song!
        loadSong(TimetoListen); //load song according to the duration
    });
});

//processing input and converting for API call
function processTime(callback) {
    var time = $("#usr").val();
    if (isNaN(time)) {
        if (time.toString() == "e" || time.toString() == "." || time.toString() == "E") {
            console.log("Invalid input");
            pageheader.innerHTML = "Please input a number.";
        }
        else if (time == null) { 
            console.log("Invalid input");
            pageheader.innerHTML = "Please don't leave the field blank!";
        }

        else if (time <= 0) {
            console.log("Invalid input");
            pageheader.innerHTML = "Please input positive numbers only";
        }

        else {
            //time *= 60000; //convert user's minutes to miliseconds for SoundCloud
            callback(time);
        }
    }
    else {
        //time *= 60000; //convert user's minutes to miliseconds for SoundCloud
        callback(time);
    }
}

// Manipulate the DOM
function changeUI() : void {
    //indicates success in processing time
    pageheader.innerHTML = "Here's some music!";

    //Hide home buttons
    question.style.display = "none";
    usr.style.display = "none";
    findmusic.style.display = "none";

    //Display song refresh button
    refreshbtn.style.display = "inline";
    //Display facebook share button
    fbsharebutton.style.display = "inline";
    //Remove offset at the top
    pagecontainer.style.marginTop = "20px";
    //TODO: display facebook share button
};

//A Duration class which has the duration boundaries as a string
class Duration {
    lengthtime: string;
    constructor(public min) {
        this.lengthtime = min;
    }
}

var short : Duration = new Duration("short");
var medium : Duration  = new Duration("medium");
var long : Duration = new Duration("long");

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

function getTypeDuration(scores : any) : Duration {
    // the user's free time can be divided into the following duration boundaries (this is to make it simple to search)
    if (scores <= 2) {
        this.TimetoListen = short;
    } 
    else if (scores > 2 && scores <= 10) {
        this.TimetoListen = medium;
    } 
    else {
        this.TimetoListen = long;
    }
return this.TimetoListen;
}

//A Playlist class which holds various amount of songs for each different duration
class Playlist {
    short: Song[];
    medium: Song[];
    long: Song[];

    constructor() {
        this.short = [];
        this.medium = [];
        this.long = [];
    }

    addSong(freetime : string, song : Song) : void {
        // depending on the duration we want to add it to its corresponding list in our playlist
        if (freetime === "short") {
            this.short.push(song); // this means the value of happy of the playlist object that got invoked the method "addSong"
        } else if (freetime === "medium") {
            this.medium.push(song);
        } else if (freetime === "long") {
            this.long.push(song);
        } // do a default one as well
    }

    getRandSong(duration : string) : Song {
        if (duration === "short") {
            return this.short[Math.floor(Math.random() * this.short.length)];
        } else if (duration === "medium") {
            return this.medium[Math.floor(Math.random() * this.medium.length)];
        } else if (duration === "long") {
            return this.long[Math.floor(Math.random() * this.long.length)];
        } 
    }
}

var myPlaylist : Playlist;

function init() : void {
    // init playlist
    // due to time constraints I decided to hard-code the songs, just to simulate the response.
    myPlaylist = new Playlist();

    myPlaylist.addSong("short", new Song("The Scientist (cover)", "https://soundcloud.com/selinairwan/the-scientist-coldplay")); // Song name and the url of the song on SoundCloud
    myPlaylist.addSong("short", new Song("Feel Good Inc (Gorillaz Cover)", "https://soundcloud.com/imane-elhalouat/gorillaz-feel-good-inc-cover"));
    myPlaylist.addSong("short", new Song("Pompeii (Audien Remix)", "https://soundcloud.com/audien/bastille-pompeii-audien"));
    myPlaylist.addSong("medium", new Song("Sweet Disposition (Studio Killers SK Tranquility remix)", "https://soundcloud.com/studiokillers/sweet-disposition-tranquility"));
    myPlaylist.addSong("medium", new Song("Beings (Kidswaste Flip)", "https://soundcloud.com/kidswaste/madeon-beings-kidswaste-edit-1"));
    myPlaylist.addSong("medium", new Song("Midnight City", "https://soundcloud.com/m83/midnight-city"));
    myPlaylist.addSong("long", new Song("Midnight", "https://soundcloud.com/levanbuadzearabuli/midnight-jon-hopkins-remix"));
    myPlaylist.addSong("long", new Song("Owl City Medley", "https://soundcloud.com/memilymonkee/owl-city-medley"));
    myPlaylist.addSong("long", new Song("Maps (remix)", "https://soundcloud.com/marcelo-m-alanoca/top-5-remixes-maps-maroon-5"));
    // init soundcloud
    initSC();
}

function loadSong(TimetoListen : Duration) : void {
    var songSelected : Song = myPlaylist.getRandSong(TimetoListen.lengthtime); // gets a random song
    var track_url : string = songSelected.url; 

    $("#track-name")[0].innerHTML = "Have a listen to: " + songSelected.title; // display the song being played
    $("#track-name")[0].style.display = "block"; // changing this style to block makes it appear (before was set to none so it wasnt seen)
    $("#musicplayer")[0].style.display = "block";

    loadPlayer(track_url); // load soundcloud player to play this song
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

// init playlist + soundcloud
init();