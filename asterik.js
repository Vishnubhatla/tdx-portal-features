document.addEventListener('DOMContentLoaded', function () {

        document.getElementById('ctl00_ctl00_cpContent_cpContent_txtActionComments').required = true;

        var label = document.querySelector(
            "label[for='ctl00_ctl00_cpContent_cpContent_txtActionComments']"
        );

        if (label) {
            var star = document.createElement('span');
            star.id = 'required';
            star.style.color = 'red';
            star.textContent = ' *';
            label.appendChild(star);
        }
    
});
