var express = require('express')
var resources = express.Router()
var pug = require('pug')

resources.get('/admin/login/style.css', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../templates/admin/login/login.css'))
})

resources.get('/admin/login/login.js', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../templates/admin/login/login.js'))
})

resources.get('/jquery.js', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../lib/jquery-3.6.0.min.js'))
})

module.exports = resources