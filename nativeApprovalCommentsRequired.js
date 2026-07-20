document.addEventListener('DOMContentLoaded', function () {

    var comments = document.getElementById('ctl00_ctl00_cpContent_cpContent_txtActionComments');
    var submitBtn = document.getElementById('ctl00_ctl00_cpContent_cpContent_btnSubmitAction');
    var buttonDiv = document.getElementById('divAssignWorkflowButtons');

    comments.required = true;

    // Add required star
    var label = document.querySelector(
        "label[for='ctl00_ctl00_cpContent_cpContent_txtActionComments']"
    );

    if (label) {
        var star = document.createElement('span');
        star.style.color = 'red';
        star.textContent = ' *';
        label.appendChild(star);
    }

    // Warning message
    var warningMsg = document.createElement('div');
    warningMsg.id = 'commentsRequiredWarning';
    warningMsg.style.color = 'red';
    warningMsg.style.fontWeight = 'bold';
    warningMsg.style.marginBottom = '10px';
    warningMsg.textContent = 'Comments are required.';

    if (buttonDiv) {
        buttonDiv.insertBefore(warningMsg, buttonDiv.firstChild);
    }

    function blockClick(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }

    function toggleSubmitButton() {
        var isEmpty = comments.value.trim().length === 0;

        submitBtn.disabled = isEmpty;

        if (isEmpty) {
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
            warningMsg.style.display = 'block';

            // Block all click actions
            submitBtn.addEventListener('click', blockClick, true);
        } else {
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            warningMsg.style.display = 'none';

            // Re-enable click actions
            submitBtn.removeEventListener('click', blockClick, true);
        }
    }

    comments.addEventListener('input', toggleSubmitButton);

    // Initial check
    toggleSubmitButton();
});
