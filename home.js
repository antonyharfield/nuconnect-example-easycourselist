const fetch = require('node-fetch')
const configuration = require('./configuration')

module.exports = async (req, res) => {
  // Check we have an access token in the session, else we are not logged in
  const accessToken = req.session.accessToken
  if (accessToken === undefined) {
    return res.redirect('/')
  }

  // Make a call to the profile web service
  const headers = { method: 'GET', headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
  const profileResponse = await fetch(`${configuration.apiServer}/profile`, headers)
  const profileJson = await profileResponse.json()

  // and to the courses web service
  const coursesResponse = await fetch(`${configuration.apiServer}/subjects?year=2561&semester=1`, headers)
  const coursesJson = await coursesResponse.json()

  const viewContext = {
    profile: profileJson,
    isTeacher: profileJson.status === 'teacher',
    courses: coursesJson.subjects,
    year: 2561,
    semester: 1
  }

  res.render('home', viewContext)
}
