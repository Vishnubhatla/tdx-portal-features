document.addEventListener('DOMContentLoaded', function () {

    var comments = document.getElementById('ctl00_ctl00_cpContent_cpContent_txtActionComments');
    var submitBtn = document.getElementById('ctl00_ctl00_cpContent_cpContent_btnSubmitAction');

    function toggleSubmitButton() {
        submitBtn.disabled = comments.value.trim().length === 0;

        if (submitBtn.disabled) {
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
        } else {
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }

    comments.addEventListener('input', toggleSubmitButton);

    // Initial check
    toggleSubmitButton();
});
