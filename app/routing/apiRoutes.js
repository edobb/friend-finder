//GET route /api/friends display all friends
var path = require('path');


var friendsArray = require('../data/friends.js');

function apiRoutes(app) {
    //POST route /api/friends handle incoming survey results
    // app.post('/api/friends', function (req,res) {
        
    //     var newFriend = req.body;

    //     console.log(newFriend);
    //     friendsArray.push(newFriend);
            
        
    // });

    // app.get('/api/friends', function(req, res) {
	// 	res.json(friends);
	// });

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friendsArray.length; i++) {
			console.log('friend = ' + JSON.stringify(friendsArray[i]));

			// Compute differenes for each question
			var difference = 0;
			for (var j = 0; j < userResponses.length; j++) {
				difference += Math.abs(friendsArray[i].scores[j] - userResponses[j]);
			}
			console.log('difference = ' + difference);

			// If lowest difference, record the friend match
			if (difference < totalDifference) {
				console.log('Closest match found = ' + difference);
				console.log('Friend name = ' + friendsArray[i].name);
				console.log('Friend image = ' + friendsArray[i].photo);

				totalDifference = difference;
				matchName = friendsArray[i].name;
				matchImage = friendsArray[i].photo;
			}
		}

		// Add new user
		friendsArray.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};


module.exports = apiRoutes;