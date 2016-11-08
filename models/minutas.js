exports = module.exports = function(app, mongoose) {

	var minutaSchema = new mongoose.Schema({
		title: 		{ type: String },
		cicloId: { type: String},
		updated_at: { type: Date }
	});

	mongoose.model('Minuta', minutaSchema);
};
