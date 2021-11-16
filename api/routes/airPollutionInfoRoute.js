const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/getInfo', (req, res) => {
  if (!req.body.lat) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  if (!req.body.lon) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  const airPollutionURL = 'http://api.openweathermap.org/data/2.5/air_pollution?lat=' + req.body.lat + '&lon=' + req.body.lon + '&appid=' + process.env.OPENWEATHERAPIKEY

  axios.get(airPollutionURL)
    .then((response) => {
      return res.status(200).json({
        status: 200,
        data: response.data
      })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({
        status: 500,
        error: error
      })
    })
})

module.exports = router
