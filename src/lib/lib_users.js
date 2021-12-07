var express = require('express')
var user = express.Router()
var pug = require('pug')
var template = {
    user: pug.compileFile(path.join(__dirname, '../templates/users/users.pug'))
}

class users
{
    userDB = null

    constructor()
    {
        this.route = express.Router()

        this.route.use((req, res, next) => {
            next()
        })
        
        this.route.get('/', (req, res) => {
            if (this.userDB)
            {
                res.json(this.userDB.data)
            }
            else
            {
                res.json([])
            }
        })
        
        this.route.get('/byID/:userID/', (req, res) => {
            console.log(req.params['userID'])
            console.log(this.userDB.get.byField('id', req.params['userID']))
            if (this.userDB.get.byField('id', req.params['userID']))
            {
                res.json({
                    html: template.user(this.userDB.get.byField('id', req.params['userID'])[0])
                    //html: template.user(__users[req.params['userName']])
                })
            }
            else
            {
                res.json({

                })
            }
        })
    }

    setDB(db)
    {
        this.userDB = db
    }
}

module.exports = new users()