var mongoose = require('mongoose');
var uuid_generator = require('uuid');
mongoose.connect('mongodb://Marcoli:mLab110@ds019053.mlab.com:19053/dreamangle');

var db = mongoose.connection;
db.on('error', console.error.bind(console," connection error:"));
db.once('open', function(){
	//we're connected;
})

var userSchema = mongoose.Schema({
	name: String,
	password: String,
	uid: String
})

var User = mongoose.model('User', userSchema);

function createUser(username, password, callback) {
	User.findOne({name: username}, function(err, user){
		if (err) {
			console.log('find user error' + err);
			createuserAndSaveToDB(username, password, function(error, user){
				if (error) {
					callback(error);
				} else {
					callback(null);
				}
			});
		} else {
			if (user != null) {
				callback("user existed");
			} else {

				createuserAndSaveToDB(username, password, function(error, user){
				if (error) {
					callback(error);
				} else {
					callback(null);
				}
			});
			}
		};
	});
}

function createuserAndSaveToDB(username, password,callback) {
	var user = new User({name: username, password: password, uid: uuid_generator.v4()});
	user.save(function(err, user) {
		if (err) {
			callback(err,null);
		} else {
			callback(null, user);
		}
	});
}

function findSomebody(username, callback) {
	User.findOne({name: username}, function(err, user){
		if(err) return callback(err, nil);
		return callback(null,user);
	});
}



exports.createUser = createUser;
exports.findSomebody = findSomebody;