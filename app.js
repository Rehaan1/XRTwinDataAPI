require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const weatherInfoRoute = require('./api/routes/weatherInfoRoute.js')
const airPollutionInfoRoute = require('./api/routes/airPollutionInfoRoute.js')
const googleTaskRoute = require('./api/routes/googleTaskRoute.js')
const app = express()

const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// adding required headers to prevent CORS(Cross Origin Resourse Sharin) Error
app.use(cors())

app.use('/weatherInfo', weatherInfoRoute)
app.use('/airPollutionInfo', airPollutionInfoRoute)
app.use('/googleTask', googleTaskRoute)

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 200,
    message: 'XR Twin API Up and Running'
  })
})

app.listen(port, () => {
  console.log('Server Up and Running at Port', port)
})
