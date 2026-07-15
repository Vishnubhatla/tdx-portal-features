document.addEventListener('DOMContentLoaded', function () {

    var actionName = document.getElementById('hdrActionName').innerText.trim().toLowerCase();

    var requireCommentsFor = [
        'reject',
        'reject service request'
    ];

    if (requireCommentsFor.includes(actionName)) {
        document.getElementById('ctl00_ctl00_cpContent_cpContent_txtActionComments')
                .setAttribute('required', 'required');
    }

});
