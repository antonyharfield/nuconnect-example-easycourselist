const express = require('express')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const { catchAsync } = require('./utils')
const configuration = require('./configuration')

const router = express.Router()

const oauthServer = configuration.oauthServer
const clientId = configuration.clientId
const clientSecret = configuration.clientSecret
const redirect = configuration.oauthCallback
const scopes = configuration.oauthScopes

router.get('/', (req, res) => {
  // Redirect immediately to the authorisation server
  res.redirect(`${oauthServer}/authorize?client_id=${clientId}&scope=${scopes}&response_type=code&redirect_uri=${encodeURIComponent(redirect)}`)
})

router.get('/callback', catchAsync(async (req, res) => {
  // User cancelled (or error)
  if (!req.query.code) {
    return res.redirect(`/?error=${req.query.error}`)
  }

  // If no error then we have an authorisation code
  const authCode = req.query.code

  // Exchange the authorisation code for an access token
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('grant_type', 'authorization_code')
  params.append('code', authCode)
  params.append('redirect_uri', redirect)
  const response = await fetch(`${oauthServer}/token`, { method: 'POST', body: params })
  const json = await response.json()

  // Store the token in the session
  req.session.accessToken = json.access_token

  // Redirect to homepage
  res.redirect('/home')
}))

router.get('/clear', (req, res) => {
  // Remove the access token
  req.session.accessToken = undefined
  res.redirect('/')
})

module.exports = router
