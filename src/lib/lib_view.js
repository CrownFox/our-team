var express = require('express')
var view = express.Router()
var pug = require('pug')

var template = {
    view: pug.compileFile(path.join(__dirname, '../templates/view/view.pug'))
}

view.get('/', (req, res) =>
{
    data = {
        first_shift: [
            {
                name: 'Kassidy',
                task: 'Carts/Cull\nFill Ambients',
                timestart: '4:00 AM',
                timeend: '1:00 PM'
            }
        ],
        second_shift: [
            {
                name: 'Ron',
                task: 'Produce',
                timestart: '1:00 PM',
                timeend: '10:00 PM'
            }
        ]
    }

    res.send(template.view(data))
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