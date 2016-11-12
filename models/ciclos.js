exports = module.exports = function(app, mongoose) {

	var cicloSchema = new mongoose.Schema({
		title: 		{ type: String },
		updated_at: { type: Date },
		minutas : [{type: mongoose.Schema.ObjectId, ref: 'Minuta'}]
	});

	mongoose.model('Ciclo', cicloSchema);
};
