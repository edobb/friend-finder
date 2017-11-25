var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

// Expose the public directory to access CSS files
app.use(express.static(path.join(__dirname, './app/public')));

// Add middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// require(path.join(__dirname, './app/data/friends.js'))(app);
var friends = require('./app/data/friends.js');
// var friendsArray = [
//     {
//         name: 'ray ray',
//         photo: 'http://google.com',
//         scores: [
//                 '1',
//                 '3',
//                 '5',
//                 '4',
//                 '1',
//                 '2',
//                 '2',
//                 '3',
//                 '1',
//                 '5'
//         ]
//     }
// ];

// function apiRoutes(app) {
//     //POST route /api/friends handle incoming survey results
//     app.post('/api/friends', function (req,res) {
        
//         var newFriend = req.body;

//         console.log(newFriend);
//         friendsArray.push(newFriend);
            
        
//     });
// };

// function htmlRoutes(app){
//     //A GET Route to /survey which should display the survey page.
//     app.get('/survey', function(req, res){
//         res.sendFile(path.join(__dirname, "app/public/survey.html"));
//     });
//     app.get('/api/friends', function(req, res){
//         res.send(friendsArray);
//     });
//     //A default, catch-all route that leads to home.html which displays the home page.
//     app.get('/', function(req, res){
//         res.sendFile(path.join(__dirname, "app/public/home.html"));
//     });
// };

// apiRoutes(app);

// htmlRoutes(app);
// Add the application routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
