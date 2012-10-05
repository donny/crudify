var log4js = require('log4js');
var logger = log4js.getLogger();
var mongoose = require('mongoose');
var util = require('util');

exports = module.exports = function(server, routePrefix, dataModel) {
	var DataModel = mongoose.model(dataModel);

	server.get(routePrefix, function(req, res) {
		DataModel.find({}, function(err, items) {
			if (err) {
				res.send(500, 'Error');
			} else {
				res.send(200, items);
			}
		});
	});

	server.post(routePrefix, function(req, res) {
		var entity = JSON.parse(req.body);
		var data = new DataModel(entity);
		data.save(function(err) {
			if (err) {
				res.send(500, 'Error');
			} else {
				res.send(200);
			}
		});
	});

	server.get(routePrefix + '/:id', function(req, res) {
		var id = req.params.id;
		DataModel.findById(id, function(err, item) {
			if (err) {
				res.send(500, 'Error');
			} else {
				res.send(200, item);
			}
		});
	});

	server.put(routePrefix + '/:id', function(req, res) {
		var id = req.params.id;
		var entity = JSON.parse(req.body);
		DataModel.findByIdAndUpdate(id, entity, function(err, item) {
			if (err) {
				res.send(500, 'Error');
			} else {
				res.send(200, item);
			}
		});
	});

	server.del(routePrefix + '/:id', function(req, res) {
		var id = req.params.id;
		DataModel.findByIdAndRemove(id, function(err, item) {
			if (err) {
				res.send(500, 'Error');
			} else {
				res.send(200, item);
			}
		});
	});
};


// See the following stub code to code for nested resources.
// e.g. /post/:pid/comment/:cid

//function allPossibleCases(arr) {
//	if (arr.length == 1) {
//		return arr[0];
//	} else {
//		var result = [];
//		var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
//		for (var i = 0; i < allCasesOfRest.length; i++) {
//			for (var j = 0; j < arr[0].length; j++) {
//				result.push(arr[0][j] + allCasesOfRest[i]);
//			}
//		}
//		return result;
//	}
//}
//
//var res = allPossibleCases([['a'], ['b', 'c'], ['d', 'e', 'f']]);
//console.log(res);
