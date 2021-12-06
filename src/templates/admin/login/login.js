if ($ != undefined)
{
    $(() =>
    {
        $('#submit-button').on('click', () =>
        {
            console.log('Submitting login information...')

            $('#submit-button').hide()
            $('#username').prop('disabled', true)
            $('#password').prop('disabled', true)

            $.post('/admin/login', {
                username: $('#username').val(),
                password: $('#password').val()
            }, (data) =>
            {
                if (data.success == true)
                {
                    window.location.href = "/admin"
                }
                else
                {
                    $('.error-section').text(data.response)

                    $('#submit-button').show()
                    $('#username').prop('disabled', false)
                    $('#password').prop('disabled', false)
                }
            })
        })

        console.log('Page ready')
    })
}