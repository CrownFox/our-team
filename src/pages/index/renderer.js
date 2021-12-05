// This file is required by the index.html file and will
// be executed in the renderer process for that window.

//const http = require('http')
const express = require('express')
const app = express()
const PORT = 80
const pug = require('pug')
const path = require('path')

var libs = {
    user: require('../../lib/lib_user'),
    view: require('../../lib/lib_view')
}

var template = {
    view: pug.compileFile(path.join(__dirname, '../../templates/view/view.pug'))
}

//path.join(__dirname, '/src/pages/index/preload.js')

app.get('/', (req, res) =>
{
    res.send('Success')
})

app.use('/users', libs.user)

app.use('/view', libs.view)

app.get('/resources/jquery.js', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../../lib/jquery-3.6.0.min.js'))
})

app.listen(PORT, () =>
{
    console.log(`Server running at: http://localhost:${PORT}/`)
})