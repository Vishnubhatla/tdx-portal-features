document.addEventListener('DOMContentLoaded', function () {

    function hideMultipleFields(ids) {
        ids.forEach(function (id) {
            var element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    // Call the function with your field IDs
    hideMultipleFields([
        'ctl00_ctl00_cpContent_cpContent_divModified',
        'divCreated'
    ]);

});
