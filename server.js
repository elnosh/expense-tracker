const express = require('express')
const app = express()

// Define routes
app.use('/transactions', require('./routes/transactions'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
