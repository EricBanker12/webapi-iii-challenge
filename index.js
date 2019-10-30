// code away!
const express = require('express')

const userRouter = require('./users/userRouter')

const server = express()
const port = 5000

server.use('/api/users/', userRouter)

server.listen(port, () => {
    console.log(`=== Listening on localhost:${port} ===`)
})