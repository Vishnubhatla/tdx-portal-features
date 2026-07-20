document.addEventListener('DOMContentLoaded', function () {

    var modifiedDiv = document.getElementById(
        'ctl00_ctl00_cpContent_cpContent_divModified'
    );

    if (modifiedDiv) {

        // Hide all links inside the div
        modifiedDiv.querySelectorAll('a').forEach(function(link) {
            link.style.display = 'none';
        });

        // Remove the text "by"
        modifiedDiv.childNodes.forEach(function(node) {
            if (node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim() === 'by') {
                node.textContent = '';
            }
        });
    }
});
