var mongoose = require('mongoose');

var data = require('./data');

mongoose.model('Data', data.schema);
