const express = require('express')
const roleRouter = require('./routes/roleRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/roles', roleRouter)
app.use('/usuarios', userRouter)
app.use('/productos', productRouter)
app.use('/categorias', categoryRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})