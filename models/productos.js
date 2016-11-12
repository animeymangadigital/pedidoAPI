exports = module.exports = function(app, mongoose) {

	var productoSchema = new mongoose.Schema({
		title:	{ type: String },
		de7a12 :	{ type: Number },
		de13a17: 	{ type: Number },
		de18a49: 	{ type: Number },
		unidad:	{ type: String },
		type:	{ type: String },
		minutaId : {type: mongoose.Schema.ObjectId, ref: 'Minuta'},		
		updated_at: { type: Date }
	});

	mongoose.model('Producto', productoSchema);
};
