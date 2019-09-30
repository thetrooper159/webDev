var express = require('express');
var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

var textColors = ['red', 'green', 'yellow', 'white', 'black', 'purple'];



app.set('port', process.env.PORT || 3000);

if( app.thing == null ) console.log( 'bleat!' );

app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' &&
 req.query.test === '1';
 next();
});

app.get('/home', function(req, res) {
 res.render('home', {
   people: [
   { name: 'Business Career Prep', code: 'BMGT 280 ',des: 'THis class will prepare students for entry into the professional world by developing foundational skills in interviewing and marketing themselves utilizing resumes, cover letters and social medial e portfolios', num: '3', ins: 'Jessica Hobson M.A' },
   { name: 'Elementary Statistics', code: 'ECON 201', des: 'Data analysis and charts rules of probability conditional probability distributions random variables sampleing  confidence interval estimates hypothesis testing regression and corralation', num: '3', ins: 'Bradford Thrompson' },
   { name: 'Web Application Developmen', code: 'CMPS 361 EA', des: 'This course will provide a foundation in several facets of establishing and maintaining a website. This includes the latest advances in client side as well as server side technologies. The goal is to have students design, implement, and run advanced web applications. It will also cover in some detail the protocols required for web development. Prerequisites: CMPS 261, CMPS 262.', num: '3', ins: 'Voortman, Mark' },
   { name: 'Principles of Economics', code: 'MATH 165 DA', des: 'An introduction to the analysis of economic theory as applied to fiscal and monetary affairs', num: '3', ins: 'Dimitrius Krainou' },
   { name: 'Introduction to financial accouting', code: 'ACCT 210', des: 'Introduction to and application of financial accounting  concepts relating to the importacne of accounting in business and the application of generally accepted accounting principles related to the collection , recoring , analysis, interpreaton, and reporting of financial accounting information ', num: '3', ins: 'Cheryl Clark CPA, MBA' },
   ],
 });
});


app.get('/classes', function(req,res){

res.render('classes');
});

app.get('/random', function(req, res){
 var randomColor =
 textColors[Math.floor(Math.random() * textColors.length)];
 res.render('random', {random: randomColor});
});

app.get('/about', function(req, res) {
 res.render('about', {

 pageTestScript: '/qa/tests-about.js'
 } );
});

app.get('/tours/hood-river', function(req, res){
 res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
 res.render('tours/request-group-rate');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
 res.status(404);
 res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500);
 res.render('500');
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
