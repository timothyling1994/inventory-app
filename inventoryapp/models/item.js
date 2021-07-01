var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: {type:String, required:true,maxLength:100},
	description: {type:String,required:true,maxLength:100},
	price: {type:Number, min: [0.01,"Input can't be 0 or less"], required: true},
	stock: {type:Number, min: [0,"Input can't be less than 0"], required: true},
	category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
});

ItemSchema.virtual('url').get(function(){
	return '/catalog/item/' + this._id;
});

module.exports = mongoose.model('Item',ItemSchema);