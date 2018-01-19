require("dotenv").config();

//required const
const fs = require("fs");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request")
const keys = require("./keys");

const action = process.argv[2];
const parameter = process.argv[3];

//
function liriInput() {

  switch (action) {

    case 'my-tweets':
      myTweets();                  
      break;                          

    case 'spotify-this-song':
      mySong();
      break;

    case 'movie-this':
      myMovie();
      break;

    case 'do-what-it-says':
      myReadme();
      break;

      default:                            
      console.log("Something Broke");
      break;

  }
};

function myTweets() {
  console.log("My Tweets!");

var client = new Twitter(keys.twitter);

  var params = {
    screen_name: "Daves Liri"
  };
 
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
 
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var returnedData = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
        console.log(returnedData);
      }
    }
  });
};

function mySong() {
  console.log("Music!");

var spotify = new Spotify(keys.spotify);

  var searchTrack;
  if (parameter === undefined) {
    searchTrack = "Master of Puppets";
  } else {
    searchTrack = parameter;
  }

  spotify.search({
    type: 'track',
    query: searchTrack
  }, function(error, data) {
    if (error) {
      console.log('Error occurred: ' + error);
      return;
    } else {
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[3].preview_url); 
      console.log("Album: " + data.tracks.items[0].album.name);
      
    }
  });
};

function myMovie() {
  console.log("My Favorite movie is Star Wars!");

  var findMovie;

  if (parameter === undefined) {
    findMovie = "Star Wars";
  } else {
    findMovie = parameter;
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=56ba832d";

  console.log(queryUrl);

  request(queryUrl, function(err, res, body) {

    if (!err && res.statusCode === 200) {   
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
};



function myReadme() {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    var output = data.split().splice(",");

    for (var i = 0; i < output.length; i++) {
 
      console.log(output[i]);
    }
  });
}
liriInput();
