exports = module.exports = function(app, mongoose) {

	var keySchema = new mongoose.Schema({
		secret: 		{ type: String },
		code: { type: String }
	});

	mongoose.model('Key', keySchema);
};
