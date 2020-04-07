const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

// @route       POST /users
// desc         Register user
// @access      Public
router.post(
	'/',
	[
		check('name', 'Please enter a name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 7 or more characters'
		).isLength({ min: 7 }),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password } = req.body

		try {
			// Check if user already exists
			let user = await User.findOne({ email: email })
			if (user) {
				return res.status(400).json({ msg: 'User already exists' })
			}

			// Create user
			user = new User({ name, email, password })

			// Hash password
			const salt = await bcrypt.genSalt(10)
			user.password = await bcrypt.hash(password, salt)

			// Save new user
			await user.save()

			const payload = {
				user: {
					id: user.id,
				},
			}

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err
					res.json({ token })
				}
			)
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	}
)

module.exports = router
