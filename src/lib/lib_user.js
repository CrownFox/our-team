var express = require('express')
var user = express.Router()
var pug = require('pug')

var template = {
    user: pug.compileFile(path.join(__dirname, '../templates/user/user.pug'))
}

var users = {
    'Kassidy': {
        name: 'Kassidy',
        task: 'Carts/Cull\nFill Ambients',
        timestart: '4:00 AM',
        timeend: '1:00 PM',
        shift: 'First'
    },
    'Ron':{
        name: 'Ron',
        task: 'Produce',
        timestart: '1:00 PM',
        timeend: '10:00 PM',
        shift: 'Second'
    }
}

user.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

user.get('/', function(req, res) {
    res.json(users)
})

user.get('/byName/:userName/', function(req, res) {
    res.json({
        html: template.user(users[req.params['userName']])
    })
})

module.exports = user