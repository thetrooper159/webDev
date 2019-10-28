var express = require('express');
var app = express();
var formidable = require('formidable');
var credentials = require("./credentials.js");

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
 defaultLayout:'main',
 helpers: {
 section: function(name, options){
 if(!this._sections) this._sections = {};
 this._sections[name] = options.fn(this);
 return null;
 }
 }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').urlencoded({extended:true}));
app.use(require('express-session')({
  resave:false,
  saveUniitialized: false,
  secret:credentials.cookieSecret,
}));
var textColors = ['red', 'green', 'yellow', 'white', 'black', 'purple'];



app.set('port', process.env.PORT || 3000);

if( app.thing == null ) console.log( 'bleat!' );

app.use(function(req, res, next){
 res.locals.showTests = app.get('env') !== 'production' &&
 req.query.test === '1';
 next();
});

app.use(function(req, res, next){
  res.locals.name = req.session.name;
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
app.get('/thank-you', function(req, res){
 res.render('thank-you', );
});

app.get('/tours/request-group-rate', function(req, res){
 res.render('tours/request-group-rate');
});

app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json,html')==='json'){
        // if there were an error, we would send { error: 'error description' }
        res.send({ success: true });
    } else {
        // if there were an error, we would redirect to an error page
        console.log('Form (from querystring): ' + req.query.form);
        console.log('CSRF token (from hidden form field): ' + req.body._csrf);
        console.log('Name (from visible form field): ' + req.body.name);
        req.session.name = req.body.name;
        console.log('Email (from visible form field): ' + req.body.email);
        res.redirect(303, '/thank-you');
    }
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
