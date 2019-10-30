// code away!
const server = require('./server')
const userRouter = require('./users/userRouter')

const port = 5000

server.use('/api/users/', userRouter)

server.listen(port, () => {
    console.log(`=== Listening on localhost:${port} ===`)
})