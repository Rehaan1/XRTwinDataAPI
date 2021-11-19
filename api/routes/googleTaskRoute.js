const jwt_decode = require('jwt-decode')
const express = require('express')
const router = express.Router()
const axios = require('axios')

router.post('/userInfo', (req, res) => {
  if (!req.body.idToken) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  const data = jwt_decode(req.body.idToken)

  return res.status(200).json({
    userData: data
  })
})

router.post('/tasklist', (req, res) => {
  if (!req.body.accessToken) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  const auth = 'Bearer ' + req.body.accessToken
  const url = 'https://tasks.googleapis.com/tasks/v1/users/@me/lists?key=' + process.env.GTASKSAPIKEY

  axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: auth
    }
  })
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

router.post('/tasks', (req, res) => {
  if (!req.body.accessToken) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  if (!req.body.tasklistIdentifier) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  const auth = 'Bearer ' + req.body.accessToken
  const url = 'https://tasks.googleapis.com/tasks/v1/lists/' + req.body.tasklistIdentifier + '/tasks'

  axios.get(url, {
    headers: {
      Accept: 'application/json',
      Authorization: auth
    }
  })
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

router.post('/createTask', (req, res) => {
  if (!req.body.accessToken) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  if (!req.body.tasklistIdentifier) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  if (!req.body.title) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  const auth = 'Bearer ' + req.body.accessToken
  const url = 'https://tasks.googleapis.com/tasks/v1/lists/' + req.body.tasklistIdentifier + '/tasks'

  const data = {
    title: req.body.title
  }

  const headers = {
    Accept: 'application/json',
    Authorization: auth
  }

  axios.post(url, data, {
    headers: headers
  })
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

router.post('/deleteTask', (req, res) => {
  if (!req.body.accessToken) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  if (!req.body.tasklistIdentifier) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  if (!req.body.taskId) {
    return res.status(400).json({
      error: 'missing required parameters. refer documentation'
    })
  }

  const auth = 'Bearer ' + req.body.accessToken
  const url = 'https://tasks.googleapis.com/tasks/v1/lists/' + req.body.tasklistIdentifier + '/tasks/' + req.body.taskId

  const headers = {
    Accept: 'application/json',
    Authorization: auth
  }

  axios.delete(url, {
    headers: headers
  })
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
