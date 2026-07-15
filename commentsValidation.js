document.addEventListener('DOMContentLoaded', function () {

    var comments = document.getElementById('ctl00_ctl00_cpContent_cpContent_txtActionComments');
    var actionName = document.getElementById('hdrActionName').innerText.trim().toLowerCase();

    if (actionName === 'reject' || actionName === 'reject service request') {

        comments.required = true;

        comments.addEventListener('invalid', function () {
            comments.setCustomValidity('Comments are required when rejecting a request.');
        });

        comments.addEventListener('input', function () {
            comments.setCustomValidity('');
        });
    }

});
