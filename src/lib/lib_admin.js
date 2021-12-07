var express = require('express')
var cookieParser = require('cookie-parser')
var admin = express.Router()
var pug = require('pug')
var $ = require('jquery')
var db = require('./lib_db')
var admin_users = new db()

var template = {
    root: pug.compileFile(path.join(__dirname, '../templates/admin/admin.pug')),
    login: pug.compileFile(path.join(__dirname, '../templates/admin/login/login.pug')),
    users: pug.compileFile(path.join(__dirname, '../templates/admin/users/users.pug'))
}

var sessions = {}

admin_users.create('./.storage/admin.json', {
    username: {
        type: 'key'
    },
    password: {
        type: 'field',
        required: true
    }
}, () =>
{
    admin_users.add({
        username: 'test_username',
        password: 'test_password'
    })

    admin_users.write((result) =>{})
})

class session
{
    constructor(req, userString, username)
    {
        this.data = {}

        this.data['user-agent'] = req.headers['user-agent']
        this.data['user-string'] = userString
        this.data['user-name'] = username
    }
}

function string2num(string)
{
    newNum = 0
    numDict = {
        a: 0,b: 1,c: 2,d: 3,e: 4,f: 5,g: 6,h: 7,i: 8,j: 9,k: 10,l: 11,m: 12,n: 13,o: 14,p: 15,q: 16,r: 17,s: 18,t: 19,u: 20,v: 21,w: 22,x: 23,y: 24,z: 25
    }
    strChars = string.split('')
    $.each(strChars, (index, char) =>
    {
        newNum += numDict[char.toLowerCase()]
    })

    return newNum
}

function createSession(req, username)
{
    var userString = `${string2num(username)}::${Date.now()}`

    sessions[userString] = new session(req, userString, username)

    return userString
}

admin.use(express.json())
admin.use(express.urlencoded({ extended: true }));
admin.use(cookieParser())

admin.use(function getLogin(req, res, next) {

    if (req.url != '/login')
    {
        cookies = req.cookies

        if (cookies)
        {
            if (cookies.userString)
            {
                if (sessions[cookies.userString])
                {

                    if (sessions[cookies.userString].data['user-agent'] == req.headers['user-agent'])
                    {
                        next()
                        return
                    }
                }
            }
        }
    
        res.send(template.login())
    }
    else
    {
        next()
    }
})

admin.get('/', (req, res) =>
{
    res.send(template.root())
})

admin.get('/style.css', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../templates/admin/admin.css'))
})

admin.get('/admin.js', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../templates/admin/admin.js'))
})

admin.get('/users', (req, res) =>
{
    cookies = req.cookies
    res.send(template.users({username: sessions[req.cookies.userString].data['user-name']}))
})

admin.get('/users/style.css', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../templates/admin/users/users.css'))
})

admin.get('/logout', (req, res) =>
{
    cookies = req.cookies
    delete sessions[cookies.userString]

    res.redirect('/admin')
})

admin.post('/login', (req, res) =>
{
    if (req.body)
    {
        if (req.body.username)
        {
            if (req.body.password)
            {
                var matches = admin_users.get.byField('username', req.body.username)
                if (matches.length)
                {
                    if (matches[0].password == req.body.password)
                    {
                        userString = createSession(req, req.body.username)
                        res.cookie('userString', userString)

                        res.json({
                            success: true
                        })
                    }
                    else
                    {
                        res.json({
                            success: false,
                            response: 'Incorrect Username or Password'
                        })
                    }
                }
                else
                {
                    res.json({
                        success: false,
                        response: 'Incorrect Username or Password'
                    })
                }
            }
            else
            {
                res.json({
                    success: false,
                    response: 'Must include password'
                })
            }
        }
        else
        {
            res.json({
                success: false,
                response: 'Must include username'
            })
        }
    }
    else
    {
        res.json({
            success: false,
            response: 'Cannot access login without POST'
        })
    }
})

module.exports = {route: admin, users: admin_users}