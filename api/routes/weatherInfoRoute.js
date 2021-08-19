const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/getInfo',(req,res) => {
    if (!req.body.city) {
        return res.status(400).json({
          error: 'missing required parameters. refer documentation'
        })
      }
    
    if (!req.body.region) {
        return res.status(400).json({
          error: 'missing required parameters. refer documentation'
        })
      }
    
    if (!req.body.countryCode) {
        return res.status(400).json({
          error: 'missing required parameters. refer documentation'
        })
      }
    
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="+req.body.city+","+req.body.region+","+req.body.countryCode+"&appid="+process.env.OPENWEATHERAPIKEY;

    axios.get(weatherURL)
      .then((response)=>{
        return res.status(200).json({
            status: 200,
            data: response.data
        })
      })
      .catch((error)=>{
        console.log(error)
        return res.status(500).json({
            status: 500,
            error: error
        })
      })
    
})


module.exports = router