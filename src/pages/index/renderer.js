// This file is required by the index.html file and will
// be executed in the renderer process for that window.

//const http = require('http')
const express = require('express')
const app = express()
const PORT = 80
const pug = require('pug')
const path = require('path')
const fs = require('fs')

var libs = {
    users: require('../../lib/lib_users'),
    view: require('../../lib/lib_view'),
    admin: require('../../lib/lib_admin'),
    resources: require('../../lib/lib_resources'),
    db: require('../../lib/lib_db')
}

var projectData = {
    userBase: new libs.db()
}

if (!fs.existsSync('./.storage/'))
{
    fs.mkdirSync('./.storage/')
}

projectData.userBase.read('./.storage/UserBase.json', (success) =>
{
    if (!success)
    {
        console.log('Creating UserDB')
        projectData.userBase.create('./.storage/userBase.json', {
            id: {
                type: 'key'
            },
            display: {
                type: 'field',
                required: true
            },
            firstName: {
                type: 'field',
                required: false
            },
            lastName: {
                type: 'field',
                required: false
            },
            shift: {
                type: 'field',
                required: true
            },
            daysOff: {
                type: 'field',
                required: true
            },
            preferredTask: {
                type: 'field',
                required: false
            }
        }, (success) =>
        {
            console.log('UserDB Creation: ' + success)
            libs.users.setDB(projectData.userBase)
            postUserDB()
        })
    }
    else
    {
        console.log('Loaded UserDB')
        libs.users.setDB(projectData.userBase)
        postUserDB()
    }
})

function postUserDB()
{
    projectData.userBase.add({
        id: 0,
        display: 'Kassidy',
        firstName: 'Kassidy',
        lastName: 'Lechner',
        shift: 'First',
        daysOff: 'Sunday/Monday',
        preferredTask: 'Ambients'
    })

    projectData.userBase.add({
        id: 1,
        display: 'Ron',
        shift: 'Second',
        daysOff: 'Wednesday/Tuesday',
        preferredTask: 'Produce'
    })
}

var template = {
    view: pug.compileFile(path.join(__dirname, '../../templates/view/view.pug'))
}

//path.join(__dirname, '/src/pages/index/preload.js')

app.get('/', (req, res) =>
{
    res.send('Success')
})

app.use('/users', libs.users.route)

app.use('/view', libs.view)

app.use('/admin', libs.admin.route)

app.use('/resources', libs.resources)

app.listen(PORT, () =>
{
    console.log(`Server running at: http://localhost:${PORT}/`)
})