exports = module.exports = function(app, mongoose) {

	var minutaSchema = new mongoose.Schema({
		title: 		{ type: String },
		cicloId : {type: mongoose.Schema.ObjectId, ref: 'Ciclo'},
		updated_at: { type: Date },
		productos : { type : Array , "default" : [] }		
	});

	mongoose.model('Minuta', minutaSchema);
};
