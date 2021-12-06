if ($ != undefined)
{
    $(() =>
    {
        $('#users-button').on('click', () =>
        {
            window.location.href = '/admin/users'
        })
        $('#days-button').on('click', () =>
        {
            window.location.href = '/admin/days'
        })
    })
}