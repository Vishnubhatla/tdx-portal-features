document.addEventListener('DOMContentLoaded', function () {

    const tableContainer = document.querySelector(".tdx-grid-view");

    if (!tableContainer) {
        // console.error("tdx-grid-view container not found.");
        return;
    }

    // Get target field ID from the div attribute:
    const targetId = tableContainer.getAttribute("target");

    tableContainer.innerHTML = `
        <button type="button" id="addRowBtn">Add Row</button>

        <table border="1"
               style="width:100%;margin-top:10px;border-collapse:collapse;">
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Number of Hours</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    `;

    document
        .getElementById("addRowBtn")
        .addEventListener("click", addRow);

    function addRow() {

        const tbody = document.getElementById("tableBody");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <input type="date"
                       class="startdate-field"
                       required>
            </td>

            <td>
                <input type="date"
                       class="enddate-field"
                       required>
            </td>

            <td>
                <input type="number"
                       class="hours-field"
                       min="1"
                       required>
            </td>

            <td>
                <button type="button"
                        class="delete-btn">
                    Delete
                </button>
            </td>
        `;

        const startDateField =
            row.querySelector(".startdate-field");

        const endDateField =
            row.querySelector(".enddate-field");

        const hoursField =
            row.querySelector(".hours-field");

        startDateField.addEventListener("change", function () {
            endDateField.min = this.value;
            validateRow(row);
            updateTargetField();
        });

        endDateField.addEventListener("change", function () {
            validateRow(row);
            updateTargetField();
        });

        hoursField.addEventListener("input", function () {
            validateRow(row);
            updateTargetField();
        });

        row.querySelector(".delete-btn")
            .addEventListener("click", function () {
                row.remove();
                updateTargetField();
            });

        tbody.appendChild(row);

        updateTargetField();
    }

    function validateRow(row) {
        const warningDiv = document.querySelector(".deanMemo");
        if (!warningDiv) {
            // console.error("tdx-grid-view container not found.");
            return;
        }

        // warningDiv.textContent = "";

        const startDate =
            row.querySelector(".startdate-field");

        const endDate =
            row.querySelector(".enddate-field");

        const hours =
            row.querySelector(".hours-field");

        startDate.setCustomValidity("");
        endDate.setCustomValidity("");
        hours.setCustomValidity("");

        if (
            startDate.value &&
            endDate.value &&
            new Date(endDate.value) < new Date(startDate.value)
        ) {
            endDate.setCustomValidity(
                "End Date must be greater than or equal to Start Date."
            );
        }

        if (
            hours.value &&
            parseInt(hours.value, 10) <= 0
        ) {
            hours.setCustomValidity(
                "Number of Hours must be greater than 0."
            );
        }

        endDate.reportValidity();
        hours.reportValidity();


        if (startDate.value && endDate.value) {

            const start = new Date(startDate.value);
            const end = new Date(endDate.value);

            const diffDays =
                Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

            // Show warning only when date range exceeds 14 calendar days
            if (diffDays > 14) {

                warningDiv.textContent =
                    "Warning: Please notify your Dean, so that memo of agreement can be created.";
            }
        }
    }

    function updateTargetField() {

        const target = document.getElementById(targetId);

        if (!target) {
            console.error(`Target field '${targetId}' not found.`);
            return;
        }

        const rows = document.querySelectorAll("#tableBody tr");

        let text = "";

        rows.forEach(row => {

            const startDate =
                row.querySelector(".startdate-field").value || "";

            const endDate =
                row.querySelector(".enddate-field").value || "";

            const hours =
                row.querySelector(".hours-field").value || "";

            text += `Start Date: ${startDate}\n`;
            text += `End Date: ${endDate}\n`;
            text += `Number of Hours: ${hours}\n`;
            text += `-------------------------------------------------------\n`;
        });

        target.value = text;

        // Notify TDX that the field changed
        target.dispatchEvent(
            new Event("input", { bubbles: true })
        );

        target.dispatchEvent(
            new Event("change", { bubbles: true })
        );
    }

});
