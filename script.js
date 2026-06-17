
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
   


  /*  var config = {
        service: [
            'Enrollment Success / Submit a Financial Aid Web Case'
        ]
    };
    var name = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divService div');
    if (name) {
        var service = name.textContent.trim().toLowerCase();

        if (config.service.some(function (s) { return service.indexOf(s) !== -1; })) {
            var lastModified = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divModified');
            if (lastModified) lastModified.style.display = 'none';
        }
    }*/
