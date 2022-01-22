const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require('./db/mongoose')

app.use(express.json())

const articalRouter = require('./routers/artical')
const journalistRouter = require('./routers/journalist')

app.use(articalRouter)
app.use(journalistRouter)


app.listen(port,()=>{console.log('Listening on port 3000')})


