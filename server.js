const express = require('express')
const app = express()
const connectDB = require('./config/db')

//Connect database
connectDB()

//Init Middleware
app.use(express.json({ extended: false }))

// Define routes
app.use('/transactions/', require('./routes/transactions'))
app.use('/users/', require('./routes/users'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
