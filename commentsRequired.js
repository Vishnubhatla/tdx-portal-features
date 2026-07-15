window.onload = function () {
    var actionName = document.getElementById('hdrActionName').innerText.trim().toLowerCase();

    if (actionName === 'reject') {
        document.getElementById('ctl00_ctl00_cpContent_cpContent_txtActionComments')
                .setAttribute('required', 'required');
    }
};
