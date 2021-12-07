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
        $.each(data, function(index, userData)
        {
            console.log(userData)
            $.get(`/users/byID/${userData.id}`, (data) =>
            {
                console.log(data)
                if (data)
                {
                    if (userData.shift == 'First')
                    {
                        $('.first-shift').append(data.html)
                    }
                    else if (userData.shift == 'Second')
                    {
                        $('.second-shift').append(data.html)
                    } 
                }
            })
        })
    })
}