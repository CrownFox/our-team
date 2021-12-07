var express = require('express')
var view = express.Router()
var pug = require('pug')

var template = {
    view: pug.compileFile(path.join(__dirname, '../templates/view/view.pug'))
}

view.get('/', (req, res) =>
{
    res.send(template.view())
})

view.get('/style.css', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../templates/view/view.css'))
})

view.get('/view.js', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../templates/view/view.js'))
})

module.exports = view