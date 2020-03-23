const express = require('express')
const router = express.Router()

// @route       GET expenses
// desc         Get all transactions
// @access      Public for now
router.post('/', (req, res) => {
	res.send('Post a transaction')
})

module.exports = router
