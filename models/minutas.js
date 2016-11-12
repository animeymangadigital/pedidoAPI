exports = module.exports = function(app, mongoose) {

	var minutaSchema = new mongoose.Schema({
		title: 		{ type: String },
		cicloId : {type: Schema.ObjectId, ref: 'Ciclo'},
		updated_at: { type: Date },
		productos : [{type: Schema.ObjectId, ref: 'Producto'}]
	});

	mongoose.model('Minuta', minutaSchema);
};
