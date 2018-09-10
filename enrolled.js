const fetch = require('node-fetch')
const configuration = require('./configuration')

module.exports = async (req, res) => {
  // Check we have an access token in the session, else we are not logged in
  const accessToken = req.session.accessToken
  if (accessToken === undefined) {
    return res.redirect('/')
  }

  const courseCode = req.query.code
  const courseName = req.query.name // TODO: pull from the web service
  const section = req.query.section
  const year = req.query.year
  const semester = req.query.semester

  // Make a call to the enrollments web service
  const headers = { method: 'GET', headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` } }
  const enrollmentsResponse = await fetch(`${configuration.apiServer}/enrollments?code=${courseCode}&section=${section}&year=${year}&semester=${semester}`, headers)
  const enrollmentsJson = await enrollmentsResponse.json()

  // Render the view
  const viewContext = {
    course: {
      code: courseCode,
      name: courseName,
      year: year,
      semester: semester,
      section: section
    },
    enrollments: enrollmentsJson.students
  }
  res.render('enrolled', viewContext)
}
