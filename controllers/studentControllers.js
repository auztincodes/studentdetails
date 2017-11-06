
module.exports = function(app){

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test@ds249325.mlab.com:49325/studentdata', {
	 useMongoClient: true
 });
mongoose.Promise = Promise;

//create a schema

var studentSchema = new mongoose.Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	dateofbirth: {type: String, required: true},
	email:  {type: String, required: true},
	department:  {type: String, required: true},
	yearofstudy:  {type: String, required: true},

});

var StudentData = mongoose.model('studentData', studentSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.get('/', function(req, res){
	res.render('form');
});


app.post('/form', urlencodedParser, function(req, res) {
	// Get  Student request
	var item = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		dateofbirth: req.body.dateofbirth,
		email: req.body.email,
		department: req.body.department,
		yearofstudy: req.body.yearofstudy,
	};
	// Insert Student data into the database
	var data = new StudentData(item).save(function(err, data) {
		if (err) throw err;
		res.redirect('list');
	});
});



app.get('/list', function(req, res, next) {
	// Get Student data from the Database
	StudentData.find()
	.then(function(doc) {
		res.render('list', {
				studentdata: doc,
		});
	});
});


app.get('/edit/:id', function(req, res) {
	var id = req.params.id;
	StudentData.findOne({_id: id}, function(err, data) {
		if (err) throw err;
		res.render('edit', { StudentData: data });
	});
});

app.post('/update/:id', urlencodedParser, function(req, res) {
	var id = req.params.id;
	StudentData.findOne({_id: id}, function(err, data) {
		if (err) throw err;
		data.firstname = req.body.firstname,
		data.lastname = req.body.lastname,
		data.dateofbirth = req.body.dateofbirth,
		data.email = req.body.email,
		data.department = req.body.department,
		data.yearofstudy = req.body.yearofstudy,

		data.save(function(err, data) {
			if (err) throw err;
			res.redirect('/list');
		});
	});
  });

app.get('/delete/:id', function(req, res) {
	StudentData.remove({_id: req.params.id }, function(err, data) {
		if (err) throw err;
		res.redirect('/list');
	 });
});

}
