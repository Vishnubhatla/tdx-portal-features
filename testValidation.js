document.addEventListener('DOMContentLoaded', function () {

    const tableContainer = document.querySelector(".tdx-grid-view");

    if (!tableContainer) {
        console.error("tdx-grid-view container not found.");
        return;
    }

    // Get target field ID from the div attribute:
    // <div class="tdx-grid-view" target="attribute37469"></div>
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
                    <th>Action</th>
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
        const warningDiv =
            document.getElementById("tableWarning");

        warningDiv.textContent = "";

        if (startDate.value && endDate.value) {

            const start = new Date(startDate.value);
            const end = new Date(endDate.value);

            const diffDays =
                Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

            if (diffDays > 14) {

                warningDiv.textContent =
                    "Warning: The requested date range exceeds 14 calendar days. Please contact your dean to create a memo.";
            }
        }
    }

    function updateTargetField() {

        const target = document.getElementById(targetId);

        if (!target) {
            console.error(`Target field '${targetId}' not found.`);
            return;
        }

        const rows =
            document.querySelectorAll("#tableBody tr");

        // Header row with TAB separator
        let text =
            "Start Date\tEnd Date\tNumber of Hours\n";

        rows.forEach(row => {

            const startDate =
                row.querySelector(".startdate-field").value || "";

            const endDate =
                row.querySelector(".enddate-field").value || "";

            const hours =
                row.querySelector(".hours-field").value || "";

            text +=
                `${startDate}\t${endDate}\t${hours}\n`;
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
