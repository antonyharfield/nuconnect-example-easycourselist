const express = require('express')
const fetch = require('node-fetch')
const configuration = require('./configuration')


module.exports = async (req, res) => {
    const token = req.query.token
    const response = await fetch('http://192.168.99.100/api/profile', {
        method: 'GET',
        headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
      })

    const json = await response.json()
    res.render('profile', json)
}
