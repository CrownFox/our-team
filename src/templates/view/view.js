if ($ != undefined)
{
    $(start)
}
else
{
    console.error('ERROR: Jquery not loaded')
}

function start()
{
    $.getJSON('/users', function(data)
    {
        console.log(data)
        $.each(data, function(username, userdata)
        {
            $.get(`/users/byName/${username}`, (data) =>
            {
                if (data)
                {
                    if (userdata.shift == 'First')
                    {
                        $('.first-shift').append(data.html)
                    }
                    else if (userdata.shift == 'Second')
                    {
                        $('.second-shift').append(data.html)
                    } 
                }
            })
        })
    })
}