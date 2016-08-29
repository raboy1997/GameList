var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Marks = mongoose.model('Marks');

/* GET page. */
router.get('/', function(req, res, next) {
	Marks.find({}, function(err, data) {
		res.render('index', { marks: data });
	});
});

router.get('/add-mark', function(req, res, next) {
	res.render('add-mark');
});

/* SORT */
router.param('sortby', function(req, res, next, value) {
	req.sortby = value.toLowerCase();
	next();
});

router.get('/sort/:sortby', function(req, res, next) {
	Marks.find({}, null, {sort: {[req.sortby]: 'asc'}}, function(err, data) {
		res.render('index', { marks: data });
		console.log([req.sortby]);
	});
});

/* FILTER */
router.get('/filter/:sortby', function(req, res, next) {
	Marks.find({'country': [req.sortby]}, function(err, data) {
		res.render('index', { marks: data });
	});
});

/* CRUD */
router.param('id', function(req, res, next, value) {
	req.id = value;
	next();
});

router.get('/remove/:id', function(req, res, next) {
	// res.render('index', { title: 'Express' });
	Marks.remove({"_id": req.id}, function(err, data) {
		if (err) {
			res.send("There was a problem removing the information to the database.");
		}
		else {
			res.redirect('/');
		}
	})
});

router.post('/add-user/new', function(req, res) {
	var data = {
		name: req.body.name,
		about: req.body.about,
		website: req.body.website,
		logo: req.body.logo,
		country: req.body.country,
		founded: req.body.founded,
		price: req.body.price
	};
	var marks = new Marks(data);
	marks.save(function(err, data) {
		res.redirect('/');
	});
});

router.get('/edit/:id', function(req, res, next) {
	Marks.find({"_id": req.id}, function(err, data) {
		res.render('edit', { mark: data[0] });
		console.log(data[0]);
	});
});

router.post('/edit/update/:id', function(req, res) {
	var data = {
		name: req.body.name,
		about: req.body.about,
		website: req.body.website,
		logo: req.body.logo,
		country: req.body.country,
		founded: req.body.founded,
		price: req.body.price
	};

	Marks.update({ _id: req.id }, { $set: data}, function(err, tank) {
		res.redirect('/');
	});
});

module.exports = router;