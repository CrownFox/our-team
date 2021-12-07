const fs = require('fs');
const $ = require('jquery')

//-----//

class database
{
    constructor()
    {
        this.filepath = null
        this.data = null
        this.default = {
            id: {
                type: 'key',
                required: true,
                default: null
            },
            name: {
                type: 'field',
                required: true,
                default: 'n/a'
            },
            language: {
                type: 'field',
                required: true
            }
        }
    }

    create(filepath, __default, callback = function(){success})
    {
        this.filepath = filepath
        var store = {}
        this.default = __default
        store.default = this.default
        store.db = []

        fs.writeFile(this.filepath, JSON.stringify(store), () =>
        {
            this.data = []
            callback(true)
        })
    }

    read(filepath, callback = function(success){})
    {
        if (fs.existsSync(filepath))
        {
            this.filepath = filepath

            fs.readFile(filepath,(err, data)=>
            {   
                if (err) throw err;
                var store = JSON.parse(data)

                this.default = store.default
                this.data = store.db
    
                callback(true)
            })
        }
        else
        {
            callback(false)
        }
    }

    readSync(filepath)
    {
        if (fs.existsSync(filepath))
        {
            this.filepath = filepath
    
            var raw = fs.readFileSync(filepath)
            var store = JSON.parse(raw)

            this.default = store.default
            this.data = store.db
    
            return this.data
        }
        else
        {
            return false
        }
    }

    write(callback = function(result){})
    {
        if (this.filepath)
        {
            if (this.data)
            {
                var store = {}
                store.default = this.default
                store.db = this.data

                fs.writeFile(this.filepath, JSON.stringify(store), () =>
                {
                    callback(true)
                })
            }
            else
            {
                callback(false)
            }
        }
        else
        {
            callback(false)
        }
    }

    writeSync()
    {
        if (this.filepath)
        {
            if (this.data)
            {
                var store = {}
                store.default = this.default
                store.db = this.data

                fs.writeFileSync(this.filepath, JSON.stringify(store))

                return true
            }
        }

        return false
    }

    add(item)
    {
        var key = null

        $.each(item, (id, value) =>
        {
            if (this.default[id] == undefined)
            {
                return false
            }
        })

        $.each(this.default, (id, field) =>
        {
            if (field.type == 'key')
            {
                if (item[id] == undefined)
                {
                    return false
                }

                if (this.get.byField(id, item[id]))
                {
                    return false
                }

                key = id
            }

            if (field.type == 'field')
            {
                if (field.required == true)
                {
                    if (item[id] == undefined)
                    {
                        if (field.default)
                        {
                            item[id] = field.default
                        }
                        else
                        {
                            return false
                        }
                    }
                }
                else
                {
                    if (item[id] == undefined)
                    {
                        item[id] = null
                    }
                }
            }
        })

        this.data.push(item)
        return true
    }

    get = {
        byField: (field, value) =>
        {
            if (this.default[field])
            {
                var output = this.data.filter((element, index) =>
                {
                    if (element[field] != undefined)
                    {
                        if (element[field].toString() == value)
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    }
                    else
                    {
                        return false
                    }
                })
                return output
            }
            else
            {
                console.error(`ERROR: No such field as ${field}`)
                return []
            }
        }
    }
}

module.exports = database