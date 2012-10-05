var mongoose = require('mongoose');

exports = module.exports;

exports.schema = new mongoose.Schema({
	name: String,
	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now}
});
