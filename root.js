const path = require('path')

module.exports = (req, res) => {
  // If there is an access token then redirect to home
  if (req.session.accessToken !== undefined) {
    return res.redirect('/home')
  }

  res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'))
}
