document.addEventListener('DOMContentLoaded', function () {

    function hideMultipleFields(ids) {
        ids.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    // Hide the Last Moified
    hideMultipleFields([
        'ctl00_ctl00_cpContent_cpContent_divModified'
    ]);

});
