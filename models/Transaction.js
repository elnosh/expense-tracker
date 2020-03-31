const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
	amount: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('transaction', TransactionSchema)
