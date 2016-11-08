exports = module.exports = function(app, mongoose) {

	var cicloSchema = new mongoose.Schema({
		title: 		{ type: String },
		updated_at: { type: Date }
	});

	mongoose.model('Ciclo', cicloSchema);
};
