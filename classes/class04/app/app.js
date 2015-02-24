var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');

var index = require('./routes/index');
var getCat =require('./routes/getCat');

var app = express();

// var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
// mongoose.connect(mongoURI);

var PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(logger('dev'));  //call logger function and pass it 'dev'
app.use(bodyParser.json());  //parses body of request and puts into json object
app.use(bodyParser.urlencoded({ extended: false }));  //parses url things
app.use(cookieParser()); //parses cookies
app.use(express.static(path.join(__dirname, 'public')));  //static page


app.get('/', index.home);
app.get('/getCat', getCat.getCatGET);
app.post('/getCat', getCat.getCatPOST);


app.listen(PORT, function () {
	console.log("Application running on port:", PORT);
});

// User.findOne({name: "bob"}, function (user) {
// 	res.render("user-profile", user)
// 	console.log(user);
// })