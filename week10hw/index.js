require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter')
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require('fs');
var request = require('request');
var inquirer = require('inquirer');

var input = process.argv[2];

var info = process.argv[3];

// Switch between 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'.
switch(input) {
	case 'my-tweets':
		tweeter();
		break;
	case 'spotify-this-song':
		spotification();
		break;
	case 'movie-this':
		omdatabase();
		break;
	case 'do-what-it-says':
		control();
		break;
	default:

		break
}; 

// Function to post the 20 most recent tweets to the terminal.
function tweeter() {
	console.log('Success!');
	client.get('statuses/update', function(error, tweets, response) {
	  if(error) {throw error};
	  console.log(tweets);  // The favorites. 
	  console.log(response);  // Raw response object. 
	});
};

// Function to take song name from 'info' to display the 'Artist', The 'Name of the Song', 'Preview Link to the Song' and also giving the 'Album'.
// Default to "The Sign" by Ace of Base
function spotification(info) {
	if (info) { spotify
		.search({ type: 'track', query: info})
		.then( (answer) => { console.log(answer.tracks.items[0]);})
		.catch( (err) =>{ console.log(err);});
	} else {
		spotify
		.search({ type: 'track', query: 'The Sign'})
		.then( (answer) => {console.log(answer);})
		.catch( (err) => {console.log(err);});
		console.log("error");
	};
	console.log('I did it!');
	console.log("spotify key:",spotify.id);
	console.log("spotify secret:", spotify.secret);
};

// Function to take a movie name from 'info' to display 'Title of the Movie', 'Year Movie came out', 'IMDB Rating of Movie', 'Rotten Tomatoes Rating of Movie', 'Country where Movie was produced', 'Language of the Movie', 'Plot of Movie', and 'Actors in the Movie'.
// Default to "Mr. Nobody"
function omdatabase(info) {
	console.log('The thing has happened!');
	var apiKey = '9bede2ed';
	if (!info) {info = 'Mr. Nobody'}
	request('http://www.omdbapi.com/?i=tt3896198&apikey=' + apiKey + '&t=' + info, (error, response, body) => {
		if (!error) {
			console.log('===================================================================');
			console.log(
				'Title: ' + response.Title + 
				'\nYear: ' + response.Year + 
				'\nIMDB rating: ' + response.imdbRating + 
				'\nRotten Tomatoes rating: ' + response.Ratings[1].Value +
				'\nCountry of Origin: ' + response.Country + 
				'\nLanguages: ' + response.Language +
				'\nPlot: ' + response.Plot +
				'\nActors: ' + response.Actors);
			console.log('===================================================================');
		}
	})

};

function control() {
	spotification('Take Over Control');
}