// This file is required by the index.html file and will
// be executed in the renderer process for that window.

//const http = require('http')
const express = require('express')
const app = express()
const PORT = 80
const pug = require('pug')
const path = require('path')

var libs = {
    users: require('../../lib/lib_users'),
    view: require('../../lib/lib_view'),
    admin: require('../../lib/lib_admin'),
    resources: require('../../lib/lib_resources')
}

var template = {
    view: pug.compileFile(path.join(__dirname, '../../templates/view/view.pug'))
}

//path.join(__dirname, '/src/pages/index/preload.js')

app.get('/', (req, res) =>
{
    res.send('Success')
})

app.use('/users', libs.users)

app.use('/view', libs.view)

app.use('/admin', libs.admin)

app.use('/resources', libs.resources)

app.listen(PORT, () =>
{
    console.log(`Server running at: http://localhost:${PORT}/`)
})