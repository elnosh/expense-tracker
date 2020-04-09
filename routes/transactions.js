const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const Transaction = require('../models/Transaction')
const User = require('../models/User')

// @route       GET /transactions
// desc         Get all transactions
// @access		Private
router.get('/', auth, async (req, res) => {
	try {
		const transactions = await Transaction.find({
			user: req.user.id,
		}).sort({ date: -1 })

		return res.json(transactions)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route       POST /transactions
// desc         Add a new transaction
// @access		Private
router.post(
	'/',
	[
		auth,
		[
			check('amount', 'Please enter amount').not().isEmpty(),
			check('description', 'Please enter a description').not().isEmpty(),
			check('type', 'Please add a type').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const { amount, description, type } = req.body

		try {
			const newTransaction = new Transaction({
				amount,
				description,
				type,
				user: req.user.id,
			})

			const transaction = await newTransaction.save()
			res.json(transaction)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route       PUT /transactions
// desc         Update transaction
// @access		Private
router.put('/:id', auth, async (req, res) => {
	const { amount, description, type } = req.body

	const transactionFields = {}
	if (amount) transactionFields.amount = amount
	if (description) transactionFields.description = description
	if (type) transactionFields.type = type

	try {
		let transaction = Transaction.findById(req.params.id)

		if (!transaction) {
			return res.status(404).send({ msg: 'Transaction not found' })
		}

		transaction = await Transaction.findByIdAndUpdate(
			req.params.id,
			{ $set: transactionFields },
			{ new: true }
		)

		res.json(transaction)
	} catch (err) {
		console.error(err.message)
		return res.status(500).send('Server Error')
	}
})

// @route       DELETE /transactions
// desc         Delete transaction
// @access		Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let transaction = await Transaction.findById(req.params.id)

		if (!transaction) {
			return res.status(404).json({ msg: 'Transaction not found' })
		}

		await Transaction.findByIdAndRemove(req.params.id)
		res.json({ msg: 'Transaction removed' })
	} catch (err) {
		console.error(err.message)
		return res.status(500).send('Server Error')
	}
})

module.exports = router
