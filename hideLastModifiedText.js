document.addEventListener('DOMContentLoaded', function () {

    var link = document.querySelector(
        '#ctl00_ctl00_cpContent_cpContent_divModified a'
    );

    if (link) {
        // Remove the preceding " by " text node
        if (link.previousSibling &&
            link.previousSibling.nodeType === Node.TEXT_NODE) {
            link.previousSibling.textContent = '';
        }

        // Remove the link
        link.remove();
    }
});
