exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
		username: 		{ type: String },
		password: 	{ type: String },
		status:  	{ type: String },
		email:	{	type: String },
		name: 	{ type: String }
	});

	mongoose.model('User', userSchema);
};
