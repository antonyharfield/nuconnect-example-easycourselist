const express = require('express')
const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const { catchAsync } = require('./utils')
const configuration = require('./configuration')

const router = express.Router()

const redirect = 'http://localhost:50451/login/nu/callback'

const oauthServer = configuration.oauthServer
const clientId = configuration.clientId
const clientSecret = configuration.clientSecret

router.get('/nu', (req, res) => {
  res.redirect(`${oauthServer}/authorize?client_id=${clientId}&scope=identity profile&response_type=code&redirect_uri=${encodeURIComponent(redirect)}`)
});

router.get('/nu/callback', catchAsync(async (req, res) => {
    // User cancelled (or error)
    if (!req.query.code) {
        res.redirect(`/?error=${req.query.error}`)
        return
    }

    const code = req.query.code
    
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirect);

    const response = await fetch(`${oauthServer}/token`,
      {
        method: 'POST',
        body: params
      });

    const json = await response.json()
    res.redirect(`/profile?token=${json.access_token}`)
  }));

module.exports = router